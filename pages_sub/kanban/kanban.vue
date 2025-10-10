<!-- 经营看板 -->
<template>
	<view class="statistics-box">
		<u-status-bar></u-status-bar>
		<view class="tab-tag">
			<u-tag v-for="item in warehouses" :key="item.warehouseName" :text="item.warehouseName"
				:plain="searchData.warehouseId !== item.id" @click="clickWarehouses(item.id)"></u-tag>
		</view>
		<view class="tab-tag" style="margin-top: 28rpx;">
			<u-tag v-for="item in dateOptions" :key="item.label" :text="item.label"
				:plain="searchData.date !== item.value" @click="clickDate(item.value)"></u-tag>
		</view>
		<view class="box1 grid-col3">
			<view class="count-item" v-for="item in statisticsData" :key="item.label">
				<view class="label">
					{{ item.label }}
				</view>
				<view class="count-box">
					<u-count-to :endVal="item.value" :decimals="item.decimals" separator="," fontSize="42rpx"
						color="#3c9cff"></u-count-to>
					<view class="unit">
						{{ item.unit }}
					</view>
				</view>
			</view>
		</view>
		<view class="box1">
			<view class="count-item">
				<view class="label">
					库存总吨位
				</view>
				<view class="count-box">
					<u-count-to :endVal="inventoryWeight" separator="," color="#3c9cff" fontSize="42rpx"></u-count-to>
					<view class="unit">
						吨
					</view>
				</view>
			</view>
			<view class="count-item" style="width: 300rpx;">
				<view class="label">
					库容比
				</view>
				<view class="count-box">
					<view class="cycle-box">
						{{ capacityRatio }}%
					</view>
				</view>
			</view>
		</view>
		<view class="box1 box3">
			<view class="count-item">
				<view class="label">
					营收总额
				</view>
				<view class="count-box">
					<u-count-to :endVal="revenueTotal" separator="," color="#a24dff" fontSize="42rpx"></u-count-to>
					<view class="unit">
						元
					</view>
				</view>
			</view>
			<view class="count-item" style="width: 300rpx;">
				<view class="label">
					营收目标完成比例
				</view>
				<view class="count-box">
					<view class="cycle-box">
						{{revenueTargetCompletionRatio || '0'}}%
					</view>
				</view>
			</view>
			<view class="count-item">
				<view class="label">
					营收总额
				</view>
				<view class="count-box">
					<u-count-to :endVal="receivablesAmount" separator="," color="#a24dff" fontSize="42rpx"></u-count-to>
					<view class="unit">
						元
					</view>
				</view>
			</view>
			<view class="count-item" style="width: 300rpx;">
				<view class="label">
					营收目标完成比例
				</view>
				<view class="count-box">
					<view class="cycle-box">
						{{ receivablesCompletionRatio }}%
					</view>
				</view>
			</view>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	import {
		getInOutTon,
		getInventoryRatio,
		getRevenueRatio,
		getReceivablesRatio
	} from '@/pages_sub/api/warehousingManagement.js'
	import dicts from '@/utils/dict.js';

	const {
		warehouses
	} = dicts()

	export default {
		data() {
			return {
				searchData: {
					warehouseId: '',
					date: 'year',
				},
				warehouses: [...warehouses, {
					warehouseName: '全部',
					id: ''
				}],
				dateOptions: [{
						label: '今天',
						value: 'today'
					},
					{
						label: '本月',
						value: 'month'
					},
					{
						label: '今年',
						value: 'year'
					}
				],
				statisticsData: [{
						label: '入库量',
						value: 0,
						unit: '吨',
						decimals: 2
					},
					{
						label: '出库量',
						value: 0,
						unit: '吨',
						decimals: 2
					},
					{
						label: '业务单据量',
						value: 0,
						unit: '单',
						decimals: 0
					}
				],
				inventoryWeight: '-',
				capacityRatio: '-',
				revenueTotal: '-',
				capacityRatio: '-',
				revenueTargetCompletionRatio: '-',
				receivablesCompletionRatio: '-',
			};
		},
		created() {
			this.getKanbanData()
		},
		methods: {
			getKanbanData() {
				this.getData1()
				this.getData2()
				this.getData3()
				this.getData4()
			},
			clickWarehouses(id) {
				this.searchData.warehouseId = id
				this.getKanbanData()
			},
			clickDate(value) {
				this.searchData.date = value
				this.getKanbanData()
			},
			async getData1() {
				const {
					inTon,
					operationCount,
					outTon
				} = await getInOutTon(this.searchData)
				this.statisticsData[0].value = inTon
				this.statisticsData[1].value = outTon
				this.statisticsData[2].value = operationCount
			},
			async getData2() {
				const {
					inventoryWeight,
					capacityRatio,
				} = await getInventoryRatio({
					warehouseId: this.searchData.warehouseId
				})
				this.inventoryWeight = inventoryWeight
				this.capacityRatio = capacityRatio
			},
			async getData3() {
				const {
					revenueTotal,
					revenueTargetCompletionRatio,
				} = await getRevenueRatio(this.searchData)
				this.revenueTotal = revenueTotal
				this.revenueTargetCompletionRatio = revenueTargetCompletionRatio
			},
			async getData4() {
				const {
					receivablesAmount,
					receivablesCompletionRatio,
				} = await getReceivablesRatio(this.searchData)
				this.receivablesAmount = receivablesAmount
				this.receivablesCompletionRatio = receivablesCompletionRatio
			},
		}
	}
</script>

<style lang="scss">
	.statistics-box {
		background-image: linear-gradient(to bottom, #84aaff2e, #9292923b);
		min-height: 100vh;

		.tab-tag {
			display: flex;
			gap: 16rpx;
			padding-left: 46rpx;
			margin-top: -32rpx;
			flex-wrap: wrap;
		}

		.box1.grid-col3 {
			display: grid;
			grid-template-columns: 200rpx 200rpx 200rpx;
			gap: 24rpx;
		}

		.box1 {
			display: grid;
			grid-template-columns: 1fr 1fr;
			justify-content: space-between;
			margin: 0px 36rpx;
			background: #fff;
			margin-top: 36rpx;
			border-radius: 10rpx;
			padding: 40rpx 36rpx;
			flex-wrap: wrap;
			gap: 100rpx 0rpx;

			.count-item {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 0;

				.label {
					margin-bottom: 40rpx;
					color: #666;
				}

				.count-box {
					display: flex;
					gap: 12rpx;
					align-items: flex-end;
					height: 100rpx;
					line-height: 100rpx;

					.unit {
						color: #0fbfef;
						font-size: 32rpx;
					}

					.cycle-box {
						background: #3c9cff;
						border-radius: 50%;
						width: 110rpx;
						height: 110rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fff;
						font-weight: 500;
						font-size: 32rpx;
					}
				}
			}
		}

		.box3 {
			.unit {
				color: #a24dff !important;
			}

			.cycle-box {
				background: #a24dff !important;
			}
		}
	}
</style>