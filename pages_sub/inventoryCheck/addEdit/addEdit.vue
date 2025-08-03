<template>
	<view class="form-box">
		<u--form labelPosition="left" :model="formModel" :rules="rules" ref="formRef" labelWidth="100"
			:customStyle="{padding: '0px 20rpx', height: '80vh'}">
			<u-form-item label="盘点单" prop="inventoryCheckNo" borderBottom>
				<u--input v-model="formModel.inventoryCheckNo" placeholder="请输入" disabled border="none"></u--input>
			</u-form-item>
			<u-form-item label="备注" prop="remark" borderBottom>
				<u--textarea v-model="formModel.remark" border="none" placeholder="请输入备注信息"></u--textarea>
			</u-form-item>
			<u-form-item label="预约货品信息" prop="details" @click="viewAddGoods">
				<view class="goods-tag flexs">已添加
					<view style="padding: 0px 8rpx;"><u-badge type="success" max="1000"
							:value="formModel.details.length" show-zero></u-badge></view>
					件货品信息
				</view>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		<view v-if="isAdd" class="flexs btns-box" style="gap: 24rpx; margin-top: 60rpx;">
			<u-button type="primary" @click="submit">提 交</u-button>
		</view>
		<GoodsDetailsPopup ref="goodsDetailsPopupRef" :goodList="formModel.details" :disabled="!isAdd" @add="addGoods" @del="delGoods" />
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import GoodsDetailsPopup from './GoodsDetailsPopup.vue'
	import {
		bindData
	} from '@/utils/common.js';

	export default {
		components: {
			GoodsDetailsPopup
		},
		data() {
			return {
				formModel: {
					details: [],
					id: null,
					inventoryCheckNo: `IV-${dayjs().format('YYYY-MM-DD-HHmmss')}`,
					inventoryCheckStatus: 22,
					remark: "",
				},
				rules: {
					'details': {
						type: 'array',
						required: true,
						message: '请选择货品',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		onReady() {
			this.$refs.formRef.setRules(this.rules)
			uni.$on('check/addGoods', (item) => {
				const index = this.formModel.details.findIndex(i => i.id == item.id)
				if (index >= 0) {
					this.formModel.details.splice(index, 1, item)
				} else {
					this.formModel.details.push(item)
				}
				uni.setStorageSync('check_selectGoods', this.formModel.details)
			})
		},
		onLoad({
			params
		}) {
			if (params) {
				const paramsObj = JSON.parse(params)
				if (paramsObj.id) {
					uni.$u.http.get(`/wms/inventoryCheck/${paramsObj.id}`).then(res => {
						res.details.forEach(i => {
							const item = res.items?.filter(f => f.id === i.itemId)[0] || {}
							i.itemNo = item.itemNo
							i.itemName = item.itemName
						})
						bindData(this.formModel, res)
					})
				}
			}
		},
		beforeDestroy() {
			uni.$off('check/addGoods')
		},
		computed: {
			isAdd() {
				return !this.formModel.id
			}
		},
		methods: {
			addGoods() {
				const selectedIds = this.formModel.details.map(i => i.id)
				uni.setStorageSync('check_selectGoods', this.formModel.details)
				const params = {
					customerId: this.formModel.customerId
				}
				uni.navigateTo({
					url: `/pages_sub/inventoryCheck/selectGoods/selectGoods?params=${JSON.stringify(params)}`
				});
			},
			viewAddGoods() {
				this.$refs.goodsDetailsPopupRef.goodListShow = true
			},
			delGoods(item) {
				const index = this.formModel.details.findIndex(i => i.id == item.id)
				this.formModel.details.splice(index, 1)
				uni.setStorageSync('check_selectGoods', this.formModel.details)
			},
			goListPage() {
				setTimeout(() => {
					uni.navigateBack()
				}, 800)
			},
			async submit() {
				const res = await this.$refs.formRef.validate().catch(errors => {
					uni.$u.toast(errors[0]?.message || '必填项校验未通过')
				})
				if (!res) return
				await uni.$u.http.post('/wms/inventoryCheck/add-or-update', null, {
					data: this.formModel,
				})
				uni.showToast({
					title: `提交成功`,
					mask: true
				})
				this.goListPage()
			},
			async cancel() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
	.form-box {
		padding: 0rpx 24rpx;
		background: #fff;
	}

	.btns-box {
		gap: 12px;
		margin-top: 30px;
		position: absolute;
		bottom: 100rpx;
		width: calc(100% - 48rpx);
	}
</style>