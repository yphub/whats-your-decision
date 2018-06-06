<template>
  <div id='MainPage'>
    <div class="logo">
      <div class="logotext"></div>
    </div>
    <button @tap="JumpPage('single')">开始决策</button>
    <!-- <button @tap="JumpPage('multiple')">多人决策</button> -->
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    JumpPage(name) {
      wx.navigateTo({
        url: `/pages/${name}/main`
      });
    }
  },
  mounted() {
    /*wx.navigateTo({
      url: "/pages/show/main?id=1&token=2"
    });*/
  }
};
</script>

<style lang='scss'>
@import "./mainlogo.scss";
#MainPage {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;  
  width: 80%;
  height: 100%;
  margin-left: 10%;  

  .logo {    
    width: 600rpx;
    height: 600rpx;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    position: relative;
    > .logotext {
      position: absolute;
      width: 100%;
      height: 100%;
      background-blend-mode: lighten;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      transform: scale(0.7);
    }
  }
  button {
    margin-top: 12px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.7);
    margin-right: 0;
    margin-left: 0;
    transition: all ease-in-out 0.2s;
  }
}
</style>