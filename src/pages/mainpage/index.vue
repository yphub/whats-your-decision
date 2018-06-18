<template>
  <div id='MainPage'>
    <div class="logo">
      <div class="logotext">
        <image mode="aspectFit" src="/static/title.png" />
      </div>
    </div>
    <div class="btn-group">
      <button @tap="JumpPage('single')">
        <div class="icon-zk"></div>
        <text>开始决策</text>
      </button>
      <button @tap="JumpPage('my')">
        <div class="icon-qq"></div>
        <text>我的决策</text>
      </button>
    </div>
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
  onShow() {
    delete getApp().globalData.ShowData;
  }
};
</script>

<style lang='scss'>
// @import "./mainlogo.scss";
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
      animation: swing 2s ease-in-out infinite;
      transform: scale(0.7);
      @keyframes swing {
        10% {
          transform: rotate3d(0, 0, 1, 15deg) scale(0.8);
        }

        20% {
          transform: rotate3d(0, 0, 1, -10deg) scale(0.7);
        }

        30% {
          transform: rotate3d(0, 0, 1, 5deg) scale(0.7);
        }

        40% {
          transform: rotate3d(0, 0, 1, -5deg) scale(0.7);
        }

        50% {
          transform: rotate3d(0, 0, 1, 0deg) scale(0.7);
        }

        to {
          transform: rotate3d(0, 0, 1, 0deg) scale(0.7);
        }
      }
    }
  }
  .btn-group {
    button {
      display: flex;
      align-items: center;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
      background-color: rgba(255, 255, 255, 0.7);
      margin-right: 0;
      margin-left: 0;
      transition: all ease-in-out 0.2s;
      font-size: 22px;
      > .icon-zk,
      .icon-qq {
        font-family: "iconfont";
        font-size: 35px;
        margin: -10px 15px;
      }
      > .icon-zk:before {
        content: "\e601";
      }
      > .icon-qq:before {
        content: "\e602";
      }
      > text {
        text-align: center;
        flex-grow: 2;
      }
    }
    button + button {
      margin-top: 12px;
    }
  }
}
</style>