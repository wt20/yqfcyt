<!-- 商品详情组件 -->
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
						批次
					</view>
					<view class="content">
						{{item.batchNo || '--'}}
					</view>
					<view class="title">
						型号
					</view>
					<view class="content">
						{{item.itemModel || '--'}}
					</view>
					<view class="title">
						规格
					</view>
					<view class="content">
						{{item.specification || '--'}}
					</view>
					<view class="title">
						总件数
					</view>
					<view class="content">
						{{item.realQuantity || '--'}}
					</view>
					<view class="title">
						总重量(吨)
					</view>
					<view class="content">
						{{item.realWeight || '--'}}
					</view>
					<view class="title">
						库位号
					</view>
					<view class="content content-full">
						{{item.rackId || '--'}}
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	export default {
		props: {
			goodList: {
				type: Array,
				default: () => []
			},
		},
		components: {},
		data() {
			return {
				list: [],
				goodListShow: false,
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