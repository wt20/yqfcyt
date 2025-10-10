const baseUrl = '/wms/wx'

export const addOrUpdateWarehouse =  (data) => {
	return  uni.$u.http.post(`${baseUrl}/receiptOrder/add-or-update`, null, {
		data: data,
	}).then(res=>res)
}

export const addOrUpdateShipmentOrder =  (data) => {
	return  uni.$u.http.post(`${baseUrl}/shipmentOrder/add-or-update`, null, {
		data: data,
	}).then(res=>res)
}

// 出入库吨位、操作单量
export const getInOutTon = (data) => {
	return uni.$u.http.get(`${baseUrl}/statistics/getInOutTon`, {
		params: data,
	})
}

// 库存总吨位、库容比
export const getInventoryRatio = (data) => {
	return uni.$u.http.get(`${baseUrl}/statistics/getInventoryRatio`, {
		params: data,
	})
}

// 营收、营收目标完成比例
export const getRevenueRatio = (data) => {
	return uni.$u.http.get(`${baseUrl}/statistics/getRevenueRatio`, {
		params: data,
	})
}

// 库存总吨位、库容比
export const getReceivablesRatio = (data) => {
	return uni.$u.http.get(`${baseUrl}/statistics/getReceivablesRatio`, {
		params: data,
	})
}
