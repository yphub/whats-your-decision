// components/shuffle-block/shuffle-block.js
var app = getApp();

var obj = global.watcher.prepare({
  data: {
    operate: {
      arr: [],
      num: 0
    },
    shuffleLoading: true
  },
  computed:{
    resultArr(){
      return this.data.operate.arr.slice(0,this.data.operate.num)
    }
  },
  attached() {
    this.data.operate = JSON.parse(JSON.stringify(app.globalData.ShuffleData))
    this.shuffleArray();
    this.data.operate.arr.forEach((obj) => {
      console.log(obj.imgurl)
    });    
    this.data.shuffleLoading = false;
  },
  watch:{
    'operate.arr'(val){
      console.log(val.slice(0,this.data.operate.num))
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    shuffleArray() {
      const arr = this.data.operate.arr;
      const length = arr.length
      for (let i = 0; i < length; ++i) {
        const x = Math.floor(Math.random() * length);
        const y = Math.floor(Math.random() * length);
        [arr[x], arr[y]] = [arr[y], arr[x]];
      }
    }
  }
})
Component(obj);