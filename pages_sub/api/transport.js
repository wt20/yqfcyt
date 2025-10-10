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
	return uni.$u.http.post(`${baseUrl}/item/getItemList`, null, {
		data: data,
	})
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