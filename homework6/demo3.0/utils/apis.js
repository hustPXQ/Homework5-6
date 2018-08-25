var settings	= require('../settings.js')
var Promise = require('./es6-promise.auto.min.js')
if (settings.DEBUG) {
	var _fake = require('_fakedata.js')
}

module.exports = {
	noodle: {
		fetch: function () {
			return new Promise(function (resolve, reject) {
				if (settings.DEBUG) {
					var list = _fake.noodleList
					setTimeout(function () {resolve(list)}, settings.LATENCY)
				} else {

				}
			})
		},
		like: function (id) {
			return new Promise(function (resolve, reject) {
				if (settings.DEBUG) {
					for (let i = 0; i < _fake.noodleList.length; i++) {
						if (_fake.noodleList[i].id === id) {
							_fake.noodleList[i].like = !_fake.noodleList[i].like
							break
						}
					}
					setTimeout(function () {resolve()}, settings.LATENCY)
				} else {

				}
			})
		},
		get: function (id) {
			return new Promise(function (resolve, reject) {
				if (settings.DEBUG) {
					var list = _fake.noodleList
					for (let i = 0; i < list.length; i++) {
						if (list[i].id === id) {
							setTimeout(function () {resolve(list[i])}, settings.LATENCY)
							return 
						}
					}
					reject()
				} else {

				}
			})
		}
	}
}