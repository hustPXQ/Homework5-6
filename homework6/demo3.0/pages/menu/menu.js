var urls 		= require('../../utils/urls')
var utils 		= require('../../utils/util')
var API			= require('../../utils/apis')
var settings	= require('../../settings')

var app 	= getApp()
var catalog	= ''

Page({
	data: {
		catalog: "",
		hero: {
			noodle: {
				title: "面条",
				text: "一面之交 一生难忘",
				img: "noodle.jpg"
			},
      friedRice: {
				title: "炒饭",
				text: "听说你很冷 刚好我很暖",
				img: "friedRice.jpg"
			},
			congee: {
				title: "粥",
				text: "熬过千回百转 对你深情款款",
				img: "congee.jpg"
			},
			steam: {
				title: "蒸点",
				text: "蒸的 很不错",
				img: "steam.jpg"
			}
		},
		products: [],
		emptyText: "抱歉, 暂时没有{0}出售!"
	},
	onLoad: function (options) {
		catalog = options.catalog
		this.setData({
			catalog: options.catalog,
			emptyText: this.data.emptyText.format(this.data.hero[catalog].title)
		})
		wx.setNavigationBarTitle({
			title: this.data.hero[catalog].title
		})
		this.fetchProducts()
	},
	onShow: function () {
	},
	onLikeClick: function (e) {
		var data = e.currentTarget.dataset
		var id = data.id
		API[this.data.catalog].like(id).then(this.fetchProducts)
	},
	onItemClick: function (e) {
		var data = e.currentTarget.dataset
		var navigateUrl = '/pages/detail/detail?catalog={0}&id={1}'.format(this.data.catalog, data.id)
		wx.navigateTo({
			url: navigateUrl
		})
	},
	fetchProducts: function () {
		var page = this
		API[catalog].fetch().then(function (list) {
			list.forEach(function (elem, i) {
				list[i].price = elem.prices[0].price
			})
			page.setData({
				products: list
			})
		})
	}
})
