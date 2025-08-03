export const getDictOptions = async (key) => {
	return await uni.$u.http.get(`/system/dict/data/type/${key}`, null, {
		custom: {
			loading: false
		}
	})
}

export const getWMSOptions = async (key) => {
	return await uni.$u.http.post(`/wms/${key}/list?page=0&size=1000`, null, {
		data: {},
		custom: {
			loading: false
		}
	})
}


export const getDictLabel = (value, key) => {
	let options = []
	let labelKey = 'dictLabel'
	let valueKey = 'dictValue'
	switch (key) {
		case 'audit_status':
			options = auditStatuses
			break;
		case 'wms_receipt_type':
			options = wmsReceiptTypes
			break;
		case 'wms_shipment_status':
			options = auditShipmentStatuses
			break;
		case 'wms_shipment_type':
			options = wmsShipmentTypes
			break;
		case 'wms_check_status':
			options = wmsCheckStatus
			break;
		case 'warehouse':
			options = warehouses
			labelKey = 'warehouseName'
			valueKey = 'id'
			break;
		case 'area':
			options = areas
			labelKey = 'areaName'
			valueKey = 'id'
			break;
		case 'rack':
			options = racks
			labelKey = 'rackName'
			valueKey = 'id'
			break;
		case 'supplier':
			options = suppliers
			labelKey = 'supplierName'
			valueKey = 'id'
			break;
		case 'customer':
			options = customers
			labelKey = 'customerName'
			valueKey = 'id'
			break;
		case 'carrier':
			options = carriers
			labelKey = 'carrierName'
			valueKey = 'id'
			break;
		default:
			break;
	}
	if (!options?.length) return ''
	return options?.filter(i => i[valueKey] == value)[0]?.[labelKey] || ''
}


// 审核状态
let auditStatuses = []
// 操作类型
let wmsReceiptTypes = []
// 仓库
let warehouses = []
// 审核状态--出库
let auditShipmentStatuses = []
// 操作类型--出库
let wmsShipmentTypes = []
// 盘点单状态
let wmsCheckStatus = []

// 区域
let areas = []
// 货架
let racks = []
// 供应商
let suppliers = []
// 客户
let customers = []
// 运输单位
let carriers = []

export function iniData() {
	getDictOptions('audit_status').then(res => {
		auditStatuses = res
	})
	getDictOptions('wms_receipt_type').then(res => {
		wmsReceiptTypes = res
	})
	getDictOptions('wms_shipment_status').then(res => {
		auditShipmentStatuses = res
	})
	getDictOptions('wms_shipment_type').then(res => {
		wmsShipmentTypes = res
	})
	getDictOptions('wms_check_status').then(res => {
		wmsCheckStatus = res
	})

	getWMSOptions('warehouse').then(({
		content
	}) => {
		warehouses = content
	})
	getWMSOptions('area').then(({
		content
	}) => {
		areas = content
	})
	getWMSOptions('rack').then(({
		content
	}) => {
		racks = content
	})
	getWMSOptions('supplier').then(({
		content
	}) => {
		suppliers = content
	})
	getWMSOptions('customer').then(({
		content
	}) => {
		customers = content
	})
	getWMSOptions('carrier').then(({
		content
	}) => {
		carriers = content
	})
}

iniData()

const getTreeWarehouseArea = () => {
	const areasRacks = areas.map(i => {
		return {
			...i,
			curLabel: i.areaName,
			children: racks?.filter(a => {
				return a.areaId === i.id
			}).map(el => ({
				...el,
				curLabel: el.rackName
			}))
		}
	})

	return warehouses.map(i => {
		return {
			...i,
			curLabel: i.warehouseName,
			children: areasRacks?.filter(a => {
				return a.warehouseId === i.id
			})
		}
	})
}

export default function() {
	if(!Array.isArray(auditStatuses) || !auditStatuses.length) {
		iniData()
	}
	return {
		auditStatuses,
		wmsReceiptTypes,
		auditShipmentStatuses,
		wmsShipmentTypes,
		wmsCheckStatus,
		warehouses,
		areas,
		racks,
		suppliers,
		customers,
		carriers,
		getTreeWarehouseArea,
	}
}