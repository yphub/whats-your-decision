<template>
  <div id="Show">
    <div class="inner">
      <loadingMask :loading="!operateArr.length" />
      <div v-if="operateArr.length" class="shuffle-result">
        <div class="owner">
          <img :src="ownericon">
          <text>{{ ownername }}的决策</text>
        </div>
        <resultSwiper :items="operateArr"></resultSwiper>
        <div class="button-group">
          <button @click="goBack">返回首页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingMask from "@/components/loadingMask";
import resultSwiper from "@/components/resultSwiper";
export default {
  components: {
    loadingMask,
    resultSwiper
  },
  name: "",
  data() {
    return {
      operateArr: [],
      loading: true,
      ownericon: "",
      ownername: ""
    };
  },
  methods: {
    goBack() {
      wx.redirectTo({
        url: "/pages/mainpage/main"
      });
    }
  },
  async onLoad(opt) {    
    var { data } = await wx.get(`/show/${opt.id}/${opt.token}`);    
    // var { data } = await wx.get(`/show/6/123`);
    // console.log(data);
    const app = getApp();
    data.list.forEach(ele => {
      if (ele.imgurl.indexOf("/uploads/") === 0)
        ele.imgurl = `url(${app.globalData.host}${ele.imgurl})`;
    });
    this.operateArr = data.list;
    this.ownericon = data.user.avatarUrl;
    this.ownername = data.user.nickName;
  }
};
</script>

<style lang='scss'>
#Show {
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-start;
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
      > .owner {
        margin-left: 10%;
        margin-right: 10%;
        background: #fefefe;
        display: flex;
        align-items: center;
        height: 40px;
        border-radius: 20px;
        > image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 15px;
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        > text {
          flex-grow: 2;
          text-align: center;
        }
      }
    }
  }

  .button-group {
    margin: 0 10%;
    > button {
      background: #3d9bff;
      color: #fff;
    }
  }
}
</style>