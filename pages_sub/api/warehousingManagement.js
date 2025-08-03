export const addOrUpdateWarehouse =  (data) => {
	return  uni.$u.http.post(`/wms/wx/receiptOrder/add-or-update`, null, {
		data: data,
	}).then(res=>res)
}

export const addOrUpdateShipmentOrder =  (data) => {
	return  uni.$u.http.post(`/wms/wx/shipmentOrder/add-or-update`, null, {
		data: data,
	}).then(res=>res)
}