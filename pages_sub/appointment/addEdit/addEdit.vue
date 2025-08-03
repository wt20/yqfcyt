<!-- 货品详情 -->
<template>
	<view class="details">
		<view class="form-box">
			<u--form labelPosition="left" :model="formModel" :rules="rules" ref="formRef" labelWidth="100"
				:customStyle="{padding: '0px 20px'}">
				<u-form-item labelWidth="120" label="预约类型" prop="qualityPass" borderBottom>
					<u-radio-group v-model="formModel.appointmentType" placement="row">
						<u-radio :customStyle="{marginRight: '50rpx'}" label="入库" name="0"></u-radio>
						<u-radio label="出库" name="1"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="预约单位" prop="customerName" borderBottom @click="showCustomers = true">
					<u--input v-model="formModel.customerName" placeholder="请选择预约单位" disabled border="none"></u--input>
				</u-form-item>
				<u-form-item label="预约时间" prop="appointmentTime" borderBottom @tap="showAppointmentTime = true">
					<u--input v-model="formModel.appointmentTime" border="none" disabled
						placeholder="请输入预约时间"></u--input>
				</u-form-item>
				<u-form-item label="车牌/车号" prop="vehicle_no" borderBottom>
					<u--input v-model="formModel.vehicle_no" border="none" placeholder="请输入车牌/车号"></u--input>
				</u-form-item>
				<u-form-item label="司机" prop="picker" borderBottom>
					<u--input v-model="formModel.picker" border="none" placeholder="请输入司机"></u--input>
				</u-form-item>
				<u-form-item label="司机手机号" prop="pickerMobile" borderBottom>
					<u--input v-model="formModel.pickerMobile" border="none" placeholder="请输入司机手机号"></u--input>
				</u-form-item>
				<u-form-item label="司机身份证号码" prop="pickerIdCard" borderBottom>
					<u--input v-model="formModel.pickerIdCard" border="none" placeholder="请输入司机身份证号码"></u--input>
				</u-form-item>
				<u-form-item label="起始站" prop="startStation" borderBottom>
					<u--input v-model="formModel.startStation" border="none" placeholder="请输入起始站"></u--input>
				</u-form-item>
				<u-form-item label="到达站" prop="endStation" borderBottom>
					<u--input v-model="formModel.endStation" border="none" placeholder="请输入到达站"></u--input>
				</u-form-item>
				<u-form-item label="预约货品信息" prop="detailList" @click="viewAddGoods">
					<view class="goods-tag flexs">已添加
						<view style="padding: 0px 8rpx;"><u-badge type="success" max="1000"
								:value="formModel.detailList.length" show-zero></u-badge></view>
						件货品信息
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="总数量" prop="totalQuantity" borderBottom>
					<u--input v-model="formModel.totalQuantity" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="总重量(吨)" prop="totalWeight" borderBottom>
					<u--input v-model="formModel.totalWeight" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="总体积" prop="totalVolume" borderBottom>
					<u--input v-model="formModel.totalVolume" border="none" disabled></u--input>
				</u-form-item>

				<u-form-item label="单据照片" prop="receiptBillFileList" borderBottom>
					<FileUplaod @change="fileChange" :defaultData="formModel.receiptBillFileList" />
				</u-form-item>
				<u-form-item label="备注" prop="remark" borderBottom>
					<u--textarea v-model="formModel.remark" border="none" placeholder="请输入备注信息"></u--textarea>
				</u-form-item>
				<view class="flexs" style="gap: 24rpx; margin-top: 60rpx;">
					<u-button v-if="formModel.id" type="error" @click="cancelAppointment">取消预约</u-button>
					<u-button type="primary" @click="submitAppointment">提 交</u-button>
				</view>
			</u--form>
		</view>

		<!-- 	<u-action-sheet :show="showCustomers" :actions="customers" title="请选择货权单位" @close="showCustomers = false" 
			@select="customersSelect">
		</u-action-sheet> -->
		<SearchPiker :show="showCustomers" :columns="[customers]" keyName="customerName"
			:defaultIndex="!formModel.customerId || [customers.findIndex(i=> i.id == formModel.customerId)]"
			@cancel="showCustomers = false" @confirm="customersSelect" />
		<u-datetime-picker ref="appointmentTimeRef" :show="showAppointmentTime" v-model="appointmentTime"
			mode="datetime" @confirm="confirmAppointmentTime" @cancel="showAppointmentTime = false"></u-datetime-picker>
		<u-modal :show="showConfirmModal" content='确定要取消预约吗？' showCancelButton @cancel="showConfirmModal = false"
			@confirm="confirm"></u-modal>
		<GoodsDetailsPopup ref="goodsDetailsPopupRef" :goodList="formModel.detailList"
			:customerId="formModel.customerId" @add="addGoods" @del="delGoods" />
		<u-safe-bottom></u-safe-bottom> 
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import FileUplaod from '@/pages_sub/components/upload.vue'
	import {
		bindData
	} from '@/utils/common.js';
	import GoodsDetailsPopup from './GoodsDetailsPopup.vue'
	import dicts, {
		getDictLabel
	} from '@/utils/dict.js';
	import SearchPiker from '@/pages_sub/components/SearchPiker.vue'

	export default {
		components: {
			FileUplaod,
			GoodsDetailsPopup,
			SearchPiker
		},
		data() {
			return {
				details: null,
				id: '',

				formModel: {
					id: "",
					// 预约类型（入库0/出库1）
					appointmentType: '0',
					// 预约单位
					customerId: '',
					customerName: '',
					// 预约时间
					appointmentTime: "",
					// 车牌/车号
					vehicleNo: "",
					// 司机
					picker: "",
					// 司机手机号
					pickerMobile: "",
					// 司机身份证号码
					pickerIdCard: "",
					// 起始站
					startStation: "",
					// 到达站
					endStation: "",

					// 货物品名/型号
					detailList: [],
					// 总数量
					totalQuantity: "",
					// 总重量
					totalWeight: "",
					// 总体积
					totalVolume: "",

					// 单据照片
					receiptBillFileList: [],
					remark: ''
				},
				rules: {
					'customerName': {
						type: 'string',
						required: true,
						message: '请选择预约单位',
						trigger: ['blur', 'change']
					},
					'appointmentTime': {
						type: 'string',
						required: true,
						message: '请填写预约时间',
						trigger: ['blur', 'change']
					},
					// 'vehicle_no': {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请填写车牌/车号',
					// 	trigger: ['blur', 'change']
					// },
					'picker': {
						type: 'string',
						required: true,
						message: '请填写司机',
						trigger: ['blur', 'change']
					},
					'pickerMobile': {
						type: 'string',
						required: true,
						message: '请填写司机手机号',
						trigger: ['blur', 'change']
					},
					'pickerIdCard': {
						type: 'string',
						required: true,
						message: '请填写司机身份证号码',
						trigger: ['blur', 'change']
					},
					'startStation': {
						type: 'string',
						required: true,
						message: '请填写起始站',
						trigger: ['blur', 'change']
					},
					'endStation': {
						type: 'string',
						required: true,
						message: '请填写到达站号',
						trigger: ['blur', 'change']
					},

					'detailList': {
						type: 'array',
						required: true,
						message: '请选择货品',
						trigger: ['blur', 'change']
					},
				},

				showAppointmentTime: false,
				appointmentTime: Date.now(),
				showConfirmModal: false,

				showCustomers: false,
				customers: [],
			};
		},
		onReady() {
			this.$refs.formRef.setRules(this.rules)
			this.$refs.appointmentTimeRef.setFormatter(this.formatter)

			uni.$on('appointment/addGoods', (item) => {
				const index = this.formModel.detailList.findIndex(i => i.id == item.id)
				if (index >= 0) {
					this.formModel.detailList.splice(index, 1, item)
				} else {
					this.formModel.detailList.push(item)
				}
				uni.setStorageSync('appointment_selectGoods', this.formModel.detailList)
				this.$refs.formRef.validateField('detailList')
			})
		},
		onLoad({
			params
		}) {
			this.formModel.customerId = uni.getStorageSync('user_info')?.user?.customerId
			if (params) {
				const paramsObj = JSON.parse(params)
				bindData(this.formModel, paramsObj)
			}
			this.formModel.customerName = getDictLabel(this.formModel.customerId, 'customer')
		},
		mounted() {
			this.customers = dicts().customers.map(i => ({
				...i,
				name: i.customerName
			}))
		},
		methods: {
			customersSelect(e) {
				const item = e.value[0]
				if (!item) return
				this.formModel.customerId = item.id
				this.formModel.customerName = item.customerName
				this.$refs.formRef.validateField('customerName')
				this.showCustomers = false
			},
			fileChange(files) {
				this.formModel.receiptBillFileList = files.map(i => {
					return {
						fileName: i.fileName,
						fileUrl: i.fileUrl
					}
				})
			},
			async submitAppointment() {
				const res = await this.$refs.formRef.validate().catch(errors => {
					uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				})
				if (!res) return
				await uni.$u.http.post('/wms/appointment/add-or-update', null, {
					data: this.formModel,
				})
				uni.showToast({
					title: `${this.addEditTitle}成功`,
					mask: true
				})
				this.goListPage()

			},
			async cancelAppointment() {
				this.showConfirmModal = true
			},
			async confirm() {
				this.showConfirmModal = false
				await uni.$u.http.delete(`/wms/appointment/${this.formModel.id}`)
				uni.$u.toast('已取消')
				this.goListPage()
			},
			confirmAppointmentTime() {
				setTimeout(() => {
					this.showAppointmentTime = false
					this.formModel.appointmentTime = dayjs(this.appointmentTime).format('YYYY-MM-DD HH:mm:ss')
					this.$refs.formRef.validateField('appointmentTime')
				})
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			goListPage() {
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			viewAddGoods() {
				if (!this.formModel.customerId) {
					return uni.$u.toast('请选择预约单位')
				}
				this.$refs.goodsDetailsPopupRef.goodListShow = true
			},
			delGoods(item) {
				const index = this.formModel.detailList.findIndex(i => i.id == item.id)
				this.formModel.detailList.splice(index, 1)
				uni.setStorageSync('appointment_selectGoods', this.formModel.detailList)
			},
			addGoods() {
				const selectedIds = this.formModel.detailList.map(i => i.id)
				uni.setStorageSync('appointment_selectGoods', this.formModel.detailList)
				const params = {
					customerId: this.formModel.customerId
				}
				uni.navigateTo({
					url: `/pages_sub/selectGoods/selectGoods?params=${JSON.stringify(params)}`
				});
			}
		},
		computed: {
			isAdd() {
				return !this.formModel.id
			},
			addEditTitle() {
				return this.isAdd ? '提交预约' : '修改预约'
			}
		},
		watch: {
			'formModel.detailList'(val) {
				this.formModel.totalQuantity = val?.reduce((cur, next) => cur + (Number(next.quantity) || 0), 0)
				this.formModel.totalWeight = val?.reduce((cur, next) => cur + (Number(next.weight) || 0), 0)
				this.formModel.totalVolume = val?.reduce((cur, next) => cur + (Number(next.volume) || 0), 0)
			}
		}
	}
</script>

<style lang="scss">
	.details {
		background: #f0f3fb;
		height: 100vh;

		.group {
			margin-bottom: 24rpx;
			background: #f7f7f7;
		}
	}

	.form-box {
		padding: 0rpx 24rpx;
		background: #fff;
	}
</style>