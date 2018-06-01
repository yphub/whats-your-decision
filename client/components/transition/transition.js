Component({
    properties: {
        name: String,
        duringTime: Number,
        if: {
            type: String,
            observer(res) {
                console.log(res);
                if (res === true)
                    this.setData({
                        keyclass: this.data.name + '-in'
                    });
                
            }
        }
    },
    data: {
        keyclass: ""
    },
    methods: {

    }
})