Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //页面跳转函数  
  JumpToSingle() {
    wx.navigateTo({
      url: '../slect/slect'
    })
  },
  JumpToGroups() {
    wx.navigateTo({
      url: '../duoren/duoren'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://wonply6i.qcloud.la/weapp/testapi/index',
      success: function () {
        console.log(arguments);
      }
    })
  },
})