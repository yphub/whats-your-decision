<template>
    <div id='About'>
        <div class="card">
            <div class="rubberBand" style="margin-bottom: 20px;">
                <text class="title-bg">关于我们</text>
                <text class="title">关于我们</text>
            </div>
            <div class="contains">
                <div>
                    <image mode="widthFix" class="logoimg" src="/static/title.png" />
                </div>
                <text class="h2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帮你决策小程序主要是为了帮助人们解决决策困难的问题，用户在遇到纠结的问题时，可将需要决策的内容输入到小程序中，通过小程序内的算法，系统会自动帮你决策出最佳选项。目前支持的内容有图片、文字和颜色。</text>
                <text class="hr"></text>
                <text class="h1">关于我们</text>
                <text class="h2">古良辉 中国海洋大学 教育技术</text>
                <text class="h2">刘颜君 中国海洋大学 教育技术</text>
                <text class="h2">陈淯培 中国海洋大学 电子信息工程</text>
            </div>
        </div>
        <button @click="goBack">返回</button>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goBack() {
      wx.navigateBack();
    }
  }
};
</script>

<style lang='scss'>
#About {
  width: 80%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  .card {
    margin-top: 15%;
    position: relative;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    padding: 6%;
    background: white;
    display: flex;
    flex-direction: column;
    text.title,
    text.title-bg {
      font-family: "iconfont";
      z-index: 100;
      font-size: 60px;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      transform: translateY(-50%);
      text-align: center;
    }
    text.title-bg {
      -webkit-text-stroke: 10px white;
    }
    .contains {
      margin-top: 20px;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      .logoimg {
        position: inherit;
        width: 200rpx;
        height: auto;
        left: inherit;
        top: inherit;
      }
      .h1 {
        font-size: 25px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      .h2 {
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 16px;
        color: #333;
      }
      .hr {
        margin: 10px 0px;
        height: 1px;
        background: #ced4da;
      }
    }
  }
  button {
    margin-top: 10px;
    width: 100%;
    background: #3d9bff;
    color: #fff;
  }
}
</style>