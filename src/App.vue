<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    console.log("app created and cache logs by setStorageSync");
  },
  mounted() {
    this.$nextTick(() => {
      getApp().globalData.ShuffleData = {
        arr: [
          { imgurl: "red", text: "测试数据1" },
          { imgurl: "green", text: "很长很长非常长并且肯定会换行的测试数据2" },
          { imgurl: "blue", text: "测试数据3" }
        ],
        num: 2
      };
    });
  }
};
</script>

<style>
@import "./pagebg.scss";
@import "./iconfont.scss";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
page {
  height: 100%;
}
</style>
