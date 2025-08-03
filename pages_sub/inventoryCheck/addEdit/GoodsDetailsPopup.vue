<!-- 商品详情组件 -->
<template>
	<view>
		<u-popup :show="goodListShow" mode="right" closeOnClickOverlay @close="goodsListHidden">
			<view>
				<view class="list-box">
					<view v-if="goodList.length">
						<view class="list-item" v-for="(item, index) in goodList" :key="item.id"
							style="background: #fff;margin-bottom: 16rpx;" @longpress="del(item)"
							@click="jumpEdit(item)">
							<view class="title">
								商品编号
							</view>
							<view class="content content-full">
								{{item.itemNo|| '--'}}
							</view>
							<view class="title">
								商品名称
							</view>
							<view class="content content-full">
								{{item.itemName || '--'}}
							</view>
							<view class="title">
								仓库/库区
							</view>
							<view class="content content-full">
								{{getWAR(item)|| '--'}}
							</view>
							<view class="title">
								货权单位
							</view>
							<view class="content content-full">
								{{ getCustomerName(item) || '--'}}
							</view>
							<view class="title">
								账面库存
							</view>
							<view class="content">
								{{item.inventoryQuantity|| '--'}}
							</view>
							<view class="title">
								实际库存
							</view>
							<view class="content">
								{{item.checkQuantity|| '--'}}
							</view>
							<view class="title">
								账面重量(吨)
							</view>
							<view class="content">
								{{item.inventoryWeight|| '--'}}
							</view>
							<view class="title">
								实际重量(吨)
							</view>
							<view class="content">
								{{item.checkWeight|| '--'}}
							</view>
							<view class="title">
								账面体积
							</view>
							<view class="content">
								{{item.inventoryVolume|| '--'}}
							</view>
							<view class="title">
								实际体积
							</view>
							<view class="content">
								{{item.checkVolume|| '--'}}
							</view>
						</view>
					</view>
					<u-empty v-else mode="list" marginTop="40%" />
				</view>
				<view v-if="!disabled" class="add-btn-box flexb">
					<!-- <u-button plain text="手动添加" @click="manualAdd"></u-button> -->
					<u-button type="primary" text="选择货品" @click="clickJumpAddGoods"></u-button>
				</view>
				<u-safe-bottom></u-safe-bottom>
			</view>
			<u-modal :show="cancleCheckshow" @close="cancleCheckshow=false" :closeOnClickOverlay="true"
				@cancel="cancleCheckshow=false" title="提示" content='是否删除该商品？' :showCancelButton='true'
				@confirm="confirm"></u-modal>
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
			disabled: {
				type: Boolean,
				default: false
			}
		},
		components: {},
		data() {
			return {
				goodListShow: false,
				cancleCheckshow: false,
				editGoodsItem: null,
			}
		},
		created() {},
		computed: {
			getWAR() {
				return (details) => {
					return `${getDictLabel(details.warehouseId, 'warehouse')}/${getDictLabel(details.areaId, 'area')}/${getDictLabel(details.rackId, 'rack')}`
				}
			},
			getCustomerName() {
				return (details) => {
					return getDictLabel(details.customerId, 'customer')
				}
			}
		},
		methods: {
			goodsListHidden() {
				this.goodListShow = false
			},
			clickJumpAddGoods() {
				this.$emit('add')
			},
			del(item) {
				if(this.disabled) return
				this.cancleCheckshow = true
				this.editGoodsItem = item
			},
			confirm() {
				this.$emit('del', this.editGoodsItem)
				this.cancleCheckshow = false
			},
			jumpEdit(item) {
				if(this.disabled) return
				uni.navigateTo({
					url: `/pages_sub/inventoryCheck/selectGoods/editGoods/editGoods?params=${JSON.stringify(item)}`
				});
			},
			// manualAdd() {
			// 	uni.navigateTo({
			// 		url: `/pages_sub/selectGoods/editGoods/editGoods`
			// 	});
			// }
		},
	}
</script>

<style lang="scss" scoped>
	.list-box {
		background: #eee;
		overflow-y: auto;
		height: 100vh;
		width: 82vw;
		padding: 8px;
		padding-bottom: 138rpx;
		box-sizing: border-box;
	}

	.list-item {
		position: relative;
		grid-template-columns: 162rpx 1fr 162rpx 1fr;
		.checkbox-mark {
			position: absolute;
			top: 0;
			right: 0;
		}

		&.checked {
			box-shadow: inset 0px 0px 8rpx #3f6acf;
		}
	}

	.add-btn-box {
		position: absolute;
		bottom: 180rpx;
		padding: 0rpx 30rpx;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		gap: 50rpx;
	}
</style>