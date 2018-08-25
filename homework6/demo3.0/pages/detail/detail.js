var urls 		= require('../../utils/urls')
var utils 		= require('../../utils/util')
var API			= require('../../utils/apis')
var settings	= require('../../settings')

var app = getApp()

Page({
	data: {
		product: {
			name: ""
		},
		number: 1,
		selected: 0
	},
	onLoad: function (options) {
		var id 		= parseInt(options.id),
			catalog = options.catalog

		this.catalog = catalog
		this.id = id
		this.fetchProduct()
	},
	onNumberChange: function (e) {
		var data = e.currentTarget.dataset
		if (data.dir === '1')
			this.data.number ++
		else
			this.data.number = this.data.number - 1 > 0 ? this.data.number - 1 : 1
		this.setData({
			number: this.data.number
		})
	},
	onSizeChange: function (e) {
		this.setData({
			selected: e.detail.value
		})
	},
	onLikeClick: function (e) {
		var data = e.currentTarget.dataset
		var id = data.id
		API[this.catalog].like(id).then(this.fetchProduct)
	},
	onSubmit: function () {
		console.log("adding the item to order list")
		var order = {
			catalog: this.catalog,
			id: this.id,
			teer: this.data.selected,
			count: this.data.number,
			thumb: this.data.product.img,
			name: this.data.product.name,
			price: this.data.product.prices[this.data.selected].price
		}
		try {
			var cart = wx.getStorageSync('cart')
		} catch (e) {
			console.log("something went wrong when trying to access 'cart' in the local storage")
			return 
		}
		cart.push(order)
		try {
			wx.setStorageSync('cart', cart)
		} catch (e) {
			console.log("something went wrong when trying to save 'cart' in the local storage")
			return 
		}
		wx.showModal({
			content: "成功添加到订单",
			showCancel: true,
			cancelText: "返回菜单",
			confirmText: "去付款",
			success: function (res) {
				if (res.confirm) {
					console.log("去付款页面")
					wx.switchTab({
						url: "/pages/cart/cart"
					})
				} else {
					console.log("返回菜单页面")
					wx.navigateBack()
				}
			},
			fail: function () {
				console.log("弹出框失败: ", arguments)
			}
		})
	},
	fetchProduct: function () {
		var page 	= this,
			id 		= this.id,
			catalog = this.catalog
		API[catalog].get(id).then(function (obj) {
			console.log(obj)
			page.setData({
				product: obj
			})
		}, function () {
			console.log('error: couldn\'t find item {0}'.format(id))
		})
	}
})

