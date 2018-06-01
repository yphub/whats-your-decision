/**
 * watcher.js: 为小程序的组件和页面添加响应式效果
 * 添加watch、computed属性
 * 设置this.data.<key>的时候自动调用setData
 * 使用方法： var obj = watcher.prepare(<obj>); Page(obj);
 * 为this注入的方法： this.$watch(key,listener)
 *                   this.$unwatch(key,unwatchlistener)
 */

class watcherClass {
    constructor(watcher, rootkey, bindData) {
        if (watcher !== undefined) {
            this.parent = watcher;
            if (rootkey !== undefined)
                this.rootkey = rootkey;
            else Object.defineProperty(this, 'rootkey', {
                enumerable: true,
                configurable: true,
                get() {
                    return this.parent.rootkey;
                }
            })
        } else {
            this.bindData = bindData;
        }
        this.set = [];
        this.get = [];
    }
    get root() {
        if (this.parent === undefined)
            return this;
        else return this.parent.root;
    }
    getChild(key) {
        if (this[key] === undefined)
            this[key] = new watcherClass(this, (this.parent === undefined) ? key : undefined);
        return this[key];
    }
    getWatcherByPointKey(key) {
        var watcher = this.root;
        var keystack = key.split('.');
        keystack.forEach(eachkey => {
            watcher = watcher.getChild(eachkey)
        })
        return watcher;
    }
}

class UndefinedChangedData {}


// global.watcherList = [];

//为初始化后的对象添加响应式数据
function insertReactiveData(obj) {

    var watcherList = new watcherClass(undefined, undefined, this.globalData || this.data);
    // global.watcherList.push(watcherList);
    var setDataDeathLockFlag = false;
    var updateData;
    var computedWatcher;

    var defineReactive = (obj, key, val, watcher, getter, setter, oldobj) => {

        var NoticeifyData = (newval, oldval) => {
            if (oldval === undefined && val === newval) return;
            if (oldval instanceof UndefinedChangedData && newval === undefined) return;
            if (newval instanceof Object) {
                addKeys(newval, undefined, watcher, val);
                if (newval instanceof Array)
                    AddArrayProto(newval)
            }
            oldval = oldval || val;
            val = newval;

            setTimeout(() => {
                watcher.set.forEach((ele) => {
                    ele.call(this, val, oldval)
                })
            }, 0)

            if (updateData === undefined)
                updateData = {}
            var rootkey = watcher.rootkey || key;
            updateData[rootkey] = watcher.root.bindData[rootkey];

            setTimeout(() => {
                if (updateData !== undefined) {
                    setDataDeathLockFlag = true;
                    this.setData && this.setData(updateData);
                    setDataDeathLockFlag = false;
                    updateData = undefined;
                }
            }, 0)
        }

        var AddArrayProto = (arr) => {
            ['pop', 'push', 'shift', 'unshift', 'splice'].forEach((eachkey) => {
                Object.defineProperty(arr, eachkey, {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: function () {
                        var newarr = Array.from(this);
                        Array.prototype[eachkey].apply(newarr, arguments);
                        NoticeifyData(newarr);
                    }
                })
            });
        }

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            set: newval => {
                if (setDataDeathLockFlag) return;
                if (getter !== undefined) {
                    if (val === newval) return;
                    if (setter !== undefined)
                        setter.call(this, newval)
                    return
                }
                NoticeifyData(newval)
            },
            get: () => {
                if (computedWatcher !== undefined && watcher.set.indexOf(computedWatcher) === -1)
                    watcher.set.push(computedWatcher)
                setTimeout(() => {
                    watcher.get.forEach(ele => {
                        ele.call(this, val)
                    })
                })
                return val;
            }
        })

        if (getter !== undefined) {
            var watcherFunction = () => {
                computedWatcher = watcherFunction;
                var newval = getter.call(this);
                computedWatcher = undefined;
                NoticeifyData(newval);
            }
            watcherFunction();
        }

        if (val instanceof Array) {
            AddArrayProto(val)
        }

        if (oldobj !== val) {
            if (oldobj === undefined)
                oldobj = new UndefinedChangedData;
            NoticeifyData(val, oldobj)
        }
    }

    var addKeys = (obj, key, watcher, oldobj) => {
        if (obj instanceof Object) {
            for (var objkey in obj) {
                if (objkey === undefined) continue;
                addKeys(obj[objkey], objkey, watcher.getChild(objkey), oldobj ? oldobj[objkey] : undefined)
                defineReactive(obj, objkey, obj[objkey], watcher.getChild(objkey), undefined, undefined, oldobj ? oldobj[objkey] : undefined)
            }
        }
    }

    addKeys(watcherList.bindData, undefined, watcherList, watcherList.bindData)

    var dataobj = obj || this;
    for (var computedKey in dataobj.computed) {
        var getfunc = ((dataobj.computed[computedKey] instanceof Function) ? dataobj.computed[computedKey] : dataobj.computed[computedKey].get)
        var setfunc = dataobj.computed[computedKey].set
        defineReactive(watcherList.bindData, computedKey, undefined, watcherList.getChild(computedKey), getfunc, setfunc)
    }

    this.$watch = function (key, callback) {
        var keywatcher = watcherList.getWatcherByPointKey(key);

        var setfunc = (callback instanceof Function) ? callback : callback.set
        if (setfunc !== undefined)
            keywatcher.set.push(setfunc);

        var getfunc = callback.get
        if (getfunc !== undefined)
            keywatcher.get.push(getfunc);
    }

    this.$unwatch = function (key, callback) {
        var keywatcher = watcherList.getWatcherByPointKey(key);

        var setfunc = (callback instanceof Function) ? callback : callback.set
        if (setfunc !== undefined) {
            var index = keywatcher.set.indexOf(setfunc)
            if (index !== -1)
                keywatcher.set.splice(index, 1);
        }

        var getfunc = callback.get
        if (getfunc !== undefined) {
            var index = keywatcher.get.indexOf(getfunc)
            if (index !== -1)
                keywatcher.get.splice(index, 1);
        }

    }

    for (var key in dataobj.watch) {
        this.$watch(key, dataobj.watch[key]);
    }
    return this;
}

function prepareReactiveData(obj) {
    function prepareFunction() {
        //此处传入obj的作用： components里的watch和computed会在生命周期内生成this的时候被抛弃，这里将watch和computed重新载入
        insertReactiveData.call(this, obj);
    }
    ['onLaunch', 'created', 'onLoad'].forEach(funcname => {
        if (obj[funcname] === undefined)
            obj[funcname] = prepareFunction
        else {
            var oldfunc = obj[funcname];
            obj[funcname] = function () {
                prepareFunction.call(this);
                oldfunc.call(this);
            }
        }
    })
    return obj;
}

export default {
    insert: insertReactiveData,
    prepare: prepareReactiveData
}

//存在的bug： 多个页面/组件传递数据的时候若绑定数据，则会覆盖之前的绑定，需要用JSON.stringify来传递。