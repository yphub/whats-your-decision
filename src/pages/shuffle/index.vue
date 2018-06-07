<template>
  <div id="Shuffle">
    <div class="inner">
      <loadingMask :loading="!operateArr.length" />
      <div v-if="operateArr.length" class="shuffle-result">
        <resultSwiper :items="operateArr"></resultSwiper>
        <div class="button-group">
          <button v-if="canShare" @click="shareMenu" open-type="share" type="primary">分享</button>
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
      canShare: true
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
        this.ShuffleArrayLocal();
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
    async shareMenu() {},
    async mountedFunc() {
      try {
        await wx.promisify(wx.checkSession)();

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
    async getDataAndUpload() {
      var nickName = await wx.store("nickName");

      if (nickName === undefined) {
        var res = await wx.promisify(wx.getUserInfo)({
          withCredentials: true
        });
        console.log(res);

        //将 res.nickName存入storage
        wx.setStorage({ key: "nickName", data: res.userInfo.nickName });
        wx.setStorage({ key: "avatarUrl", data: res.userInfo.avatarUrl });

        var { data } = await wx.post("/logindata", {
          encryptedData: res.encryptedData,
          iv: res.iv
        });
        if (data.state === false) {
          //处理加密数据出错
        }
      }

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
        var { data } = await wx.upload({
          url: "/upload",
          filePath,
          name: "u",
          formData: {
            id: this.shufferid,
            url: item.imgurl
          }
        });
        if (data.state === -1) {
          //处理没上传成功的逻辑
        }
        this.uploadStatus.at++;
      }

      if (this.uploadStatus.at === this.uploadStatus.sum) {
        this.uploadStatus = {
          at: 0,
          sum: 0
        };
        wx.showToast({
          title: "上传成功!"
        });
      }
    }
  },
  mounted() {
    if (this.operateArr.length) this.operateArr = [];
    this.mountedFunc();
  },
  onShareAppMessage(res) {
    this.getDataAndUpload();
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