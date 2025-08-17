<template>
	<u-popup :show="showPopup" mode="right" closeOnClickOverlay @close="showPopup = false">
		<view style="width: 82vw;padding: 8px;">
			<u--form labelPosition="left" :model="formModel" ref="formRef" labelWidth="100">
				<u-form-item v-if="showFilterCustomer" label="货权单位" prop="customerName" borderBottom
					@click="showCustomers = true">
					<u--input v-model="formModel.customerName" disabled placeholder="请选择货权单位" border="none"></u--input>
				</u-form-item>
				<u-form-item v-if="showFilterWarehouse" label="仓库" prop="warehouseName" borderBottom
					@click="showWarehouse = true">
					<u--input v-model="formModel.warehouseName" disabled placeholder="请选择仓库" border="none"></u--input>
				</u-form-item>
				<u-form-item label="车牌/备注" prop="remark" borderBottom>
					<u--input v-model="formModel.remark" placeholder="请输入车牌/备注" border="none"></u--input>
				</u-form-item>
				<u-form-item label="起始日期" prop="shipmentOrderDateStart" borderBottom @click="showDateStart = true">
					<u--input v-model="formModel.shipmentOrderDateStart" disabled placeholder="请选择起始日期"
						border="none"></u--input>
				</u-form-item>
				<u-form-item label="结束日期" prop="shipmentOrderDateEnd" borderBottom @click="showDateEnd = true">
					<u--input v-model="formModel.shipmentOrderDateEnd" disabled placeholder="请选择结束日期"
						border="none"></u--input>
				</u-form-item>
			</u--form>
			<view class="add-btn-box flexb">
				<u-button plain text="重置" @click="reset"></u-button>
				<u-button type="primary" text="确定" @click="submit"></u-button>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>

		<SearchPiker :show="showCustomers" showSearch :columns="[customers]" title="请选择货权单位" keyName="customerName"
			@cancel="showCustomers = false" @confirm="customersSelect" />
		<u-picker :show="showWarehouse" :columns="[warehouses]" title="请选择仓库" keyName="warehouseName"
			@cancel="showWarehouse = false" @confirm="warehouseSelect"></u-picker>
		<u-calendar :show="showDateStart" mode="single" @confirm="confirmDateStart" @close="showDateStart = false"
			confirmDisabledText="请选择起始日期"></u-calendar>
		<u-calendar :show="showDateEnd" mode="single" @confirm="confirmDateEnd" @close="showDateEnd = false"
			confirmDisabledText="请选择结束日期"></u-calendar>
	</u-popup>
</template>

<script>
	import dicts from '@/utils/dict.js';
	import SearchPiker from '@/pages_sub/components/SearchPiker.vue'

	export default {
		components: {
			SearchPiker
		},
		props: {
			showFilterCustomer: {
				type: Boolean,
				default: true
			},
			showFilterWarehouse: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				formModel: {
					customerId: '',
					customerName: '',
					warehouseId: '',
					warehouseName: '',
					remark: '',
					shipmentOrderDateEnd: '',
					shipmentOrderDateStart: ''
				},

				showPopup: false,

				showCustomers: false,
				customers: dicts().customers.map(i => ({
					...i,
					name: i.customerName
				})),
				showWarehouse: false,
				warehouses: dicts().warehouses.map(i => ({
					...i,
					name: i.warehouseName
				})),

				showDateStart: false,
				showDateEnd: false
			}
		},
		methods: {
			customersSelect(e) {
				const item = e.value[0]
				this.formModel.customerId = item.id
				this.formModel.customerName = item.customerName
				this.showCustomers = false
			},
			warehouseSelect(e) {
				const item = e.value[0]
				this.formModel.warehouseId = item.id
				this.formModel.warehouseName = item.warehouseName
				this.showWarehouse = false
			},
			reset() {
				this.formModel.customerId = ''
				this.formModel.customerName = ''
				this.formModel.warehouseId = ''
				this.formModel.warehouseName = ''
				this.formModel.remark = ''
				this.formModel.shipmentOrderDateEnd = ''
				this.formModel.shipmentOrderDateStart = ''
				this.$emit('submit', {
					...this.formModel
				})
				this.$refs.formRef.resetFields()
				this.showPopup = false
			},
			submit() {
				this.$emit('submit', {
					...this.formModel
				})
				this.showPopup = false
			},
			confirmDateStart(val) {
				this.formModel.shipmentOrderDateStart = val[0]
				this.showDateStart = false
			},
			confirmDateEnd(val) {
				this.formModel.shipmentOrderDateEnd = val[0]
				this.showDateEnd = false
			},
		}
	}
</script>

<style lang="scss">
	.add-btn-box {
		position: absolute;
		bottom: 80rpx;
		padding: 0rpx 30rpx;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		gap: 50rpx;
	}
</style>