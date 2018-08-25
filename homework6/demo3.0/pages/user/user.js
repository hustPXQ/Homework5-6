var urls 	= require('../../utils/urls')
var utils 	= require('../../utils/util')

var app = getApp()

Page({
	data: {
		avatarUrl: '',
		bgUrl: '/assets/home/bg.jpg',
		favorite: {
			name: "Noodle",
			src: '/assets/tmp/item0.jpg',
			id: 1,
			price: 12.5,
			like: true
		}
	},
	onLoad: function () {
		var page = this
		wx.getUserInfo({
			success: function (res) {
				console.log(res)
				page.setData({
					avatarUrl: res.userInfo.avatarUrl
				})
			}
		})
	},
	onClearCartClick: function () {
		wx.clearStorage()
		var cart = []
		wx.getStorage({
			key: 'cart',
			fail: function () {
				console.log('app doesn\'t have cart stored, creating new...')
				wx.setStorageSync('cart', cart)
			}
		})
	}
})
