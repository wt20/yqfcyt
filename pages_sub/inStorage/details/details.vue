<template>
	<view class="appointment-box">
		<u--form labelPosition="left" :model="formModel" :rules="rules" ref="formRef" labelWidth="100"
			:customStyle="{padding: '0px 20px'}">
			<u-form-item label="仓库流水号" prop="receiptOrderNo" borderBottom>
				<u--input v-model="formModel.receiptOrderNo" disabled border="none" placeholder="请输入仓库流水号"></u--input>
			</u-form-item>
			<u-form-item label="仓库" prop="warehouseName" borderBottom>
				<u--input v-model="formModel.warehouseName" disabled placeholder="请选择仓库" border="none"></u--input>
			</u-form-item>
			<u-form-item label="入库日期" prop="receiptOrderDate" borderBottom>
				<u--input v-model="formModel.receiptOrderDate" disabled placeholder="请选择入库日期" border="none"></u--input>
			</u-form-item>
			<u-form-item label="操作类型" prop="receiptOrderTypeLabel" borderBottom>
				<u--input v-model="formModel.receiptOrderTypeLabel" disabled placeholder="请选择操作类型"
					border="none"></u--input>
			</u-form-item>
			<u-form-item label="起始站" prop="startStation" borderBottom>
				<u--input v-model="formModel.startStation" disabled border="none" placeholder="请输入起始站"></u--input>
			</u-form-item>
			<u-form-item label="货权单位" prop="customerName" borderBottom>
				<u--input v-model="formModel.customerName" disabled placeholder="请选择货权单位" border="none"></u--input>
			</u-form-item>
			<!-- <u-form-item label="联系人" prop="customerContact" borderBottom>
				<u--input v-model="formModel.customerContact" disabled border="none"></u--input>
			</u-form-item>
			<u-form-item label="手机" prop="customerPhone" borderBottom>
				<u--input v-model="formModel.customerPhone" disabled border="none"></u--input>
			</u-form-item> -->
			<u-form-item label="运输单位" prop="orderExt.carrierName" borderBottom>
				<u--input v-model="formModel.orderExt.carrierName" disabled placeholder="请选择运输单位"
					border="none"></u--input>
			</u-form-item>
			<u-form-item label="入库货品信息" prop="details" borderBottom @click="clickAddGoods">
				<view class="goods-tag flexs">已添加
					<view style="padding: 0px 8rpx;"><u-badge type="success" max="1000"
							:value="formModel.details.length" show-zero></u-badge></view>
					件货品信息
				</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="车牌/车号" prop="orderOperate.carNo" borderBottom>
				<u--input v-model="formModel.orderOperate.carNo" border="none" placeholder="请输入车牌/车号"></u--input>
			</u-form-item>
			<u-form-item label="封号/身份证号" prop="orderOperate.sealNo" borderBottom labelWidth="120">
				<u--input v-model="formModel.orderOperate.sealNo" border="none" placeholder="请输入封号/身份证号"></u--input>
			</u-form-item>
			<u-form-item label="作业时间起" prop="orderOperate.operateStartTime" borderBottom
				@tap="showOperateStartTime = true">
				<u--input v-model="formModel.orderOperate.operateStartTime" disabled border="none"
					placeholder="请输入作业时间起"></u--input>
			</u-form-item>
			<u-form-item label="作业时间止" prop="orderOperate.operateEndTime" borderBottom @tap="showOperateEndTime = true">
				<u--input v-model="formModel.orderOperate.operateEndTime" border="none" disabled
					placeholder="请输入作业时间止"></u--input>
			</u-form-item>
			<u-form-item label="是否打托入库" prop="orderOperate.pack" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.pack" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" name="1"></u-radio>
					<u-radio label="否" name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="装卸班组" prop="orderOperate.operatePersonNames" borderBottom
				@click="showSelectOperatePerson">
				<view>
					{{ formModel.orderOperate.operatePersonNames || '请选择' }}
				</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="叉车司机" prop="orderOperate.operateDriverNames" borderBottom
				@click="showSelectOperateDriver">
				<view>
					{{ formModel.orderOperate.operateDriverNames || '请选择' }}
				</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="卸货前照片" prop="orderOperate.preDischargePhotoUrl" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.preDischargePhotoUrl"
					@change="fileChange($event, 'preDischargePhotoUrl')" />
			</u-form-item>
			<u-form-item label="破损件照片" prop="orderOperate.damagedPhotoUrl" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.damagedPhotoUrl"
					@change="fileChange($event,'damagedPhotoUrl')" />
			</u-form-item>
			<u-form-item label="入库完成照片" prop="orderOperate.inStorageCompletedPhotoUrl" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.inStorageCompletedPhotoUrl"
					@change="fileChange($event,'inStorageCompletedPhotoUrl')" />
			</u-form-item>
			<u-form-item label="操作是否规范" prop="orderOperate.operateStandard" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.operateStandard" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" :name="1"></u-radio>
					<u-radio label="否" :name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="堆码是否合格" prop="orderOperate.stackingQualified" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.stackingQualified" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" :name="1"></u-radio>
					<u-radio label="否" :name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="是否服从管理" prop="orderOperate.obeyManagement" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.obeyManagement" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" :name="1"></u-radio>
					<u-radio label="否" :name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="备注" prop="remark" borderBottom>
				<u--textarea v-model="formModel.remark" border="none" placeholder="请输入备注信息"></u--textarea>
			</u-form-item>
			<u-divider text="验收确认" textColor="#2979ff" lineColor="#2979ff"></u-divider>





			<u-form-item v-if="getIsCCZG" label="仓储主管验收确认照片" prop="orderOperate.stockSupervisorAcceptFileUrl"
				borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.stockSupervisorAcceptFileUrl"
					@change="fileChange($event,'stockSupervisorAcceptFileUrl')" />
			</u-form-item>


			<u-form-item v-if="getIsKFZG" label="客服主管验收确认照片" prop="orderOperate.exceptionFileUrl" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.exceptionFileUrl"
					@change="fileChange($event,'exceptionFileUrl')" />
			</u-form-item>


			<u-form-item label="异常说明" prop="orderOperate.remark" borderBottom>
				<u--textarea v-model="formModel.orderOperate.remark" border="none" placeholder="请输入异常说明"></u--textarea>
			</u-form-item>

			<u-form-item v-if="getIsKG" label="库管验收确认" prop="orderOperate.checkerWarehouseManager" borderBottom
				labelWidth="150">
				<span :style="{color: formModel.orderOperate.checkerWarehouseManager == 1 ? '#19be6b': '#ceccca'}">
					{{ formModel.orderOperate.checkerWarehouseManager == 1 ? '已确认': '待确认' }}
				</span>
			</u-form-item>
			<u-form-item v-if="getIsCCZG" label="仓储主管验收确认" prop="orderOperate.checkerDirector" borderBottom
				labelWidth="150">
				<span :style="{color: formModel.orderOperate.checkerDirector == 1 ? '#19be6b': '#ceccca'}">
					{{ formModel.orderOperate.checkerDirector == 1 ? '已确认': '待确认' }}
				</span>
			</u-form-item>
			<u-form-item v-if="getIsKFZG" label="客服主管验收确认" prop="orderOperate.checkerCustomerManager" borderBottom
				labelWidth="150">
				<span :style="{color: formModel.orderOperate.checkerCustomerManager == 1 ? '#19be6b': '#ceccca'}">
					{{ formModel.orderOperate.checkerCustomerManager == 1 ? '已确认': '待确认' }}
				</span>
			</u-form-item>
		</u--form>

		<view v-if="auditStatus != 4" class="flexs" style="gap: 24rpx; margin-top: 60rpx;">
			<u-button @click="handleSaveForm">保 存</u-button>
			<u-button type="primary" @click="checkConfirm">验收确认</u-button>
		</view>

		<u-action-sheet :show="showWarehouse" :actions="warehouses" title="请选择仓库" @close="showWarehouse = false"
			@select="warehouseSelect">
		</u-action-sheet>
		<u-calendar :show="showReceiptOrderDate" @close="showReceiptOrderDate = false"
			@confirm="receiptOrderDateSelect"></u-calendar>
		<u-action-sheet :show="showReceiptOrderType" :actions="wmsReceiptTypes" title="请选择操作类型"
			@close="showReceiptOrderType = false" @select="receiptOrderTypeSelect">
		</u-action-sheet>
		<u-action-sheet :show="showCustomers" :actions="customers" title="请选择货权单位" @close="showCustomers = false"
			@select="customersSelect">
		</u-action-sheet>
		<u-action-sheet :show="showCarriers" :actions="carriers" title="请选择操作类型" @close="showCarriers = false"
			@select="carriersSelect">
		</u-action-sheet>

		<u-datetime-picker ref="operateStartTimeRef" :show="showOperateStartTime" v-model="operateStartTime"
			mode="datetime" @confirm="confirmOperateStartTime"
			@cancel="showOperateStartTime = false"></u-datetime-picker>
		<u-datetime-picker ref="operateEndTimeRef" :show="showOperateEndTime" v-model="operateEndTime" mode="datetime"
			@confirm="confirmOperateEndTime" @cancel="showOperateEndTime = false"></u-datetime-picker>

		<AddGoodsPopup ref="addGoodsPopupRef" :wareHouseArray="wareHouseArray" :goodList="formModel.details"
			@change="goodsChange" />
		<SelectUser ref="selectOperatePersonRef" :defaultUser="formModel.orderOperate.operatePerson"
			@change="selectOperatePersonChange">
		</SelectUser>
		<SelectUser ref="selectOperateDriverRef" :defaultUser="formModel.orderOperate.operateDriver"
			@change="selectOperateDriverChange">
		</SelectUser>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import dicts from '@/utils/dict.js';
	import {
		bindData
	} from '@/utils/common.js';
	import AddGoodsPopup from '@/pages_sub/components/AddGoodsPopup/index.vue'
	import FileUplaod from '@/pages_sub/components/upload.vue'
	import {
		addOrUpdateWarehouse
	} from '@/pages_sub/api/warehousingManagement';
	import {
		getDictLabel
	} from '@/utils/dict.js';
	import SelectUser from '@/pages_sub/components/SelectUser.vue'

	export default {
		components: {
			AddGoodsPopup,
			FileUplaod,
			SelectUser
		},
		data() {
			return {
				showOperateStartTime: false,
				showOperateEndTime: false,
				operateStartTime: Date.now(),
				operateEndTime: Date.now(),
				id: null,
				formModel: {
					id: '',
					// 入库单号-仓库流水号
					receiptOrderNo: `R-${dayjs().format('YYYY-MM-DD-HHmmss')}`,
					// 所属仓库
					warehouseId: "",
					warehouseName: "",
					// 入库日期
					receiptOrderDate: dayjs().format('YYYY-MM-DD'),
					// 操作类型
					receiptOrderType: "1",
					receiptOrderTypeLabel: "整车",
					// 起始站
					startStation: "",
					// 货权单位-客户
					customerId: "",
					// 入库单拓展信息-运输单位
					orderExt: {
						carrierId: "",
						carrierName: "",
					},
					// 货品
					details: [{
						id: 0,

						// 货物品名
						itemName: "",

						// 批次
						batchNo: "",
						// 实收数量
						realQuantity: "",
						// 实收重量
						realWeight: "",
						warehouseId: "",
						areaId: "",
						// 库位号
						rackId: "",
					}],
					//   操作信息
					orderOperate: {
						id: '',
						// 车牌/车号
						carNo: "",
						// 封号/身份证号
						sealNo: "",

						// 作业时间起
						operateStartTime: "",
						// 作业时间止
						operateEndTime: "",
						// 是否打托入库
						pack: '0',
						// 装卸班组[选择班组人员组合，可调整人员]
						operatePerson: "",
						operatePersonNames: "",
						// 叉车司机
						operateDriver: "",
						operateDriverNames: "",
						// 卸货前照片
						preDischargePhotoUrl: [],
						// 破损件照片
						damagedPhotoUrl: [],
						// 入库完成照片
						inStorageCompletedPhotoUrl: [],
						// 操作是否规范 1是 0否
						operateStandard: 1,
						// 堆码是否合格 1是 0否
						stackingQualified: 1,
						// 是否服从管理 1是 0否
						obeyManagement: 1,
						// 库管验收确认
						checkerWarehouseManager: "0",
						// 仓储主管验收确认
						checkerDirector: "0",
						// 仓储主管验收确认照片
						stockSupervisorAcceptFileUrl: [],
						// 客服主管验收确认
						checkerCustomerManager: "0",
						// 客服主管验收确认照片
						exceptionFileUrl: [],
						// 异常说明
						remark: ''
					},
					// 备注
					remark: "",
					// 入库状态
					// receiptOrderStatus: 0,

				},
				rules: {
					'orderOperate.carNo': {
						type: 'string',
						required: true,
						message: '请输入车牌/车号',
						trigger: ['change', 'blur']
					},
					'orderOperate.operateStartTime': [{
						type: 'string',
						required: true,
						message: '请选择作业时间起',
						trigger: ['change', 'blur']
					}, ],
					'orderOperate.operateEndTime': [{
						type: 'string',
						required: true,
						message: '请输入作业时间止',
						trigger: ['change', 'blur']
					}],
					'orderOperate.pack': {
						type: 'string',
						required: true,
						message: '请选择是否打托入库',
						trigger: ['change', 'blur']
					},
					'orderOperate.operatePersonNames': {
						type: 'string',
						required: true,
						message: '请输入装卸班组',
						trigger: ['change', 'blur']
					},
					// 'orderOperate.operateDriver': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请输入叉车司机名称',
					// 	trigger: ['change', 'blur']
					// },
					'orderOperate.preDischargePhotoUrl': {
						type: 'array',
						required: true,
						message: '请添加卸货前照片',
						trigger: ['change', 'blur']
					},
					// 'orderOperate.damagedPhotoUrl': {
					// 	type: 'array',
					// 	required: true,
					// 	message: '请添加破损件照片',
					// 	trigger: ['change', 'blur']
					// },
					'orderOperate.inStorageCompletedPhotoUrl': {
						type: 'array',
						required: true,
						message: '请添加入库完成照片',
						trigger: ['change', 'blur']
					},
					'orderOperate.operateStandard': {
						type: 'number',
						required: true,
						message: '请选择操作是否规范',
						trigger: ['change', 'blur']
					},
					'orderOperate.stackingQualified': {
						type: 'number',
						required: true,
						message: '请选择堆码是否合格',
						trigger: ['change', 'blur']
					},
					'orderOperate.obeyManagement': {
						type: 'number',
						required: true,
						message: '请选择是否服从管理',
						trigger: ['change', 'blur']
					},
					// 'orderOperate.stockSupervisorAcceptFileUrl': {
					// 	type: 'array',
					// 	required: true,
					// 	message: '仓储主管验收确认照片',
					// 	trigger: ['change', 'blur']
					// },
					// 'orderOperate.exceptionFileUrl': {
					// 	type: 'array',
					// 	required: true,
					// 	message: '客服主管验收确认照片',
					// 	trigger: ['change', 'blur']
					// },
				},

				showWarehouse: false,
				warehouses: dicts().warehouses.map(i => ({
					...i,
					name: i.warehouseName
				})),
				showReceiptOrderDate: false,
				showReceiptOrderType: false,
				wmsReceiptTypes: dicts().wmsReceiptTypes.map(i => ({
					...i,
					name: i.dictLabel
				})),
				showCustomers: false,
				customers: dicts().customers.map(i => ({
					...i,
					name: i.customerName
				})),
				showCarriers: false,
				carriers: dicts().carriers.map(i => ({
					...i,
					name: i.carrierName
				})),
				wareHouseArray: dicts().getTreeWarehouseArea(),

				auditStatus: '',

				getRoleKeys: [],
				getIsAdmin: false,
				getIsKG: false,
				getIsCCZG: false,
				getIsKFZG: false,
			};
		},

		methods: {
			getDictLabel,
			goodsChange(goodsList) {
				this.formModel.details = goodsList
			},
			confirmOperateEndTime() {
				setTimeout(() => {
					console.log('this.operateEndTime', dayjs(this.operateEndTime).format('YYYY-MM-DD HH:mm:ss'));
					this.showOperateEndTime = false
					this.formModel.orderOperate.operateEndTime = dayjs(this.operateEndTime).format(
						'YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('orderOperate.operateEndTime')
				})
			},
			confirmOperateStartTime() {
				setTimeout(() => {
					console.log('this.operateStartTime', dayjs(this.operateStartTime).format(
						'YYYY-MM-DD HH:mm:ss'));
					this.showOperateStartTime = false
					this.formModel.orderOperate.operateStartTime = dayjs(this.operateStartTime).format(
						'YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('orderOperate.operateStartTime')
				})
			},
			async getEditData() {
				const res = await uni.$u.http.get(`wms/receiptOrder/${this.id}`)
				if (res) {
					res.orderOperate.operatePersonNames = ''
					res.orderOperate.operateDriverNames = ''
					bindData(this.formModel, res)
					this.formModel.warehouseName = getDictLabel(res.warehouseId, 'warehouse')
					this.formModel.receiptOrderTypeLabel = getDictLabel(res.receiptOrderType, 'wms_receipt_type')
					this.formModel.customerName = getDictLabel(res.customerId, 'customer')
					this.formModel.details.forEach(i => {
						if (!res.items?.length) return
						const goodsDetails = res.items?.filter(m => i.itemId === m.id)[0]
						if (!goodsDetails) return
						i.itemName = goodsDetails.itemName
					})

					this.formModel.orderOperate.carNo = res?.orderExt?.carrierCarNo

					if (this.formModel.orderOperate.operateStandard === null) {
						this.formModel.orderOperate.operateStandard = 1
					}
					if (this.formModel.orderOperate.stackingQualified === null) {
						this.formModel.orderOperate.stackingQualified = 1
					}
					if (this.formModel.orderOperate.obeyManagement === null) {
						this.formModel.orderOperate.obeyManagement = 1
					}

					this.auditStatus = res.auditStatus
				}
			},
			async getRecommendPlace(data) {
				return await uni.$u.http.post(`/wms/receiptOrder/getRecommendPlace`, null, {
					data,
					custom: {
						loading: false
					}
				}).then(res => {
					return res
				})
			},
			warehouseSelect(e) {
				this.formModel.warehouseId = e.id
				this.formModel.warehouseName = e.warehouseName
				this.$refs.formRef.validateField('warehouseName')
			},
			receiptOrderDateSelect(e) {
				this.formModel.receiptOrderDate = e[0]
				this.$refs.formRef.validateField('receiptOrderDate')
				this.showReceiptOrderDate = false
			},
			receiptOrderTypeSelect(e) {
				this.formModel.receiptOrderType = e.dictValue
				this.formModel.receiptOrderTypeLabel = e.dictLabel
			},
			customersSelect(e) {
				this.formModel.customerId = e.id
				this.formModel.customerName = e.customerName
				this.formModel.customerContact = e.businessContact
				this.formModel.customerPhone = e.businessContactMobile
			},
			carriersSelect(e) {
				this.formModel.orderExt = {
					carrierId: e.id,
					carrierName: e.carrierName,
					carrierContact: e.contact,
					carrierMobile: e.mobile,
					carrierPhone: e.tel,
					carrierCarNo: e.carrierNo,
				}
				this.$refs.formRef.validateField('orderExt.carrierPhone')
				this.$refs.formRef.validateField('orderExt.carrierContact')
				this.$refs.formRef.validateField('orderExt.carrierMobile')
				this.$refs.formRef.validateField('orderExt.carrierCarNo')
			},
			clickAddGoods() {
				this.$refs.addGoodsPopupRef.goodListShow = true
			},
			checkConfirm() {
				this.handleSubmit(false)
			},
			handleSaveForm() {
				this.handleSubmit()
			},
			handleSubmit(isSave = true) {
				this.$refs.formRef.validate().then(res => {
					const data = JSON.parse(JSON.stringify(this.formModel))
					this.getCheckerFields.forEach(i => {
						data.orderOperate[i] = isSave ? '0' : '1'
					})
					addOrUpdateWarehouse(data).then(res => {
						uni.showToast({
							title: `${this.addEditTitle}成功`,
							mask: true
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					})
				}).catch(errors => {
					uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				})
			},
			fileChange(files, key) {
				this.formModel.orderOperate[key] = files.map(i => {
					return {
						fileName: i.fileName,
						fileUrl: i.fileUrl
					}
				})
				this.$refs.formRef.validateField(`orderOperate.${key}`)
			},
			getReceiptOrderUsers() {
				uni.$u.http.get('/wms/wx/receiptOrder/getUserList')
			},
			showSelectOperatePerson() {
				this.$refs.selectOperatePersonRef?.show()
			},
			showSelectOperateDriver() {
				this.$refs.selectOperateDriverRef?.show()
			},
			selectOperatePersonChange({
				ids,
				userNames
			}) {
				this.formModel.orderOperate.operatePerson = ids
				this.formModel.orderOperate.operatePersonNames = userNames
			},
			selectOperateDriverChange({
				ids,
				userNames
			}) {
				this.formModel.orderOperate.operateDriver = ids
				this.formModel.orderOperate.operateDriverNames = userNames
			}
		},
		computed: {
			addEditTitle() {
				return !this.id ? '保存' : '提交'
			},
			getCheckerFields() {
				const arr = []
				if (this.getIsKG) arr.push('checkerWarehouseManager')
				if (this.getIsCCZG) arr.push('checkerDirector')
				if (this.getIsKFZG) arr.push('checkerCustomerManager')
				return arr
			}
		},
		onReady() {
			this.$refs.formRef?.setRules(this.rules)
		},
		onLoad({
			params
		}) {
			if (params) {
				this.id = params
				this.getEditData()
				this.getReceiptOrderUsers()
			}
		},
		onShow() {
			this.getRoleKeys = uni.getStorageSync('user_info').roles || []
			this.getIsAdmin = this.getRoleKeys.includes('admin')
			this.getIsKG = this.getRoleKeys.includes('stock_supervisor') || this.getIsAdmin
			this.getIsCCZG = this.getRoleKeys.includes('storage_supervisor') || this.getIsAdmin
			this.getIsKFZG = this.getRoleKeys.includes('service_supervisor') || this.getIsAdmin
		}
	}
</script>

<style lang="scss">
	.appointment-box {
		padding: 0rpx 24rpx 100rpx 24rpx;
		background: #fff;
	}

	.tag-num {
		background: #2979ff;
		color: #fff;
		padding: 2rpx 6rpx;
		border-radius: 22rpx;
	}

	.goods {
		color: #303133;
	}

	.no-goods {
		color: #c0c4cc
	}

	.fixed-button-view {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>