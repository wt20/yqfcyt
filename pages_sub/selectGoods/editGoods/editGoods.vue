<template>
	<view style="overflow-y: auto;max-height: 96vh; padding: 26rpx;">
		<u--form labelPosition="left" :model="goodsForm" :rules="goodsformRules" ref="formRef" labelWidth="100">
			<u-form-item label="货物品名" borderBottom prop="itemName">
				<u--input v-model="goodsForm.itemName" :disabled="!isManualAdd" border="none"
					placeholder="请输入货物品名"></u--input>
			</u-form-item>
			<u-form-item label="产地" borderBottom prop="productionPlace">
				<u--input v-model="goodsForm.productionPlace" :disabled="!isManualAdd" border="none"
					placeholder="请输入产地"></u--input>
			</u-form-item>
			<u-form-item label="型号" borderBottom prop="itemModel">
				<u--input v-model="goodsForm.itemModel" :disabled="!isManualAdd" border="none"
					placeholder="请输入型号"></u--input>
			</u-form-item>
			<u-form-item label="规格" borderBottom prop="specification">
				<u--input v-model="goodsForm.specification" :disabled="!isManualAdd" border="none"
					placeholder="请输入规格"></u--input>
			</u-form-item>
			<u-form-item label="数量" prop="quantity" borderBottom>
				<u--input v-model="goodsForm.quantity" border="none" placeholder="请输入货物数量"></u--input>
			</u-form-item>
			<u-form-item label="重量(吨)" prop="weight" borderBottom>
				<u--input v-model="goodsForm.weight" border="none" placeholder="请输入货物重量"></u--input>
			</u-form-item>
			<u-form-item label="体积" prop="volume" borderBottom>
				<u--input v-model="goodsForm.volume" border="none" placeholder="请输入货物体积"></u--input>
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

	export default {
		data() {
			return {
				goodsForm: {
					id: 0,
					// 货物品名
					itemName: "",
					// 产地
					productionPlace: "",
					// 型号
					itemModel: "",
					// 规格
					specification: "",
					// 数量
					quantity: "",
					// 重量
					weight: "",
					// 体积
					volume: "",

					// 货物编号
					itemNo: "",
					// 标签
					label: "",
					// 包装
					packaging: "",
					// 库存
					inventoryQuantity: "",
					// 生产日期
					productionDate: "",
				},
				goodsformRules: {
					itemName: [{
						required: true,
						message: '请输入货物名称',
						trigger: ['change', 'blur']
					}],
					// quantity: [{
					// 	required: true,
					// 	message: '请输入货物数量',
					// 	trigger: ['change', 'blur']
					// }],
					// weight: [{
					// 	required: true,
					// 	message: '请输入货物重量',
					// 	trigger: ['change', 'blur']
					// }],
					// volume: [{
					// 	required: true,
					// 	message: '请输入货物体积',
					// 	trigger: ['change', 'blur']
					// }]
				},
				isManualAdd: false
			};
		},
		onLoad({
			params
		}) {
			if (!params) {
				this.isManualAdd = true
				return
			}
			bindData(this.goodsForm, JSON.parse(params))
			const selectedGoods = uni.getStorageSync('appointment_selectGoods')
			const selectedItem = selectedGoods?.filter(i => i.id == this.goodsForm.id)?.[0]
			if (selectedItem) bindData(this.goodsForm, selectedItem)
		},
		methods: {
			async submit() {
				const res = await this.$refs.formRef.validate().catch(errors => {
					uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				})
				if (!res) return
				uni.navigateBack()
				uni.$emit('appointment/addGoods', this.goodsForm)
			},
			cancel() {
				this.$refs.formRef.resetFields()
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss"></style>