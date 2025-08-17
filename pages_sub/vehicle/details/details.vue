<!-- 车辆详情 -->
<template>
	<view class="details">
		<view class="form-box">
			<u--form labelPosition="left" :model="formModel" ref="formRef" labelWidth="100"
				:customStyle="{padding: '0px 20px'}">
				<u-form-item label="车辆类型" prop="type" borderBottom>
					<u--input :value="getType" border="none" disabled></u--input>
				</u-form-item>
				<!-- <u-form-item :label="typeMapping[formModel.type] + 'ID'" prop="orderId" borderBottom>
					<u--input :value="formModel.orderId || '--'" border="none" disabled></u--input>
				</u-form-item> -->
				<u-form-item label="日期" prop="orderDate" borderBottom>
					<u--input :value="formModel.orderDate || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="车牌号" prop="carNo" borderBottom>
					<u--input :value="formModel.carNo || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="仓库" prop="warehouseName" borderBottom>
					<u--input :value="formModel.warehouseName || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="司机姓名" prop="driverName" borderBottom>
					<u--input :value="formModel.driverName || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="司机手机号" prop="driverMobile" borderBottom>
					<u--input :value="formModel.driverMobile || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item v-if="formModel.type == 'APPOINTMENT'" label="预约类型" prop="appointmentType" borderBottom>
					<u--input :value="formModel.appointmentType == 0 ? '入库': '出库'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="货品信息" prop="details" borderBottom @click="clickAddGoods">
					<view class="goods-tag flexs">
						<view style="padding: 0px 8rpx;"><u-badge type="success" max="1000"
								:value="(formModel.itemList || []).length" show-zero></u-badge></view>
						件货品信息
					</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="车辆进出状态" prop="carArriveStatus" borderBottom>

					<view style="display: inline-flex;">
						<view v-if="formModel.carArriveStatus == 0">
							{{carArriveStatusMapping[String(formModel.carArriveStatus)]}}
						</view>
						<u-tag v-else :text="carArriveStatusMapping[String(formModel.carArriveStatus)]" plain
							shape="circle" size="mini"></u-tag>
					</view>
				</u-form-item>

				<u-form-item labelWidth="120" label="进出标识" prop="inOrOut" borderBottom>
					<u-radio-group v-model="formModel.inOrOut" placement="row">
						<u-radio :customStyle="{marginRight: '50rpx'}" label="进" name="IN"></u-radio>
						<u-radio label="出" name="OUT"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="车辆进入时间" prop="carArriveTime" borderBottom>
					<u--input :value="formModel.carArriveTime || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="进入照片" prop="inPhotoList" borderBottom>
					<FileUplaod @change="(files)=> fileChange(files, 'inPhotoList')"
						:defaultData="formModel.inPhotoList" :disabled="formModel.inOrOut === 'OUT'" />
				</u-form-item>
				<u-form-item label="车辆离开时间" prop="carLeaveTime" borderBottom>
					<u--input :value="formModel.carLeaveTime || '--'" border="none" disabled></u--input>
				</u-form-item>
				<u-form-item label="离开照片" prop="outPhotoList" borderBottom>
					<FileUplaod @change="(files)=> fileChange(files, 'outPhotoList')"
						:defaultData="formModel.outPhotoList" :disabled="formModel.inOrOut === 'IN'" />
				</u-form-item>
				<view v-if="!formModel.carArriveTime || !formModel.carLeaveTime" class="flexs"
					style="gap: 24rpx; margin-top: 60rpx;">
					<u-button type="primary" @click="submit">提 交</u-button>
				</view>
			</u--form>
		</view>
		<GoodsPopup ref="goodsPopupRef" :goodList="formModel.itemList" />
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import FileUplaod from '@/pages_sub/components/upload.vue'
	import GoodsPopup from './GoodsPopup.vue'

	export default {
		components: {
			FileUplaod,
			GoodsPopup
		},
		data() {
			return {
				id: '',
				formModel: {},
				// rules: {
				// 	'customerName': {
				// 		type: 'string',
				// 		required: true,
				// 		message: '请选择预约单位',
				// 		trigger: ['blur', 'change']
				// 	},
				// },

				typeMapping: {
					APPOINTMENT: '预约',
					IN: '入库',
					OUT: '出库'
				},
				carArriveStatusMapping: {
					'0': '--',
					'1': '已进',
					'2': '已出'
				}
			};
		},
		onLoad({
			params
		}) {
			if (params) {
				this.formModel = JSON.parse(params)
			}
		},
		mounted() {
			this.formModel = {
				...this.formModel,
				inOrOut: this.inOrOut
			}
		},
		computed: {
			inOrOut() {
				const {
					carArriveStatus
				} = this.formModel
				if (carArriveStatus == 0) return 'IN'
				if (carArriveStatus == 1) return 'OUT'
				if (carArriveStatus == 2) return 'OUT'
				return 'IN'
			},
			getType() {
				if (this.formModel.type == 'APPOINTMENT') {
					return this.typeMapping[this.formModel.type] + this.formModel.appointmentType == 0 ? '入库' : '出库';
				}
				return this.typeMapping[this.formModel.type]
			}
		},
		methods: {
			clickAddGoods() {
				this.$refs.goodsPopupRef.goodListShow = true
			},
			fileChange(files, fieldName) {
				this.formModel[fieldName] = files.map(i => {
					return {
						fileName: i.fileName,
						fileUrl: i.fileUrl
					}
				})
			},
			async submit() {
				// const res = await this.$refs.formRef.validate().catch(errors => {
				// 	uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				// })
				// if (!res) return

				const {
					type,
					orderId,
					inPhotoList,
					outPhotoList
				} = this.formModel
				const data = {
					type: type,
					orderId: orderId,
					inOrOut: this.formModel.inOrOut,
					photoList: this.formModel.inOrOut == 'IN' ? inPhotoList : outPhotoList
				}
				await uni.$u.http.post('/wms/wx/car/carInOut', null, {
					data
				})
				uni.showToast({
					title: `提交成功`,
					mask: true
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
		},
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