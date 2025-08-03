<template>
	<view>
		<u-popup :show="goodListShow" mode="right" closeOnClickOverlay @close="goodsListHidden">
			<view style="background: #eee; overflow-y: auto;max-height: 96vh; width: 82vw;padding: 16rpx;">
				<view class="list-item" v-for="(item, index) in list" :key="item.id"
					style="background: #fff;margin-bottom: 16rpx;" @click="clickEditGood(item)">
					<view class="title">
						商品名称
					</view>
					<view class="content">
						{{item.itemName || '--'}}
					</view>
					<view class="title">
						批次
					</view>
					<view class="content">
						{{item.batchNo|| '--'}}
					</view>
					<view class="title">
						实收数量
					</view>
					<view class="content">
						{{item.realQuantity|| '--'}}
					</view>
					<view class="title">
						实收重量(吨)
					</view>
					<view class="content">
						{{item.realWeight|| '--'}}
					</view>
					<view class="title">
						库位号
					</view>
					<view class="content content-full">
						{{getWAR(item)}}
					</view>
				</view>
			</view>
		</u-popup>
		<EditGoods ref="editGoodsRef" :editGoodsItem="editGoodsItem" @submit='handleGoodsSubmit' />
	</view>
</template>

<script>
	import EditGoods from './EditGoods.vue';
	import dayjs from 'dayjs';
	import {
		getDictLabel
	} from '@/utils/dict.js';

	export default {
		props: {
			goodList: {
				type: Array,
				default: () => []
			},
		},
		components: {
			EditGoods
		},
		data() {
			return {
				list: [],
				goodListShow: false,
				editGoodsItem: {},
			}
		},
		watch: {
			goodListShow: {
				handler(val) {
					if (val) {
						this.list = [
							...this.goodList
						]
					}
				}
			}
		},
		created() {},
		computed: {
			getWAR() {
				return (details) => {
					const warehouse = getDictLabel(details.warehouseId, 'warehouse')
					const area = getDictLabel(details.areaId, 'area')
					const rack = getDictLabel(details.rackId, 'rack')
					return [warehouse, area, rack].filter(i => !!i).join('/')
				}
			}
		},
		methods: {
			async clickEditGood(item) {
				this.editGoodsItem = JSON.parse(JSON.stringify(item))
				if (!item.realQuantity) {
					this.editGoodsItem.realQuantity = item.planQuantity
				}
				if (!item.realWeight) {
					this.editGoodsItem.realWeight = item.planWeight
				}
				this.$refs.editGoodsRef.open()
			},
			handleGoodsSubmit(data) {
				const index = this.list.findIndex(i => i.id === data.id)
				this.$set(this.list, index, data)
				this.$emit('change', this.list)
			},
			goodsListHidden() {
				this.goodListShow = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.list-item {
		position: relative;

		.checkbox-mark {
			position: absolute;
			top: 0;
			right: 0;
		}

		&.checked {
			box-shadow: inset 0px 0px 8rpx #3f6acf;
		}
	}
</style>