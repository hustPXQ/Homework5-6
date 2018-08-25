//app.js
App({
	onLaunch: function () {
		this.getUserInfo()
		var cart = []
		wx.getStorage({
			key: 'cart',
			fail: function () {
				console.log('app doesn\'t have cart stored, creating new...')
				wx.setStorageSync('cart', cart)
			}
		})
	},
	getUserInfo:function(cb){
		var that = this
		if(this.globalData.userInfo){
			typeof cb == "function" && cb(this.globalData.userInfo)
		}else{
			//调用登录接口
			wx.login({
				success: function () {
					wx.getUserInfo({
						success: function (res) {
							that.globalData.userInfo = res.userInfo
							typeof cb == "function" && cb(that.globalData.userInfo)
						}
					})
				}
			})
		}
	},
	globalData:{
		userInfo:null
	},
  appData: {
    userinfo: null,
  }
})