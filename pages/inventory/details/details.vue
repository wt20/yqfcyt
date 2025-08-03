<!-- 货品详情 -->
<template>
	<view class="details" v-if="details">
		<view class="group">
			<u-cell-group>
				<u-cell title="货权单位" :value="details.customerName"></u-cell>
				<u-cell title="货物品名" :value="details.itemName"></u-cell>
				<u-cell title="库位" :value="details.rackNames"></u-cell>
				<u-cell title="产地" :value="details.productionPlace"></u-cell>
				<u-cell title="型号" :value="details.itemModel"></u-cell>
				<u-cell title="规格" :value="details.specification"></u-cell>
				<u-cell title="数量" :value="details.quantity"></u-cell>
				<u-cell title="重量" :value="details.weight + '吨'"></u-cell>
			</u-cell-group>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {
		businessModelMapping,
		inModelMapping,
		goodsNatureMapping
	} from '@/utils/const.js'

	export default {
		data() {
			return {
				businessModelMapping,
				inModelMapping,
				goodsNatureMapping,
				details: null,
				id: '',
				query: {
					page: 1,
					rows: 30,
				},
			};
		},
		onLoad({
			params
		}) {
			this.details = JSON.parse(params)
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.details {
		background: #f0f3fb;
		height: 100vh;

		.group {
			margin-bottom: 24rpx;
			background: #fff;
		}
	}
</style>