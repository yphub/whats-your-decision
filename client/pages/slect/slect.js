//slect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectArr: [],
    deleteOn: false,
    detailIndexAt: false
  },
  DeleteSelect({
    detail
  }) {
    this.data.selectArr.splice(detail, 1);
    this.setData({
      selectArr: this.data.selectArr,
      deleteOn: this.data.selectArr.length != 0
    })
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
          this.setData({
            selectArr: this.data.selectArr
          });
          detail == -1 || detail++;
        })
      }
    })
  },
  AlterDetail({
    detail
  }) {
    this.setData({
      detailIndexAt: detail
    })
  },
  ResetDetailIndex() {
    this.AlterDetail({
      detail: false
    });
  },
  ChangeDetail({
    detail
  }) {
    if (this.data.detailIndexAt == -1)
      this.data.selectArr.push(detail);
    else this.data.selectArr[this.data.detailIndexAt] = detail;
    this.setData({
      selectArr: this.data.selectArr
    })
    this.ResetDetailIndex();
  },
  TiggleDelete(res) {
    this.setData({
      deleteOn: res.detail
    })
  },
})