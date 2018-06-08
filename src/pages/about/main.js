import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: "关于我们",
    navigationBarBackgroundColor: "#b2b2b2",
    disableScroll: true
  }
}
