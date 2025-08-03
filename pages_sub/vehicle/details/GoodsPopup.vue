<template>
	<view>
		<u-popup :show="goodListShow" mode="right" closeOnClickOverlay @close="goodsListHidden">
			<view style="background: #eee; overflow-y: auto;max-height: 96vh; width: 82vw;padding: 16rpx;">
				<view class="list-item" v-for="(item, index) in list" :key="item.id"
					style="background: #fff;margin-bottom: 16rpx;">
					<view class="title">
						商品名称
					</view>
					<view class="content">
						{{item.itemName || '--'}}
					</view>
					<view class="title">
						货物编号
					</view>
					<view class="content">
						{{item.batchNo|| '--'}}
					</view>
					<view class="title">
						型号
					</view>
					<view class="content">
						{{item.itemModel|| '--'}}
					</view>
					<view class="title">
						数量
					</view>
					<view class="content">
						{{item.quantity|| '--'}}
					</view>
					<view class="title">
						重量(吨)
					</view>
					<view class="content">
						{{item.weight|| '--'}}
					</view>
					<view class="title">
						体积
					</view>
					<view class="content">
						{{item.volume|| '--'}}
					</view>
					<view class="title">
						规格
					</view>
					<view class="content">
						{{item.specification|| '--'}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
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