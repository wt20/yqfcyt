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
							<view class="content">
								{{item.itemNo|| '--'}}
							</view>
							<view class="title">
								商品名称
							</view>
							<view class="content">
								{{item.itemName || '--'}}
							</view>
							<view class="title">
								产地
							</view>
							<view class="content">
								{{item.productionPlace|| '--'}}
							</view>
							<view class="title">
								型号
							</view>
							<view class="content">
								{{item.itemModel|| '--'}}
							</view>
							<view class="title">
								规格
							</view>
							<view class="content">
								{{item.specification|| '--'}}
							</view>
							<view class="title">
								标签
							</view>
							<view class="content">
								{{item.label|| '--'}}
							</view>
							<view class="title">
								包装
							</view>
							<view class="content">
								{{item.packaging|| '--'}}
							</view>
							<view class="title">
								库存
							</view>
							<view class="content">
								{{item.inventoryQuantity|| '--'}}
							</view>
							<view class="title">
								生产日期
							</view>
							<view class="content">
								{{item.productionDate|| '--'}}
							</view>
							<view class="title">
								数量
							</view>
							<view class="content">
								{{item.quantity|| '--'}}
							</view>
							<view class="title">
								重量
							</view>
							<view class="content">
								{{ (item.weight|| '--') + '吨' }}
							</view>
							<view class="title">
								体积
							</view>
							<view class="content">
								{{item.volume|| '--'}}
							</view>
						</view>
					</view>
					<u-empty v-else mode="list" marginTop="40%" />
				</view>
				<view class="add-btn-box flexb">
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
				goodListShow: false,
				cancleCheckshow: false,
				editGoodsItem: null,
			}
		},
		created() {},
		methods: {
			goodsListHidden() {
				this.goodListShow = false
			},
			clickJumpAddGoods() {
				this.$emit('add')
			},
			del(item) {
				this.cancleCheckshow = true
				this.editGoodsItem = item
			},
			confirm() {
				this.$emit('del', this.editGoodsItem)
				this.cancleCheckshow = false
			},
			jumpEdit(item) {
				uni.navigateTo({
					url: `/pages_sub/selectGoods/editGoods/editGoods?params=${JSON.stringify(item)}`
				});
			},
			manualAdd() {
				uni.navigateTo({
					url: `/pages_sub/selectGoods/editGoods/editGoods`
				});
			}
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