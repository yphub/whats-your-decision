<script>
import initFunc from "@/extra/initFunc";
export default {
  created() {},
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
image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
@keyframes rubberBand {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  7% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
    transform: scale3d(1.25, 0.75, 1);
  }

  10% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
    transform: scale3d(0.75, 1.25, 1);
  }

  12% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
    transform: scale3d(1.15, 0.85, 1);
  }

  16% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
    transform: scale3d(0.95, 1.05, 1);
  }

  19% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
    transform: scale3d(1.05, 0.95, 1);
  }

  25% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  animation: rubberBand 4s infinite;
  margin-top: -20px;  
}
</style>
