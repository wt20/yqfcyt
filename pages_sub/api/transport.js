const baseUrl = 'https://yqfcyt.com/PetroCarRentPlatform'

// 登录
export const tLogin = (data) => {
	return uni.$u.http.request({
		method: 'POST',
		url: `${baseUrl}/system/doLogin`,
		data,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
	})
}

// 查询货物列表（创建订单下拉列表）
export const getItemList = (data) => {
	// return uni.$u.http.post(`${baseUrl}/item/getItemList`, null, {
	// 	data: data,
	// })
	// return uni.$u.http.request({
	// 	method: 'POST',
	// 	url: `${baseUrl}/item/getItemList`,
	// 	data,
	// 	header: {
	// 		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	// 	}
	// })

	return {
		"page": 1,
		"records": 7,
		"rows": [{
				"createTime": "2025-08-14 16:10:26",
				"delFlag": 0,
				"id": 7,
				"itemModel": "低压2911",
				"itemName": "中油抚顺低压2911",
				"itemNo": "HP0864",
				"label": "",
				"packaging": "",
				"productionPlace": "中油抚顺",
				"remark": "",
				"specification": "25KG",
				"type": "普货",
				"unitVolume": "",
				"unitWeight": "25",
				"updateTime": "2025-08-14 16:10:26"
			},
			{
				"createTime": "2025-08-12 11:33:35",
				"delFlag": 0,
				"id": 6,
				"itemModel": "低压23050 ",
				"itemName": "兰化榆林低压23050 ",
				"itemNo": "HP69563",
				"label": "",
				"packaging": "",
				"productionPlace": "中油兰化榆林",
				"remark": "",
				"specification": "",
				"type": "",
				"unitVolume": "",
				"unitWeight": "50",
				"updateTime": "2025-08-13 09:45:09"
			},
			{
				"createTime": "2025-08-12 11:15:49",
				"delFlag": 0,
				"id": 5,
				"itemModel": "2426H",
				"itemName": "聚乙烯新疆2426H",
				"itemNo": "HP87462",
				"label": "普货",
				"packaging": "塑料袋",
				"productionPlace": "新疆",
				"remark": "",
				"specification": "25KG",
				"type": "",
				"unitVolume": "",
				"unitWeight": "25",
				"updateTime": "2025-08-12 11:15:49"
			},
			{
				"createTime": "2025-08-12 10:21:50",
				"delFlag": 0,
				"id": 4,
				"itemModel": "",
				"itemName": "7042",
				"itemNo": "7042",
				"label": "",
				"packaging": "",
				"productionPlace": "",
				"remark": "",
				"specification": "",
				"type": "",
				"unitVolume": "",
				"unitWeight": "25",
				"updateTime": "2025-08-12 10:21:50"
			},
			{
				"createTime": "2025-08-01 14:50:56",
				"delFlag": 0,
				"id": 3,
				"itemModel": "EP533N ",
				"itemName": "聚丙烯兰化EP533N",
				"itemNo": "HP7686",
				"label": "",
				"packaging": "塑料袋",
				"productionPlace": "中油兰州石化",
				"remark": "",
				"specification": "25KG",
				"type": "普货",
				"unitVolume": "",
				"unitWeight": "25",
				"updateTime": "2025-08-12 11:15:04"
			},
			{
				"createTime": "2025-07-31 10:39:22",
				"delFlag": 0,
				"id": 2,
				"itemModel": "针状（中性无字包装）",
				"itemName": "阴离子型有机表面活性剂江苏十二烷基硫酸钠",
				"itemNo": "HP151",
				"label": "",
				"packaging": "纸塑复合袋",
				"productionPlace": "江苏",
				"remark": "",
				"specification": "25KG",
				"type": "普货",
				"unitVolume": "",
				"unitWeight": "25",
				"updateTime": "2025-07-31 10:39:22"
			},
			{
				"createTime": "2025-07-31 09:50:21",
				"delFlag": 0,
				"id": 1,
				"itemModel": "1810D",
				"itemName": "聚乙烯新疆1810D",
				"itemNo": "HP157",
				"label": "",
				"packaging": "塑料袋",
				"productionPlace": "新疆",
				"remark": "",
				"specification": "25KG",
				"type": "普货",
				"unitVolume": "",
				"unitWeight": "",
				"updateTime": "2025-08-12 11:14:43"
			}
		],
		"total": 1
	}
}

// 查询客户列表（创建订单下拉列表）
export const getCustomerList = (data) => {
	return uni.$u.http.post(`${baseUrl}/customer/getCustomerList`, null, {
		data: data,
	})
}

// 查询区域地址列表（创建订单下拉列表）
export const getAreaList = (data) => {
	return uni.$u.http.post(`${baseUrl}/area/getAreaList`, null, {
		data: data,
	})
}

// 新增订单
export const ordersCreate = (data) => {
	return uni.$u.http.post(`${baseUrl}/api/orders/create`, null, {
		data: data,
	})
}

// 修改订单
export const ordersUpdate = (data) => {
	return uni.$u.http.post(`${baseUrl}/api/orders/update`, null, {
		data: data,
	})
}

// 查询订单列表
export const ordersFilter = (data) => {
	return uni.$u.http.get(`${baseUrl}/api/orders/filter`, {
		params: data,
	})
}

// 查询派给我的订单列表
export const getDriverTransportOrder = (data) => {
	return uni.$u.http.get(`${baseUrl}/api/orders/getDriverTransportOrder`, {
		params: data,
	})
}

// 修改订单状态
export const orderStatusUpdate = (data) => {
	return uni.$u.http.post(`${baseUrl}/api/orderStatus/wx/update`, null, {
		data: data,
	})
}