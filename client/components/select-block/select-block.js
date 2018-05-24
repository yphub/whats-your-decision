Component({
  data: {
    componentHover: "",
    touchOffset: 0,
    optionHoverLeft: "",
    optionHoverRight: ""
  },
  properties: {
    selectData: Object,
    deleteOn: Boolean,
    index: {
      type: Number,
      value: -1
    }
  },
  methods: {
    EmitTiggleDelete() {
      this.onTouchEnd();
      this.triggerEvent('tiggledelete', true)
    },
    EmitDelete() {      
      this.triggerEvent('delete', this.data.index)
    },
    EmitItap() {
      if (this.data.deleteOn == true)
        this.triggerEvent('tiggledelete', false)
      else this.triggerEvent('edit', this.data.index)
    },
    onTouchStart(e) {
      this.setData({
        componentHover: "select-block-hover"
      })
      this.data.touchOffset = e.touches[0].pageX
    },
    onTouchEnd(e) {
      var data = {
        optionHoverLeft: this.data.optionHoverLeft,
        optionHoverRight: this.data.optionHoverRight
      }
      this.setData({
        componentHover: "",
        optionHoverLeft: "",
        optionHoverRight: ""
      })
      if (!e)
        this.data.touchOffset = undefined;
      if (this.data.touchOffset == undefined) return;
      var point = e.changedTouches[0];
      var query = wx.createSelectorQuery().in(this);
      query.select('.select-block').boundingClientRect(function (res) {
        if (point.pageX > res.left && point.pageX < res.right && point.pageY > res.top && point.pageY < res.bottom) {
          if (data.optionHoverLeft != "")
            this.triggerEvent('edit', this.data.index);
          else if (data.optionHoverRight != "") this.triggerEvent('images', this.data.index);
        }
      }.bind(this)).exec()
    },
    onTouchMove(e) {
      var offset = e.touches[0].pageX - this.data.touchOffset;
      var opt = {
        optionHoverLeft: "",
        optionHoverRight: ""
      };
      if (offset > 10)
        opt.optionHoverRight = "mask-hover"
      else if (offset < -10)
        opt.optionHoverLeft = "mask-hover"
      if (this.data.optionHoverLeft != opt.optionHoverLeft || this.data.optionHoverRight != opt.optionHoverRight)
        this.setData(opt);
    }
  }
})