export default function () {

  const app = getApp();
  //用于promise化微信函数
  wx.promisify = function (func) {
    return function (opt) {
      opt = opt || {};
      return new Promise(function (resolve, reject) {
        opt.success = resolve;
        opt.fail = reject;
        func(opt);
      })
    }
  }

  //版本检测
  var __ver__ = "1.2.10";
  var ver = wx.getStorageSync("appversion");
  if (ver !== __ver__) {
    wx.clearStorageSync();
    wx.setStorage({
      key: "appversion",
      data: __ver__
    })
  }
  var cookie = wx.getStorageSync('cookie');
  const host = "https://xcx.oucolab.cn"
  app.globalData.host = host;

  //promise化ajax
  wx.ajax = function (path, data, method) {
    if (path === undefined) path = '/'
    // console.info(`${method} ${host}${path}`);
    return new Promise(function (resolve, reject) {
      wx.request({
        url: host + path,
        data,
        header: {
          cookie
        },
        method,
        success: async res => {
          if (res.header['Set-Cookie']) {
            cookie = res.header['Set-Cookie'];
            wx.setStorage({
              key: 'cookie',
              data: res.header['Set-Cookie']
            })
          }
          if (res.statusCode == 200)
            resolve(res);
          else reject(res);
        },
        fail: reject
      })
    })
  }

  //promise化get/set/upload等
  wx.get = function (path, data) {
    return wx.ajax(path, data, 'GET')
  }

  wx.post = function (path, data) {
    return wx.ajax(path, data, 'POST')
  }

  wx.loginserver = async function () {
    var {
      code
    } = await wx.promisify(wx.login)();
    var {
      data
    } = await wx.get('/login', {
      code
    });
    if (data.state === false) {
      //处理失败逻辑
    }
    return data;
  }

  wx.upload = function (obj) {
    obj.url = host + (obj.url ? obj.url : '');
    obj.header = obj.header || {};
    obj.header.cookie = cookie;
    return wx.promisify(wx.uploadFile)(obj);
  }

  wx.store = async function (key) {
    return new Promise(function (resolve, reject) {
      // console.log(`%c getting Storage: ${key}`, "color:orange;font-weight:bold")
      wx.getStorage({
        key,
        success: function (res) {
          // console.log(`%c Storage: ${key}=${res.data}`, "color:green;font-weight:bold")
          resolve(res.data);
        },
        fail: function () {
          // console.log(`%c Storage: ${key}=undefined`, "color:greem;font-weight:bold")
          resolve(undefined)
        }
      })
    })
  }

  setTimeout(async () => {
    var cookie = await wx.store('cookie');
    if (cookie !== undefined) return;
    wx.loginserver();
  }, 0);

  //这个数据仅仅用来测试
  /*app.globalData.ShuffleData = {
    arr: [{
        imgurl: "red",
        text: "测试数据1"
      },
      {
        imgurl: "green",
        text: "很长很长非常长并且肯定会换行的测试数据2"
      },
      {
        imgurl: "blue",
        text: "测试数据3"
      }
    ],
    num: 2
  };*/
}
