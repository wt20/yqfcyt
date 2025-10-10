<template>
	<view class="appointment-box">
		<u--form labelPosition="left" :model="formModel" :rules="rules" ref="formRef" labelWidth="100"
			:customStyle="{padding: '0px 20px'}">
			<u-form-item label="仓库流水号" prop="shipmentOrderNo" borderBottom>
				<u--input v-model="formModel.shipmentOrderNo" disabled border="none" placeholder="请输入仓库流水号"></u--input>
			</u-form-item>
			<u-form-item label="仓库" prop="warehouseName" borderBottom>
				<u--input v-model="formModel.warehouseName" disabled placeholder="请选择仓库" border="none"></u--input>
			</u-form-item>
			<u-form-item label="出库日期" prop="shipmentOrderDate" borderBottom>
				<u--input v-model="formModel.shipmentOrderDate" disabled placeholder="请选择入库日期" border="none"></u--input>
			</u-form-item>
			<u-form-item label="提货方式" prop="pickMethod" borderBottom>
				<u--input v-model="formModel.pickMethod" disabled placeholder="请选择提货方式" border="none"></u--input>
			</u-form-item>
			<u-form-item label="货权单位" prop="customerName" borderBottom>
				<u--input v-model="formModel.customerName" disabled placeholder="请选择货权单位" border="none"></u--input>
			</u-form-item>
			<u-form-item label="提货单号" prop="customerPickNo" borderBottom>
				<u--input v-model="formModel.customerPickNo" disabled placeholder="请选择提货单号" border="none"></u--input>
			</u-form-item>
			<u-form-item label="起始站" prop="startStation" borderBottom>
				<u--input v-model="formModel.startStation" disabled border="none" placeholder="请输入起始站"></u--input>
			</u-form-item>
			<u-form-item label="提货人姓名" prop="picker" borderBottom>
				<u--input v-model="formModel.picker" :disabled="!!detailsData.picker" border="none" placeholder="请输入提货人姓名"></u--input>
			</u-form-item>
			<u-form-item label="身份证号" prop="pickerIdCard" borderBottom>
				<u--input v-model="formModel.pickerIdCard" :disabled="!!detailsData.pickerIdCard" border="none" placeholder="请输入身份证号"></u--input>
			</u-form-item>
			<u-form-item label="手机号" prop="pickerMobile" borderBottom>
				<u--input v-model="formModel.pickerMobile" :disabled="!!detailsData.pickerMobile" border="none" placeholder="请输入提货人手机号"></u--input>
			</u-form-item>
			<u-form-item label="车牌/车号" prop="vehicleNo" borderBottom>
				<u--input v-model="formModel.vehicleNo" :disabled="!!detailsData.vehicleNo" border="none" placeholder="请输入车牌/车号"></u--input>
			</u-form-item>
			<u-form-item label="入库货品信息" prop="details" borderBottom @click="clickAddGoods">
				<view class="goods-tag flexs">已添加
					<view style="padding: 0px 8rpx;"><u-badge type="success" max="1000"
							:value="formModel.details.length" show-zero></u-badge></view>
					件货品信息
				</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>

			<u-form-item label="作业时间起" prop="orderOperate.operateStartTime" borderBottom
				@tap="showOperateStartTime = true">
				<u--input v-model="formModel.orderOperate.operateStartTime" border="none" disabled
					placeholder="请输入作业时间起"></u--input>
			</u-form-item>
			<u-form-item label="作业时间止" prop="orderOperate.operateEndTime" borderBottom @tap="showOperateEndTime = true">
				<u--input v-model="formModel.orderOperate.operateEndTime" border="none" disabled
					placeholder="请输入作业时间止"></u--input>
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
			<u-form-item label="是否全叉车" prop="orderOperate.forklift_type" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.forklift_type" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" :name="1"></u-radio>
					<u-radio label="否" :name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="是否起地" prop="orderOperate.loadType" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.loadType" placement="row">
					<u-radio :customStyle="{marginRight: '50rpx'}" label="是" :name="1"></u-radio>
					<u-radio label="否" :name="0"></u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="装车完成照片" prop="orderOperate.outStorageCompletedFileList" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.outStorageCompletedFileList"
					@change="fileChange($event, 'outStorageCompletedFileList')" />
			</u-form-item>
			<u-form-item label="提货人签字单据照片" prop="orderOperate.pickerFileList" borderBottom>
				<FileUplaod :defaultData="formModel.orderOperate.pickerFileList"
					@change="fileChange($event, 'pickerFileList')" />
			</u-form-item>
			<u-form-item label="提货（验收）时间" prop="orderOperate.pickTime" borderBottom @tap="showPickTime = true">
				<u--input v-model="formModel.orderOperate.pickTime" border="none" disabled
					placeholder="请选择提货（验收）时间"></u--input>
			</u-form-item>
			<u-form-item label="操作是否规范" prop="orderOperate.operateStandard" borderBottom>
				<u-radio-group v-model="formModel.orderOperate.operateStandard" placement="row">
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


		<u-datetime-picker ref="operateStartTimeRef" :show="showOperateStartTime" v-model="operateStartTime"
			mode="datetime" @confirm="confirmOperateStartTime"
			@cancel="showOperateStartTime = false"></u-datetime-picker>
		<u-datetime-picker ref="operateEndTimeRef" :show="showOperateEndTime" v-model="operateEndTime" mode="datetime"
			@confirm="confirmOperateEndTime" @cancel="showOperateEndTime = false"></u-datetime-picker>
		<u-datetime-picker ref="showPickTimeRef" :show="showPickTime" v-model="pickTime" mode="datetime"
			@confirm="confirmPickTime" @cancel="showPickTime = false"></u-datetime-picker>

		<GoodsDetailsPopup ref="goodsDetailsPopupRef" :goodList="formModel.details" />
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
	import {
		bindData
	} from '@/utils/common.js';
	import GoodsDetailsPopup from '@/pages_sub/components/GoodsDetailsPopup.vue'
	import FileUplaod from '@/pages_sub/components/upload.vue'
	import {
		addOrUpdateShipmentOrder
	} from '@/pages_sub/api/warehousingManagement';
	import {
		getDictLabel
	} from '@/utils/dict.js';
	import SelectUser from '@/pages_sub/components/SelectUser.vue'

	export default {
		components: {
			GoodsDetailsPopup,
			FileUplaod,
			SelectUser
		},
		data() {
			return {
				showOperateStartTime: false,
				showOperateEndTime: false,
				operateStartTime: Date.now(),
				operateEndTime: Date.now(),
				pickTime: Date.now(),
				showPickTime: false,
				id: null,

				formModel: {
					id: '',

					// 入库单号-仓库流水号
					shipmentOrderNo: ``,
					// 仓库
					warehouseId: "",
					// 出库日期
					shipmentOrderDate: "",
					// 提货方式
					pickMethod: "",
					// 货权单位
					customerId: "",
					customerName: "",
					// 提货单位
					pickerId: '',
					// 提货单号
					customerPickNo: "",
					// 起始站
					startStation: "",
					// 提货人姓名
					picker: "",
					// 身份证号
					pickerIdCard: "",
					// 手机号
					pickerMobile: "",
					// 车牌/车号
					vehicleNo: "",

					details: [{
						// 货物品名
						itemName: "",
						// 产地
						place: [],
						productionPlace: "",
						// 型号
						itemModel: "",
						// 规格
						specification: "",
						// 批次
						batchNo: "",
						// 总件数
						realQuantity: "",
						// 总重量
						realWeight: "",
						warehouseId: "",
						areaId: "",
						// 库位号
						rackId: "",
					}, ],


					// 操作信息
					orderOperate: {
						// 作业时间起
						operateStartTime: "",
						// 作业时间止
						operateEndTime: "",
						// 装卸班组
						operatePerson: "",
						operatePersonNames: "",
						// 叉车司机
						operateDriver: "",
						
						//是否起地[1、0]
						loadType: 0,
						// 是否全叉车[1、0]
						forklift_type: 0,
						
						operateDriverNames: "",
						// 装车完成照片
						outStorageCompletedFileList: [],
						// 提货人签字单据照片
						pickerFileList: [{
							fileName: "",
							fileUrl: "",
						}, ],
						// 提货（验收）时间
						pickTime: "",
						// 操作是否规范
						operateStandard: 1,
						// 是否服从管理
						obeyManagement: 1,
						// 库管验收确认
						checkerWarehouseManager: "",
						// 仓储主管验收确认
						checkerDirector: "",
						// 仓储主管验收确认照片
						stockSupervisorAcceptFileUrl: [],
						// 客服主管验收确认
						checkerCustomerManager: "",
						// 客服主管验收确认照片
						exceptionFileUrl: [],
						// 异常说明
						remark: ''
					},
					// 备注
					remark: "",

				},
				rules: {
					'picker': [{
						type: 'string',
						required: true,
						message: '请输入提货人姓名',
						trigger: ['change', 'blur']
					}, ],
					'pickerIdCard': [{
						type: 'string',
						required: true,
						message: '请输入提货人身份证号',
						trigger: ['change', 'blur']
					}, ],
					'pickerMobile': [{
						type: 'string',
						required: true,
						message: '请输入提货人手机号',
						trigger: ['change', 'blur']
					}, ],
					'vehicleNo': [{
						type: 'string',
						required: true,
						message: '请输入车牌/车号',
						trigger: ['change', 'blur']
					}, ],
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
					'orderOperate.forklift_type': {
						type: 'number',
						required: true,
						message: '是否全叉车',
						trigger: ['change', 'blur']
					},
					'orderOperate.loadType': {
						type: 'number',
						required: true,
						message: '是否起地',
						trigger: ['change', 'blur']
					},
					
					'orderOperate.outStorageCompletedFileList': {
						type: 'array',
						required: true,
						message: '请添加装车完成照片',
						trigger: ['change', 'blur']
					},
					'orderOperate.pickerFileList': {
						type: 'array',
						required: true,
						message: '请添加提货人签字单据照片',
						trigger: ['change', 'blur']
					},
					'orderOperate.pickTime': {
						type: 'string',
						required: true,
						message: '请选择提货（验收）时间',
						trigger: ['change', 'blur']
					},
					'orderOperate.operateStandard': {
						type: 'number',
						required: true,
						message: '请选择操作是否规范',
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

				auditStatus: '',
				
				getRoleKeys: [],
				getIsAdmin: false,
				getIsKG: false,
				getIsCCZG: false,
				getIsKFZG: false,
				
				detailsData: {},
			};
		},

		methods: {
			getDictLabel,
			goodsChange(goodsList) {
				this.formModel.details = goodsList
			},
			confirmOperateEndTime() {
				setTimeout(() => {
					this.showOperateEndTime = false
					this.formModel.orderOperate.operateEndTime = dayjs(this.operateEndTime).format(
						'YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('orderOperate.operateEndTime')
				})
			},
			confirmOperateStartTime() {
				setTimeout(() => {
					this.showOperateStartTime = false
					this.formModel.orderOperate.operateStartTime = dayjs(this.operateStartTime).format(
						'YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('orderOperate.operateStartTime')
				})
			},
			confirmPickTime() {
				setTimeout(() => {
					this.showPickTime = false
					this.formModel.orderOperate.pickTime = dayjs(this.pickTime).format(
						'YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('orderOperate.pickTime')
				})
			},
			async getEditData() {
				const res = await uni.$u.http.get(`/wms/wx/shipmentOrder/${this.id}`)
				if (res) {
					this.detailsData = res || {}
					res.orderOperate.operatePersonNames = ''
					res.orderOperate.operateDriverNames = ''
					bindData(this.formModel, res)
					this.formModel.warehouseName = getDictLabel(res.warehouseId, 'warehouse')
					this.formModel.receiptOrderTypeLabel = getDictLabel(res.receiptOrderType, 'wms_receipt_type')
					this.formModel.customerName = getDictLabel(res.customerId, 'customer')
					this.formModel.details.forEach(i => {
						const goodsDetails = res.items?.filter(m => i.itemId === m.id)[0]
						if (!goodsDetails) return
						i.itemName = goodsDetails.itemName
						i.itemModel = goodsDetails.itemModel
						i.specification = goodsDetails.specification
					})
					if (this.formModel.orderOperate.operateStandard === null) {
						this.formModel.orderOperate.operateStandard = 1
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
			clickAddGoods() {
				this.$refs.goodsDetailsPopupRef.goodListShow = true
			},
			checkConfirm() {
				this.handleSubmit(false)
			},
			handleSaveForm() {
				this.handleSubmit()
			},
			handleSubmit(isSave = true) {
				console.log(112, this.formModel);
				this.$refs.formRef.validate().then(res => {
					const data = JSON.parse(JSON.stringify(this.formModel.orderOperate))
					this.getCheckerFields.forEach(i => {
						data[i] = isSave ? '0' : '1'
					})
					addOrUpdateShipmentOrder({
						id: this.formModel.id,
						orderOperate: data,
						remark: this.formModel.remark,
						picker: this.formModel.picker,
						pickerIdCard: this.formModel.pickerIdCard,
						pickerMobile: this.formModel.pickerMobile,
						vehicleNo: this.formModel.vehicleNo,
					}).then(res => {
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