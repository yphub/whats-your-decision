Component({
    properties: {
        selectData: {
            type: Object,
            value: {},
            observer(newval) {
                if (newval === null)
                    this.setData({
                        selectData: {
                            imgurl: "",
                            text: ""
                        }
                    })
            }
        }
    },
    data: {
        inputFocusClass: ""
    },
    methods: {
        EmitClose() {
            this.triggerEvent('close')
        },
        EmitCertain() {
            this.triggerEvent('certain', this.data.selectData)
        },
        TextInput(e) {
            this.data.selectData.text = e.detail.value
        },
        AlterImage() {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.data.selectData.imgurl = `url(${res.tempFilePaths[0]})`;
                    this.setData({
                        selectData: this.data.selectData
                    })
                }
            })
        },
        InputTiggleFocusClass(e) {
            if (e.type == 'focus')
                this.setData({
                    inputFocusClass: "focus"
                })
            else this.setData({
                inputFocusClass: ""
            });
        }
    }
})