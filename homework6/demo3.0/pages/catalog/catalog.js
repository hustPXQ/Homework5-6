var urls 		= require('../../utils/urls')
var utils 		= require('../../utils/util')
var API			= require('../../utils/apis')
var settings	= require('../../settings')

var app = getApp()

Page({
	data: {
		catalogs: [{
			name: 'noodle',
			title: "面条",
			img: "noodle.jpg"
		}, {
			name: 'friedRice',
			title: "炒饭",
        img: "friedRice.jpg"
		}, {
			name: 'congee',
			title: "粥",
        img: 'congee.jpg'
		}, {
			name: 'steam',
			title: "蒸点",
			img: 'steam.jpg'
		}]
	},
	onLoad: function () {
	},

	onTap: function (e) {
		var catalog = e.currentTarget.dataset.catalog
		var navigateUrl = '/pages/menu/menu?catalog={0}'.format(catalog)

		wx.navigateTo({
			url: navigateUrl
		})
	}
})
