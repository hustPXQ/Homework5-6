var urls 		= require('../../utils/urls')
var utils 		= require('../../utils/util')
var API			= require('../../utils/apis')
var settings	= require('../../settings')

var app = getApp()

Page({
	data: {
		// cart: []
	},
	onLoad: function () {
	},
	onShow: function () {
		try {
			var cart = wx.getStorageSync('cart')
		} catch (e) {
			console.log("something went wrong when trying to access 'cart' in the local storage")
			return 
		}
		this.setData({
			cart: cart
		})
		this.getTotal()
	},
	onHide: function () {
		try {
			wx.setStorageSync('cart', this.data.cart)
		} catch (e) {
			console.log("something went wrong when trying to save 'cart' in the local storage")
		}
	},
	onCartEmptyBtnClick: function (e) {
		wx.switchTab({
			url: "/pages/catalog/catalog"
		})
	},
	onCountClick: function (e) {
		var data		= e.currentTarget.dataset,
			modifier	= data.mod,
			delta		= parseInt(modifier),
			cart 		= this.data._cart
		this.data.cart[data.index].count += delta
		if (this.data.cart[data.index].count === 0) 
			this.data.cart.splice(data.index, 1)
		this.setData({
			cart: this.data.cart
		})
		this.getTotal()
	},
	getTotal: function () {
		var total = 0
		for (let i = 0; i < this.data.cart.length; i++) {
			total += this.data.cart[i].price * this.data.cart[i].count
		}
		this.setData({
			total: total.currency()
		})
	},
	onCheckout: function () {
		var order = []
		this.data.cart.forEach(function (elem, i) {
			var item = {
				catalog: elem.catalog,
				id: elem.id,
				count: elem.count,
				teer: elem.teer
			}
			order.push(item)
		})
		console.log(order)

		wx.showToast({
			title: '付款成功',
			icon: "success",
			duration: 1000,
			mask: true
		})
		this.setData({
			cart: []
		})
		setTimeout(function () {
			wx.switchTab({
				url: "/pages/catalog/catalog"
			})
		}, 1001)


		// wx.requestPayment({
		// 	timeStamp: '',
		// 	success: function (res) {
		// 		console.log(res)
		// 	},
		// 	fail: function (res) {
		// 		console.log(res)
		// 	}
		// })
	}
})
