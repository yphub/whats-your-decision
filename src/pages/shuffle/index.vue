<template>
  <div id="Shuffle">
    <div class="inner">
      <loadingMask :loading="!operateArr.length" />
      <div v-if="operateArr.length" class="shuffle-result">
        <resultSwiper :items="operateArr"></resultSwiper>
        <div class="button-group">
          <template v-if="canShare">
            <button v-if="hasUser" open-type="share" type="primary">分享</button>
            <button v-else open-type="getUserInfo" @getuserinfo="onUserInfo" type="primary">授权并分享</button>
          </template>
          <button @click="goBack">返回</button>
        </div>
      </div>
      <uploadingMask :loading="uploadStatus" />
    </div>
  </div>
</template>

<script>
import loadingMask from "@/components/loadingMask";
import uploadingMask from "@/components/uploadingMask";
import resultSwiper from "@/components/resultSwiper";
export default {
  components: {
    loadingMask,
    uploadingMask,
    resultSwiper
  },
  name: "",
  data() {
    return {
      operateArr: [],
      loading: true,
      uploadStatus: {
        sum: 0,
        at: 0
      },
      canShare: true,
      hasUser: false
    };
  },
  methods: {
    ShuffleArrayLocal() {
      //本地随机
      wx.showToast({
        title: "服务器出错，进行本地随机",
        icon: "none"
      });
      const data = JSON.parse(JSON.stringify(getApp().globalData.ShuffleData));
      const arr = data.arr;
      const num = data.num;
      const length = arr.length;
      for (let i = 0; i < length; ++i) {
        const x = Math.floor(Math.random() * length);
        const y = Math.floor(Math.random() * length);
        [arr[x], arr[y]] = [arr[y], arr[x]];
      }
      this.operateArr = arr.slice(0, num);
      this.canShare = false;
      //需要取消掉分享
    },
    async ShuffleArray() {
      try {
        var { data } = await wx.post(
          "/shuffle",
          getApp().globalData.ShuffleData
        );
      } catch (e) {
        //一般是服务器没开
        return this.ShuffleArrayLocal();
      }
      if (data.state === -1) {
        await wx.loginserver();
        return this.ShuffleArray();
      }
      this.canShare = true;
      this.operateArr = data.arr;
      this.shufferid = data.id;
      this.shuffertoken = data.token;
    },
    goBack() {
      wx.navigateBack();
    },
    async mountedFunc() {
      try {
        await wx.promisify(wx.checkSession)();
        let data = getApp().globalData.ShowData;
        if (data !== undefined) {
          this.canShare = true;
          this.operateArr = data.list;
          this.shufferid = data.id;
          this.shuffertoken = data.token;
          return;
        }
        this.ShuffleArray();
      } catch (NoSessionKey) {
        try {
          await wx.loginserver();
          return this.mountedFunc();
        } catch (e) {
          this.ShuffleArrayLocal();
        }
      }
    },
    async onUserInfo(e) {
      var res = e.mp.detail;
      console.log(res);

      wx.setStorage({
        key: "infoExpire",
        data: +new Date() + 24 * 3600 * 1000
      });
      wx.setStorage({ key: "nickName", data: res.userInfo.nickName });
      wx.setStorage({ key: "avatarUrl", data: res.userInfo.avatarUrl });

      var { data } = await wx.post("/logindata", {
        encryptedData: res.encryptedData,
        iv: res.iv
      });
      if (data.state === false) {
        //处理加密数据出错
      }

      this.hasUser = true;
      wx.showToast({
        title: "已授权"
      });
      // this.uploadData();
    },
    async uploadData() {
      if (this.uploadFinished) return;

      // await wx.promisify(wx.showShareMenu)();
      this.uploadStatus = {
        sum: this.operateArr.length,
        at: 0
      };

      for (var item of this.operateArr) {
        if (item === undefined) continue;
        var filePath = item.imgurl;
        if (filePath.indexOf("://") === -1) {
          this.uploadStatus.at++;
          continue;
        }
        try {
          var { data } = await wx.upload({
            url: "/upload",
            filePath,
            name: "u",
            formData: {
              id: this.shufferid,
              url: item.imgurl
            }
          });
        } catch (e) {
          //出现500错误当作上传出错处理,防止uploadMask不消失
          var data = {
            state: -1
          };
        }
        if (data.state === -1) {
          wx.showToast({
            title: `上传出错 索引:${this.uploadStatus}`,
            icon: "none"
          });
        }
        this.uploadStatus.at++;
      }

      if (this.uploadStatus.at === this.uploadStatus.sum) {
        this.uploadStatus = {
          at: 0,
          sum: 0
        };
        this.uploadFinished = true;
        wx.showToast({
          title: "上传成功!"
        });
      } else {
        wx.showToast({
          title: "上传未完成，请返回重试",
          icon: "none"
        });
        this.uploadFinished = true;
      }
    }
  },
  async mounted() {
    this.uploadFinished = false;
    if (this.operateArr.length) this.operateArr = [];
    this.mountedFunc();

    var nickName = await wx.store("nickName");
    var infoExpire = await wx.store("infoExpire");

    this.hasUser = !(
      nickName === undefined ||
      infoExpire === undefined ||
      infoExpire - new Date() < 0
    );
  },
  onShareAppMessage(res) {
    this.uploadData();
    /*setTimeout(()=>{
      wx.navigateTo({
        url: `/pages/show/main?id=${this.shufferid}&token=${this.shuffertoken}`
      })
    },3000);*/
    return {
      title: "我决定了！我要……",
      path: `/pages/show/main?id=${this.shufferid}&token=${this.shuffertoken}`
    };
  }
};
</script>

<style lang='scss'>
#Shuffle {
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    > .shuffle-result {
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      animation: fadeIn 0.4s ease-in-out;
      animation-fill-mode: forwards;
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }

  .button-group {
    margin: 0 10%;
    > button + button {
      margin-top: 10rpx;
    }
  }
}
</style>