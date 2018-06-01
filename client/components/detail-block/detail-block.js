var obj = global.watcher.prepare({
    properties: {
        selectData: {
            type: Object,
            value: {},
        }
    },
    watch: {
        selectData(newval) {
            if (newval === null)
                this.data.selectData = {
                    imgurl: "",
                    text: ""
                }
            else {
                this.data.colorSelectArr[this.data.colorSelectArr.length - 1] = newval.imgurl;
            }
        }
    },
    data: {
        showClass: "",
        inputFocusClass: "",
        colorSelectArr: [
            "red", "blue", "green"
        ]
    },
    created() {
        this.data.colorSelectArr.push(this.data.selectData.imgurl);
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
                    this.data.colorSelectArr[this.data.colorSelectArr.length - 1] = this.data.selectData.imgurl;
                }
            })
        },
        SetColor(e) {
            this.data.selectData.imgurl = e.target.dataset.color;
        },
        InputTiggleFocusClass(e) {
            if (e.type == 'focus')
                this.data.inputFocusClass = "focus"
            else this.data.inputFocusClass = ""
        }
    }
})

Component(obj);