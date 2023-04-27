Page({
    data: {
        isResult: false,
    },

    submit(e) {
        let data = e.detail.value
        if (data.Name.length < 2) {
            wx.showToast({
                title: '姓名不得为空',
                icon: 'error'
            })
        } else if (data.IdCard.length != 18) {
            wx.showToast({
                title: '证件号位数不足',
                icon: 'error'
            })
        } else {
            wx.showLoading({
                title: '请稍候',
            })
            wx.cloud.callFunction({
                name: 'identify',
                data: data
            }).then(res => {
                console.log(res.result)
                if (res.result.Result == 0) {
                    this.setData({
                        isResult: true,
                        isPass: true,
                        title: '认证成功',
                        desc: '信息核验通过'
                    })
                    wx.hideLoading()
                } else {
                    this.setData({
                        isResult: true,
                        isPass: false,
                        title: '认证失败',
                        desc: res.result.Description
                    })
                    wx.hideLoading()
                }
            })
        }
    },

})