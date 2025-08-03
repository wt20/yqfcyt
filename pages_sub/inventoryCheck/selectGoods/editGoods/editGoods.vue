<template>
	<view style="overflow-y: auto;max-height: 96vh; padding: 26rpx;">
		<u--form labelPosition="left" :model="goodsForm" :rules="goodsformRules" ref="formRef" labelWidth="100">
			<u-form-item label="商品编号" borderBottom prop="itemNo">
				{{ goodsForm.itemNo|| '--' }}
			</u-form-item>
			<u-form-item label="商品名称" borderBottom prop="itemName">
				{{ goodsForm.itemName|| '--' }}
			</u-form-item>
			<u-form-item label="仓库/库区" borderBottom>
				{{getWAR(goodsForm)|| '--'}}
			</u-form-item>
			<u-form-item label="规格" borderBottom prop="specification">
				{{ getCustomerName(goodsForm) || '--'}}
			</u-form-item>
			<!-- <u-form-item label="账面库存" borderBottom prop="specification">
				{{goodsForm.inventoryQuantity|| '--'}}
			</u-form-item>
			<u-form-item label="账面重量" borderBottom prop="specification">
				{{goodsForm.inventoryWeight|| '--'}}
			</u-form-item>
			<u-form-item label="账面体积" borderBottom prop="specification">
				{{goodsForm.inventoryVolume|| '--'}}
			</u-form-item> -->

			<u-form-item label="实际库存" prop="checkQuantity" borderBottom>
				<u--input v-model="goodsForm.checkQuantity" border="none" placeholder="请输入实际库存"></u--input>
			</u-form-item>
			<u-form-item label="实际重量(吨)" prop="checkWeight" borderBottom>
				<u--input v-model="goodsForm.checkWeight" border="none" placeholder="请输入实际重量"></u--input>
			</u-form-item>
			<u-form-item label="实际体积" prop="checkVolume" borderBottom>
				<u--input v-model="goodsForm.checkVolume" border="none" placeholder="请输入实际体积"></u--input>
			</u-form-item>
		</u--form>
		<view class="flexb" style="gap: 50rpx; margin-top: 56rpx;">
			<u-button plain text="取消" @click="cancel"></u-button>
			<u-button type="primary" text="确定" @click="submit"></u-button>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {
		bindData
	} from '@/utils/common.js';
	import {
		getDictLabel
	} from '@/utils/dict.js';

	export default {
		data() {
			return {
				goodsForm: {
					areaId: null,
					checkQuantity: null,
					checkVolume: null,
					checkWeight: null,
					customerId: null,
					id: null,
					itemName: '',
					itemNo: '',
					inventoryQuantity: null,
					inventoryVolume: null,
					inventoryWeight: null,
					itemId: null,
					productionDate: "",
					rackId: null,
					remark: "",
					warehouseId: null,
					warehouseName: '',
					areaName: '',
					rackName: ''
				},
				goodsformRules: {
					checkQuantity: [{
						required: true,
						message: '请输入实际库存',
						trigger: ['change', 'blur']
					}],
					checkWeight: [{
						required: true,
						message: '请输入实际重量',
						trigger: ['change', 'blur']
					}],
					checkVolume: [{
						required: true,
						message: '请输入实际体积',
						trigger: ['change', 'blur']
					}]
				},
			};
		},
		onLoad({
			params
		}) {
			if (!params) {
				return
			}
			bindData(this.goodsForm, JSON.parse(params))
			const selectedGoods = uni.getStorageSync('check_selectGoods')
			const selectedItem = selectedGoods?.filter(i => i.id == this.goodsForm.id)?.[0]
			if (selectedItem) bindData(this.goodsForm, selectedItem)
		},
		computed: {
			getWAR() {
				return ({warehouseName, areaName, rackName}) => {
					return [warehouseName, areaName, rackName].filter(i=> i)?.join('/')
				}
			},
			getCustomerName() {
				return (details) => {
					return getDictLabel(details.customerId, 'customer')
				}
			}
		},
		methods: {
			async submit() {
				const res = await this.$refs.formRef.validate().catch(errors => {
					uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				})
				if (!res) return
				uni.navigateBack()
				uni.$emit('check/addGoods', this.goodsForm)
			},
			cancel() {
				this.$refs.formRef.resetFields()
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss"></style>