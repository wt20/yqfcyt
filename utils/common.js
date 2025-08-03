// 公共js

// 随机id
export const createUUID = function() {
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

// 时间格式化
export const formatPast = (date, type = "default", zeroFillFlag = true) => {
	// 定义countTime变量，用于存储计算后的数据
	let countTime;
	// 获取当前时间戳
	let time = new Date().getTime();
	// 转换传入参数为时间戳
	let afferentTime = new Date(date).getTime();
	// 当前时间戳 - 传入时间戳
	time = Number.parseInt(`${time - afferentTime}`);
	if (time < 10000) {
		// 10秒内
		return "刚刚";
	} else if (time < 60000) {
		// 超过10秒少于1分钟内
		countTime = Math.floor(time / 1000);
		return `${countTime}秒前`;
	} else if (time < 3600000) {
		// 超过1分钟少于1小时
		countTime = Math.floor(time / 60000);
		return `${countTime}分钟前`;
	} else if (time < 86400000) {
		// 超过1小时少于24小时
		countTime = Math.floor(time / 3600000);
		return `${countTime}小时前`;
	} else if (time >= 86400000 && type == "default") {
		// 超过二十四小时（一天）且格式参数为默认"default"
		countTime = Math.floor(time / 86400000);
		//大于等于365天
		if (countTime >= 365) {
			return `${Math.floor(countTime / 365)}年前`;
		}
		//大于等于30天
		if (countTime >= 30) {
			return `${Math.floor(countTime / 30)}个月前`;
		}
		return `${countTime}天前`;
	} else {
		// 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
		// 数字补零
		let Y = new Date(date).getFullYear();
		let M = new Date(date).getMonth() + 1;
		let zeroFillM = M > 9 ? M : "0" + M;
		let D = new Date(date).getDate();
		let zeroFillD = D > 9 ? D : "0" + D;
		// 传入格式为"-" "/" "."
		if (type == "-" || type == "/" || type == ".") {
			return zeroFillFlag ?
				Y + type + zeroFillM + type + zeroFillD :
				Y + type + M + type + D;
		}
		// 传入格式为"年月日"
		if (type == "年月日") {
			return zeroFillFlag ?
				Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2] :
				Y + type[0] + M + type[1] + D + type[2];
		}
		// 传入格式为"月日"
		if (type == "月日") {
			return zeroFillFlag ?
				zeroFillM + type[0] + zeroFillD + type[1] :
				M + type[0] + D + type[1]
		}
		// 传入格式为"年"
		if (type == "年") {
			return Y + type
		}

	}
};

// 是否是业主
export const isOwnerDp = function() {
	return uni.getStorageSync('user_info').identity === 'OwnerDp';
}

// 时间格式化
export const formatDateLL = function(dateString) {
	if (!dateString) return '-'
	if (dateString.includes('年') || dateString.includes('月') || dateString.includes('日')) return dateString
	var dateObject = new Date(dateString)
	const year = dateObject.getFullYear();
	let month = dateObject.getMonth() + 1;
	month = month > 9 ? month : `0${month}`
	let day = dateObject.getDate();
	day = day > 9 ? day : `0${day}`
	return `${year}年${month}月${day}日`
}

export const isEmpty = function(val) {
	return !val && val !== 0
}

export const bindData = function(modal, data) {
	for (var key in modal) {
		if (modal.hasOwnProperty(key) && data.hasOwnProperty(key)) {
			if (!isEmpty(data[key])) {
				modal[key] = data[key]
				// console.log(key);
				// if(Object.prototype.toString.call(modal[key]) === '[object Object]') {
				// 	bindData(modal[key], data[key])
				// }else modal[key] = data[key]
			}
		}
	}
	return modal
}