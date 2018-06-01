//slect.js
var obj = global.watcher.prepare({

  /**
   * 页面的初始数据
   */
  data: {
    selectArr: [],
    deleteOn: false,
    decisionNum: 1,
    detailIndexAt: false,
    detailBlockShow: false
  },
  computed: {
    resultNumArr() {
      var arr = [];
      var len = this.data.selectArr.length;
      for (var i = 1; i <= len; ++i)
        arr.push(i);
      return arr;
    },
    selectBlockStyle() {
      if (this.data.selectArr.length < 4)
        return 'flex-basis:49%;height:300rpx';
      else return 'flex-basis:33%;height:250rpx';
    }
  },
  watch: {
    resultNumArr(val) {
      var length = val.length;
      if (this.data.decisionNum >= val.length)
        this.data.decisionNum = val.length
      else if (val.length != 0 && this.data.decisionNum == 0)
        this.data.decisionNum = 1;
    }
  },
  onShow() {
    var hold = true;
    wx.onAccelerometerChange(res => {      
      ['x', 'y', 'z'].forEach(angle => {
        if (hold && res[angle] > 0.8 && this.data.detailIndexAt === false && this.data.selectArr.length !== 0) {
          hold = false;          
          this.GoToShuffle();
        }
      })
    })
  },
  onHide() {    
    wx.stopAccelerometer();
  },
  DeleteSelect({
    detail
  }) {
    this.data.selectArr.splice(detail, 1);
    this.data.selectArr = this.data.selectArr
  },
  AlterImages({
    detail
  }) {
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        res.tempFilePaths.forEach((imgurl) => {
          imgurl = `url(${imgurl})`
          if (this.data.selectArr[detail] != undefined)
            this.data.selectArr[detail].imgurl = imgurl
          else
            this.data.selectArr.push({
              imgurl,
              text: ""
            });
          detail == -1 || detail++;
        })
      }
    })
  },
  AlterDetailPlus({
    detail
  }) {
    if (this.data.deleteOn === true)
      this.data.deleteOn = false;
    else this.AlterDetail({
      detail
    });
  },
  AlterDetail({
    detail
  }) {
    this.data.detailIndexAt = detail
    setTimeout(() => {
      this.data.detailBlockShow = true
    }, 0)
  },
  ResetDetailIndex() {
    this.data.detailBlockShow = false
  },
  onDetailAnimateEnd(e) {
    if (this.data.detailBlockShow === false)
      this.data.detailIndexAt = false;
  },
  ChangeDetail({
    detail
  }) {
    if (this.data.detailIndexAt == -1)
      this.data.selectArr.push(detail);
    else this.data.selectArr[this.data.detailIndexAt] = detail;
    this.ResetDetailIndex();
  },
  TiggleDelete({
    detail
  }) {
    this.data.deleteOn = detail
  },
  onResultNumChange({
    detail
  }) {
    this.data.decisionNum = +detail.value + 1;
  },
  GoToShuffle() {
    getApp().globalData.ShuffleData = {
      arr: this.data.selectArr,
      num: this.data.decisionNum
    }
    wx.navigateTo({
      url: '/components/shuffle-block/shuffle-block'
    })
  }
})

Page(obj)