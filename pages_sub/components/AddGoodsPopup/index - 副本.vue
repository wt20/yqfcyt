<template>
	<view>
		<u-popup :show="goodListShow" mode="right" closeOnClickOverlay @close="goodsListHidden">
			<view style="background: #eee; overflow-y: auto;max-height: 96vh; width: 82vw;padding: 16rpx;">
				<view :class="['list-item', { 'checked': item.isCheckForGoods }]" v-for="(item, index) in goodList"
					:key="item.id" style="background: #fff;margin-bottom: 16rpx;" @click="clickEditGood(item)"
					@longpress="longCheck(item)">
					<view class="title">
						商品名称
					</view>
					<view class="content">
						{{item.itemName}}
					</view>
					<view class="title">
						商品编号
					</view>
					<view class="content">
						{{item.itemNo}}
					</view>
					<view class="title">
						产地
					</view>
					<view class="content">
						{{item.productionPlace}}
					</view>
					<view class="title">
						型号
					</view>
					<view class="content">
						{{item.itemModel}}
					</view>
					<view class="title">
						规格
					</view>
					<view class="content">
						{{item.specification}}
					</view>
					<view class="title">
						库存
					</view>
					<view class="content">
						{{item.inventoryQuantity}}
					</view>
					<view class="checkbox-mark">
						<u-icon v-if="item.isCheckForGoods" name="checkbox-mark" color="#2979ff" size="28"></u-icon>
					</view>
				</view>
			</view>
		</u-popup>
		<EditGoods ref="editGoodsRef" v-if="editGoodsShow" :editGoodsItem="editGoodsItem" @submit='handleGoodsSubmit'
			@closeEditGoods='editGoodsShow=false' />
		<u-modal :show="cancleCheckshow" @close="cancleCheckshow=false" :closeOnClickOverlay="true"
			@cancel="cancleCheckshow=false" title="提示" content='是否取消勾选该商品' :showCancelButton='true'
			@confirm="confirmCancelCheckGoods"></u-modal>
	</view>
</template>

<script>
	import EditGoods from './EditGoods.vue';
	import dayjs from 'dayjs';
	export default {
		props: {
			warehouseId: {
				type: [Number, String],
				required: true
			},
			customerId: {
				type: [Number, String],
				required: true
			},
			checkGoods: {
				type: Array,
				default: () => []
			},
			wareHouseArray: {
				type: Array,
				default: () => []
			}
		},
		components: {
			EditGoods
		},
		data() {
			return {
				goodListShow: false,
				goodList: [],
				editGoodsShow: false,
				editGoodsItem: {},
				cancleCheckshow: false
			}
		},
		watch: {
			goodListShow: {
				handler(val) {
					if (val) {
						//同步父组件仓位
						if (this.checkGoods && this.checkGoods.length > 0) {
							this.goodList = this.goodList.map(item => {
								if (item.isCheckForGoods) {
									let index = this.checkGoods.findIndex(el => el.id === item.id)
									let {
										warehouseId,
										areaId,
										rackId
									} = this.checkGoods[index]
									item = {
										...item,
										warehouseId,
										areaId,
										rackId
									}
								}
								return item
							})
						}
					}
				}
			}
		},
		created() {
			this.getGoodList()
		},
		methods: {
			async getGoodList() {
				const {
					content
				} = await uni.$u.http.post(`/wms/item/list?page=0&size=10`, null, {
					data: {
						currentCustomerId: null,
						customerId: null,
						itemType: null,
						search: null,
					},
					custom: {
						loading: false
					}
				})
				this.goodList = content || []
			},
			async getRecommendPlace(data) {
				return await uni.$u.http.post(`/wms/receiptOrder/getRecommendPlace`, null, {
					data,
					custom: {
						loading: false
					}
				}).then(res => {
					return res
				})
			},
			async clickEditGood(item) {
				let {
					planQuantity = '1', planWeight = item.unitWeight, volume = item.unitVolume || '0'
				} = item
				this.editGoodsItem = {
					...item,
					planQuantity,
					planWeight,
					volume,
					productionDate: item.productionDate || dayjs().format('YYYY-MM-DD')
				}
				if (!this.editGoodsItem.warehouseId) {
					//推荐仓位
					if (this.editGoodsItem.unitWeight > 0 && this.editGoodsItem.planQuantity > 0) {
						let places = await this.getRecommendPlace({
							"customerId": this.customerId,
							"warehouseId": this.warehouseId,
							"itemList": [{
									"itemId": this.editGoodsItem.id,
									"volume": this.editGoodsItem.volume,
									"weight": this.editGoodsItem.planWeight,
									"quantity": this.editGoodsItem.planQuantity
								},

							]
						})
						let {
							areaId,
							warehouseId,
							rackId
						} = places[0] || {}
						this.editGoodsItem = {
							...this.editGoodsItem,
							warehouseId,
							areaId,
							rackId
						}
					} else {
						//默认仓位
						let index = this.wareHouseArray.findIndex(el => el.id == this.warehouseId)
						let areaId = this.wareHouseArray[index]?.children?.[0]?.id ?? null
						let rackId = this.wareHouseArray[index]?.children?.[0]?.children?.[0]?.id ?? null
						this.editGoodsItem = {
							...this.editGoodsItem,
							warehouseId: this.warehouseId,
							areaId,
							rackId
						}
					}
				}
				this.editGoodsShow = true
				setTimeout(() => {
					this.$refs.editGoodsRef.show = true
				})
			},
			handleGoodsSubmit(data) {
				let index = this.goodList.findIndex(el => el.id == this.editGoodsItem.id)
				this.goodList.splice(index, 1, {
					...this.editGoodsItem,
					...data,
					isCheckForGoods: true
				})
			},

			confirmCancelCheckGoods() {
				let index = this.goodList.findIndex(el => el.id == this.editGoodsItem.id)
				this.goodList.splice(index, 1, {
					...this.editGoodsItem,
					isCheckForGoods: false
				})
				console.log(this.goodList[index], 'dddddd')
				this.cancleCheckshow = false
			},
			longCheck(item) {
				this.editGoodsItem = item
				if (!!this.editGoodsItem.isCheckForGoods) {
					this.cancleCheckshow = true
					return
				}
				this.clickEditGood(item)
			},
			goodsListHidden() {
				this.$emit('goodsFormSubmit', this.goodList.filter(item => item.isCheckForGoods))
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