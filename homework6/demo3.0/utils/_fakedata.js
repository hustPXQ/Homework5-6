var _fakeCatalogs = [{
	name: 'noodle',
	title: '面条',
	img: 'noodle.jpg'
}, {
    name: 'friedRice',
	title: '炒饭',
    img: 'friedRice.jpg'
}, {
    name: 'congee',
	title: '粥',
    img: 'congee.jpg'
}, {
	name: 'steam',
	title: '蒸点',
	img: 'steam.jpg'
}]

var _fakeNoodleList = [{
	id: 1,
	name: "素拌面",
	prices: [{
		size: '不加蛋',
		price: 3.5
	}, {
		size: '加蛋',
		price: 5
	}],
	description: "菜品描述：在葱油拌面的基础上加入胡萝卜丝、黄瓜丝、花生碎等，辅以料酒提香。",
	img: "/assets/tmp/item0.jpg",
	like: false
}, {
	id: 2,
	name: "炸酱拌面",
	prices: [{
		size: '不加蛋',
		price: 5.5
	}, {
		size: '加蛋',
		price: 7
	}],
	description: "菜品描述：肉丁及姜葱干炸即成炸酱。",
	img: "/assets/tmp/item1.jpg",
	like: true
}]

module.exports = {
	catalogs: _fakeCatalogs,
	noodleList: _fakeNoodleList
}