function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()


	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

Number.prototype.currency = function () {
	if (this === Math.floor(this))
		return "{0}.00".format(this)
	return this
}

String.prototype.pathJoin = function () {
	var current		= this
	var args 		= Array.prototype.slice.call(arguments)
	args.forEach(function (elem, i) {
		var ending = current[current.length - 1],
			starting = elem[0]
		if (ending !== '/')
			current = current + '/'

		if (starting === '/')
			current += elem.substring(1)
		else
			current += elem
	})
	return current
}

String.prototype.format = function () {
	var formatted = this
	for (var i = 0; i < arguments.length; i++) {
		var regexp = new RegExp('\\{'+i+'\\}', 'gi')
		formatted = formatted.replace(regexp, arguments[i])
	}
	return formatted
}

var events = {
	on: function (event, callback) {
		var eventData = events.data
		if (eventData.hasOwnProperty(event))
			eventData[event].push(callback)
		else
			eventData[event] = [callback]
		return this
	},
	fire: function (event, data, args) {
		var functionList = events.data[event]
		if (!functionList.length) {
			throw new Error("event {0} cannot be found".format(event))
		}
		for (let i = 0; i < functionList.length; i++) {
			var fn = functionList[i]
			fn.apply(args, [data, event])
		}
		return this
	},
	data: {}
}

module.exports = {
	formatTime: formatTime,
	events: events
}
