<!-- 在库详情 -->
<template>
	<view class="details">
		<view class="group">
			<u-cell-group>
				<u-cell title="执行项目编号" :value="details.projectNumber"></u-cell>
				<u-cell title="在库率" :value="details.inventoryRate"></u-cell>
				<u-cell v-if="!isOwnerDp" title="采购合同编号" :value="details.procureContractNumber"></u-cell>
				<u-cell v-if="!isOwnerDp" title="供货商名称" :value="details.supplierName"></u-cell>
				<u-cell title="入库日期" :value="$formatDateLL(details.inOpDate)"></u-cell>
				<u-cell v-if="!isOwnerDp" title="入库单号" :value="details.batchNumber"></u-cell>
				<u-cell title="货品名称" :value="details.goodsName"></u-cell>
				<u-cell title="规格" :value="details.spec"></u-cell>
				<u-cell title="在库数量（件）" :value="details.stockNumber"></u-cell>
				<u-cell title="在库重量（吨）" :value="details.stockWeight"></u-cell>
				<u-cell v-if="!isOwnerDp" title="在库占比" :value="details.percentage"></u-cell>
				<u-cell title="仓库名称" :value="details.warehouseName"></u-cell>
				<u-cell title="生产日期" :value="details.productionDate"></u-cell>
				<u-cell title="保质期（月）" :value="details.limitTime"></u-cell>
				<template v-if="!isOwnerDp">
					<u-cell title="计划轮出(销售)时限" :value="$formatDateLL(details.rotationTime)"></u-cell>
					<u-cell title="剩余计划轮出(销售)天数" :value="details.rotationDay"></u-cell>
					<u-cell title="保质期时限" :value="details.shelfLifeTime"></u-cell>
					<u-cell title="剩余保质期天数" :value="details.shelfLifeDay"></u-cell>
					<u-cell title="业务模式" :value="businessModelMapping[details.businessModel].label"></u-cell>
					<u-cell title="销售合同编号" :value="details.salesContractNumber"></u-cell>
					<u-cell title="供货商名称" :value="details.supplierName"></u-cell>
					<u-cell title="销售合同约定提货时间" :value="details.agreeTime"></u-cell>
				</template>
				
			</u-cell-group>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {
		businessModelMapping,
		inModelMapping
	} from '@/utils/const.js'
	
	import {
		isOwnerDp
	} from '@/utils/common.js'

	export default {
		data() {
			return {
				businessModelMapping,
				inModelMapping,
				details: {},
				isOwnerDp: isOwnerDp(),
			};
		},
		onLoad({
			params
		}) {
			this.details = JSON.parse(params)
		},
		methods: {}
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