<script>
import initFunc from '@/extra/initFunc';
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
      initFunc();      
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
