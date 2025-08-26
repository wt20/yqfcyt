<!-- 订单页面 -->
<template>
	<view class="page">
		<view class="search-box">
			<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
				@input="$u.debounce(searchList, 500)"></u--input>
		</view>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list>
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<view class="list-item" @click="()=> click(item)">
						<view class="title">
							发货单位
						</view>
						<view class="content content-full">
							{{ item.shipperName || '--' }}
						</view>
						<view class="title">
							收货单位
						</view>
						<view class="content content-full">
							{{ item.consigneeName || '--'  }}
						</view>
						<view class="title">
							订单状态
						</view>
						<view class="content">
							{{ item.orderStatus || '--' }}
						</view>
						<view class="title">
							卸货方式
						</view>
						<view class="content">
							{{ item.unloadingMethod || '--'  }}
						</view>

						<view class="title">
							装车时间
						</view>
						<view class="content content-full">
							{{ item.expectedLoadingTime || '--'  }}
						</view>
						<view class="title">
							送达时间
						</view>
						<view class="content content-full">
							{{ item.requiredDeliveryTime || '--'  }}
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" />
		<view class="add-btn" @click="add">
			<u-icon name="plus" size="26" color="#fff"></u-icon>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {
		ordersFilter
	} from '@/pages_sub/api/transport.js'

	export default {
		data() {
			return {
				list: [],
				pageQuery: {
					page: 0,
					size: 30,
				},
				otherQuery: {},
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'keyword',
				placeholder: '请输入发货单位名称',
			};
		},
		onShow() {
			const t_user_info = uni.getStorageSync('t_user_info')
			if (!t_user_info) {
				uni.navigateTo({
					url: '/pages_sub/transportLogin/transportLogin'
				})
				return
			}
			if (this.searchField) this.otherQuery[this.searchField] = ''
			this.searchList()
		},
		computed: {},
		methods: {
			searchList() {
				this.pageQuery.page = 0
				this.list = []
				this.loadmore()
			},
			scrolltolower() {
				this.loadmore()
			},
			async loadmore() {
				this.status = 'loading'
				// const {
				// 	rows,
				// 	records
				// } = await ordersFilter({
				// 	...this.pageQuery,
				// 	...this.otherQuery
				// })
				// if (!rows) return
				const { rows, records } = {
					"page": 1,
					"pageSize": 10,
					"records": 15,
					"rows": [{
							"cargo": null,
							"cargoList": [{
								"cargoName": "",
								"cargoPhoto": "",
								"id": 32,
								"itemModel": "",
								"orderId": 37,
								"origin": "",
								"packaging": "",
								"photoFile": null,
								"requiredVehicleType": "不限制",
								"specification": ""
							}],
							"consigneeContact": "",
							"consigneeName": "",
							"consigneePhone": "",
							"cost": {
								"advancePayment": true,
								"id": 31,
								"isAdvancePayment": true,
								"settlementMethod": "",
								"settlementMethodDetail": "",
								"settlementUnit": ""
							},
							"costs": null,
							"customerOrderNo": "",
							"deliveryAddress": "",
							"expectedLoadingTime": null,
							"id": 37,
							"loadingAddress": "",
							"operator": "",
							"orderNo": "ORD20250825214308342",
							"orderStatus": "订单生成",
							"requiredDeliveryTime": null,
							"shipperContact": "",
							"shipperName": "",
							"shipperPhone": "",
							"signingRequirements": "",
							"transportOrder": null,
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "",
								"cargoPhoto": "",
								"id": 31,
								"itemModel": "",
								"orderId": 36,
								"origin": "",
								"packaging": "",
								"photoFile": null,
								"requiredVehicleType": "不限制",
								"specification": ""
							}],
							"consigneeContact": "",
							"consigneeName": "",
							"consigneePhone": "",
							"cost": {
								"advancePayment": true,
								"id": 30,
								"isAdvancePayment": true,
								"settlementMethod": "",
								"settlementMethodDetail": "",
								"settlementUnit": ""
							},
							"costs": null,
							"customerOrderNo": "",
							"deliveryAddress": "",
							"expectedLoadingTime": null,
							"id": 36,
							"loadingAddress": "",
							"operator": "",
							"orderNo": "ORD20250825214302600",
							"orderStatus": "订单生成",
							"requiredDeliveryTime": null,
							"shipperContact": "",
							"shipperName": "",
							"shipperPhone": "",
							"signingRequirements": "",
							"transportOrder": null,
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "中油抚顺低压2911",
								"cargoPhoto": "",
								"id": 30,
								"itemId": 7,
								"itemModel": "低压2911",
								"orderId": 35,
								"origin": "中油抚顺",
								"packaging": "",
								"photoFile": null,
								"quantity": 2720,
								"requiredVehicleType": "不限制",
								"specification": "25KG",
								"weight": 68
							}],
							"consigneeContact": "曹师",
							"consigneeName": "四川省恒丰塑胶有限公司",
							"consigneePhone": "13981761956",
							"cost": {
								"adjustFreight": 2035,
								"advancePayment": false,
								"freight": 2040,
								"id": 29,
								"isAdvancePayment": false,
								"settlementMethod": "月结",
								"settlementMethodDetail": "",
								"settlementUnit": "四川省恒丰塑胶有限公司"
							},
							"costs": null,
							"customerOrderNo": "SO250730000189 ",
							"deliveryAddress": "龙泉车城东七路398号",
							"deliveryAreaId": 14,
							"expectedLoadingTime": "2025-07-31 08:01:01",
							"id": 35,
							"loadingAddress": "龙泉驿洪安镇文安街1号",
							"loadingAreaId": 7,
							"operator": "",
							"orderNo": "ORD20250814161452063",
							"orderStatus": "已签收",
							"requiredDeliveryTime": "2025-07-31 18:30:00",
							"shipperContact": "陈荣",
							"shipperName": "四川省恒丰塑胶有限公司",
							"shipperPhone": "",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510126197205160333",
								"driverName": "周运贵",
								"driverPhone": "",
								"driverUserId": 30521,
								"id": 16,
								"operator": "",
								"orderId": 35,
								"payloadCapacity": 34500,
								"trailerNumber": "川AV530挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AHM335"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "聚乙烯新疆2426H",
								"cargoPhoto": "",
								"height": 2,
								"id": 29,
								"itemId": 5,
								"itemModel": "2426H",
								"length": 5,
								"orderId": 34,
								"origin": "新疆",
								"packaging": "塑料袋",
								"palletCount": 1,
								"photoFile": null,
								"quantity": 3000,
								"requiredVehicleType": "不限制",
								"specification": "25KG",
								"vehicleCount": 1,
								"weight": 30,
								"width": 2
							}],
							"consigneeContact": "ver",
							"consigneeName": "日2唐人",
							"consigneePhone": "1516666888",
							"cost": {
								"adjustFreight": 300000,
								"advancePayment": true,
								"freight": 300000,
								"id": 28,
								"isAdvancePayment": true,
								"loadingFee": 212,
								"settlementMethod": "现结",
								"settlementMethodDetail": "到付",
								"settlementUnit": "成都天成泰新能源材料有限公司",
								"unloadingFee": 121
							},
							"costs": null,
							"customerOrderNo": "C43454",
							"deliveryAddress": "热高热",
							"deliveryAreaId": 9,
							"expectedLoadingTime": "2025-08-13 15:48:58",
							"id": 34,
							"loadingAddress": "v不敢惹",
							"loadingAreaId": 7,
							"mileage": 212,
							"operator": "",
							"orderNo": "ORD20250813154948663",
							"orderStatus": "已派单",
							"requiredDeliveryTime": "2025-08-16 15:49:00",
							"shipperContact": "王伟",
							"shipperName": "成都天成泰新能源材料有限公司",
							"shipperPhone": "13133334444",
							"signingRequirements": "423523",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510125197701023139",
								"driverName": "何英明",
								"driverPhone": "",
								"driverUserId": 30517,
								"id": 15,
								"operator": "",
								"orderId": 34,
								"payloadCapacity": 34500,
								"trailerNumber": "川AQ751挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AER558"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "7042",
								"cargoPhoto": "",
								"id": 28,
								"itemId": 4,
								"itemModel": "",
								"orderId": 33,
								"origin": "",
								"packaging": "",
								"photoFile": null,
								"quantity": 1600,
								"requiredVehicleType": "不限制",
								"specification": "",
								"weight": 40
							}],
							"consigneeContact": "",
							"consigneeName": "",
							"consigneePhone": "",
							"cost": {
								"adjustFreight": 1600,
								"advancePayment": true,
								"freight": 1600,
								"id": 27,
								"isAdvancePayment": true,
								"loadingFee": 100,
								"settlementMethod": "现结",
								"settlementMethodDetail": "到付",
								"settlementUnit": "四川汇川达塑胶有限公司",
								"unloadingFee": 100
							},
							"costs": null,
							"customerOrderNo": "khdh000000001",
							"deliveryAddress": "简阳",
							"deliveryAreaId": 11,
							"expectedLoadingTime": null,
							"id": 33,
							"loadingAddress": "龙泉",
							"loadingAreaId": 7,
							"operator": "",
							"orderNo": "ORD20250813114533917",
							"orderStatus": "已接单",
							"requiredDeliveryTime": null,
							"shipperContact": "小李子",
							"shipperName": "四川汇川达塑胶有限公司",
							"shipperPhone": "18888888888",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510125197701023139",
								"driverName": "何英明",
								"driverPhone": "",
								"driverUserId": 30517,
								"id": 14,
								"operator": "",
								"orderId": 33,
								"payloadCapacity": 34500,
								"trailerNumber": "川AQ751挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AER558"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "聚乙烯新疆2426H",
								"cargoPhoto": "",
								"height": 2,
								"id": 27,
								"itemId": 5,
								"itemModel": "2426H",
								"length": 5,
								"orderId": 32,
								"origin": "新疆",
								"packaging": "塑料袋",
								"photoFile": null,
								"quantity": 400,
								"requiredVehicleType": "不限制",
								"specification": "25KG",
								"weight": 10,
								"width": 2
							}],
							"consigneeContact": "",
							"consigneeName": "",
							"consigneePhone": "",
							"cost": {
								"adjustFreight": 50000,
								"advancePayment": true,
								"freight": 50000,
								"id": 26,
								"isAdvancePayment": true,
								"loadingFee": 900,
								"settlementMethod": "现结",
								"settlementMethodDetail": "到付",
								"settlementUnit": "成都天成泰新能源材料有限公司",
								"unloadingFee": 800
							},
							"costs": null,
							"customerOrderNo": "424gbb",
							"deliveryAddress": "242",
							"deliveryAreaId": 9,
							"expectedLoadingTime": "2025-08-01 15:16:59",
							"id": 32,
							"loadingAddress": "424",
							"loadingAreaId": 7,
							"operator": "",
							"orderNo": "ORD20250812151825114",
							"orderStatus": "已签收",
							"requiredDeliveryTime": "2025-08-13 19:17:03",
							"shipperContact": "李四",
							"shipperName": "成都天成泰新能源材料有限公司",
							"shipperPhone": "",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510125197701023139",
								"driverName": "何英明",
								"driverPhone": "",
								"driverUserId": 30517,
								"id": 13,
								"operator": "",
								"orderId": 32,
								"payloadCapacity": 34500,
								"trailerNumber": "川AQ751挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AER558"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "兰化榆林低压23050 ",
								"cargoPhoto": "",
								"id": 25,
								"itemId": 6,
								"itemModel": "低压23050 ",
								"orderId": 30,
								"origin": "中油兰化榆林",
								"packaging": "",
								"photoFile": null,
								"requiredVehicleType": "8.6米",
								"specification": "",
								"vehicleCount": 1,
								"weight": 33
							}],
							"consigneeContact": "豆利静",
							"consigneeName": "四川亚大塑料制品有限公司 ",
							"consigneePhone": "18628076232",
							"cost": {
								"adjustFreight": 1480,
								"advancePayment": false,
								"freight": 1485,
								"id": 24,
								"isAdvancePayment": false,
								"settlementMethod": "月结",
								"settlementMethodDetail": "",
								"settlementUnit": "四川亚大塑料制品有限公司 "
							},
							"costs": null,
							"customerOrderNo": "",
							"deliveryAddress": "成都市都江堰天府大道358号",
							"deliveryAreaId": 13,
							"expectedLoadingTime": "2025-08-04 11:36:07",
							"id": 30,
							"loadingAddress": "成都市龙泉驿洪安镇文安街1号",
							"loadingAreaId": 7,
							"mileage": 69,
							"operator": "",
							"orderNo": "ORD2025081286",
							"orderStatus": "已签收",
							"requiredDeliveryTime": "2025-08-04 19:30:00",
							"shipperContact": "彭云",
							"shipperName": "四川亚大塑料制品有限公司 ",
							"shipperPhone": "023-84898380",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510125196911202333",
								"driverName": "林静松",
								"driverPhone": "",
								"driverUserId": 30520,
								"id": 12,
								"operator": "",
								"orderId": 30,
								"payloadCapacity": 33600,
								"trailerNumber": "川AK590挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AEJ556"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "7042",
								"cargoPhoto": "",
								"id": 24,
								"itemId": 4,
								"itemModel": "",
								"orderId": 29,
								"origin": "",
								"packaging": "",
								"photoFile": null,
								"quantity": 1320,
								"requiredVehicleType": "不限制",
								"specification": "",
								"weight": 33
							}],
							"consigneeContact": "",
							"consigneeName": "简阳慈泓",
							"consigneePhone": "",
							"cost": {
								"adjustFreight": 1320,
								"advancePayment": true,
								"freight": 1320,
								"id": 23,
								"isAdvancePayment": true,
								"settlementMethod": "现结",
								"settlementMethodDetail": "",
								"settlementUnit": "四川汇川达塑胶有限公司"
							},
							"costs": null,
							"customerOrderNo": "FHTZD143271",
							"deliveryAddress": "",
							"deliveryAreaId": 11,
							"expectedLoadingTime": null,
							"id": 29,
							"loadingAddress": "",
							"loadingAreaId": 7,
							"operator": "",
							"orderNo": "ORD2025081285",
							"orderStatus": "已完成",
							"requiredDeliveryTime": null,
							"shipperContact": "雷婷",
							"shipperName": "四川汇川达塑胶有限公司",
							"shipperPhone": "",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 5,
								"driverIdCard": "",
								"driverName": "汇川达司机",
								"driverPhone": "",
								"driverUserId": 30519,
								"id": 11,
								"operator": "",
								"orderId": 29,
								"payloadCapacity": 9990,
								"trailerNumber": "",
								"transportCompany": "四川汇川达塑胶有限公司",
								"transportContact": "",
								"transportPhone": "",
								"vehicleNumber": "川AFL556"
							},
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "聚丙烯兰化EP533N",
								"cargoPhoto": "upload/cargo/23_img_1755503797563.jpg",
								"id": 23,
								"itemId": 3,
								"itemModel": "EP533N ",
								"orderId": 28,
								"origin": "中油兰州石化",
								"packaging": "塑料袋",
								"photoFile": null,
								"quantity": 2560,
								"requiredVehicleType": "不限制",
								"specification": "25KG",
								"vehicleCount": 2,
								"weight": 64
							}],
							"consigneeContact": "李晓庆",
							"consigneeName": "四川朗迪新材料有限公司",
							"consigneePhone": "18981115860",
							"cost": {
								"adjustFreight": 3520,
								"advancePayment": false,
								"freight": 3520,
								"id": 22,
								"isAdvancePayment": false,
								"settlementMethod": "月结",
								"settlementMethodDetail": "",
								"settlementUnit": "四川朗迪新材料有限公司"
							},
							"costs": null,
							"customerOrderNo": "SO250708000265 ",
							"deliveryAddress": "罗江经济开发区金山工业园区光明路",
							"deliveryAreaId": 9,
							"expectedLoadingTime": "2025-07-21 15:54:04",
							"id": 28,
							"loadingAddress": "成都市龙泉驿洪安镇文安街1号",
							"loadingAreaId": 7,
							"operator": "",
							"orderNo": "ORD2025081171",
							"orderStatus": "待审核",
							"requiredDeliveryTime": "2025-07-22 15:53:56",
							"shipperContact": "陈荣",
							"shipperName": "四川朗迪新材料有限公司",
							"shipperPhone": "13303030033",
							"signingRequirements": "",
							"transportOrder": null,
							"unloadingMethod": "客户自卸"
						},
						{
							"cargo": null,
							"cargoList": [{
								"cargoName": "聚丙烯",
								"cargoPhoto": "",
								"id": 22,
								"itemId": 3,
								"itemModel": "EP533N ",
								"orderId": 27,
								"origin": "中油兰州石化",
								"packaging": "塑料袋",
								"photoFile": null,
								"requiredVehicleType": "不限制",
								"specification": "25KG",
								"weight": 20
							}],
							"consigneeContact": "",
							"consigneeName": "",
							"consigneePhone": "",
							"cost": {
								"adjustFreight": 0,
								"advancePayment": true,
								"freight": 0,
								"id": 21,
								"isAdvancePayment": true,
								"settlementMethod": "",
								"settlementMethodDetail": "",
								"settlementUnit": "小李"
							},
							"costs": null,
							"customerOrderNo": "",
							"deliveryAddress": "东方新城",
							"deliveryAreaId": 3,
							"expectedLoadingTime": null,
							"id": 27,
							"loadingAddress": "龙潭寺",
							"loadingAreaId": 6,
							"operator": "",
							"orderNo": "ORD1754547997081838C",
							"orderStatus": "已审核",
							"requiredDeliveryTime": null,
							"shipperContact": "张三",
							"shipperName": "小李",
							"shipperPhone": "13303030033",
							"signingRequirements": "",
							"transportOrder": {
								"actualVehicleType": "",
								"carrierId": 3,
								"driverIdCard": "510125196911202333",
								"driverName": "林静松",
								"driverPhone": "",
								"driverUserId": 30520,
								"id": 9,
								"operator": "",
								"orderId": 27,
								"payloadCapacity": 33600,
								"trailerNumber": "川AK590挂",
								"transportCompany": "成都运齐发快运有限责任公司",
								"transportContact": "樊海燕",
								"transportPhone": "",
								"vehicleNumber": "川AEJ556"
							},
							"unloadingMethod": "客户自卸"
						}
					],
					"total": 2
				}
				if (rows.length === 0 || rows.length < this.pageQuery.size) {
					if (records > this.list.length) this.list.push(...rows)
					return this.status = 'nomore'
				}
				if (rows.length >= this.pageQuery.size) {
					this.list.push(...rows)
					this.pageQuery.page++
					this.status = 'loadmore'
				}
			},
			click(item) {
				uni.setStorageSync('appointment_selectGoods', [])
				uni.navigateTo({
					url: `/pages/deliver_goods/details?params=${JSON.stringify(item)}`
				});
			},
			add() {
				uni.setStorageSync('appointment_selectGoods', [])
				uni.navigateTo({
					url: `/pages/deliver_goods/details`
				});
			}
		},
	}
</script>

<style lang="scss">
	.page {
		padding: 24rpx;
		background: #ececec;
		height: 100vh;

		.search-box {
			background: #fff;
		}
	}

	.list-item {
		grid-row-gap: 16rpx;
	}

	.add-btn {
		position: fixed;
		top: 50vh;
		right: 24rpx;
		background: #2979ff;
		border-radius: 50%;
		padding: 12rpx;

		&:active {
			background: #245eb0;
		}
	}

	.list-item {
		grid-template-columns: 120rpx 1fr 120rpx 1fr;
	}
</style>