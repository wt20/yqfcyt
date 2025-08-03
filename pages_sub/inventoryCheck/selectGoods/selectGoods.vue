<!-- 选择商品页面 -->
<template>
	<view class="page">
		<view class="search-box flexb">
			<view style="background: #fff;flex: 1; border-radius: 12rpx;">
				<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
					prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
					@input="$u.debounce(searchList, 500)"></u--input>
			</view>
			<!-- <view class="more-box" @click="showPopup">
				<u-icon name="more-dot-fill" color="#2979ff" size="22"></u-icon>
			</view> -->
		</view>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list :height="height">
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<view :class="['list-item', { 'checked': item._selected }]" @click="click(item)">
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
						<view class="checkbox-mark">
							<u-icon v-if="item._selected" name="checkbox-mark" color="#2979ff" size="28"></u-icon>
						</view>
					</view>
				</u-list-item>
				<!-- <u-loadmore :status="status" /> -->
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" />
		<!-- <Filter ref="filterRef" @submit="filterChange" :showFilterWarehouse="false"/> -->
	</view>
</template>

<script>
	import {
		bindData
	} from '@/utils/common.js';
	import Filter from '@/pages_sub/myGoods/Filter.vue';

	export default {
		components: {
			Filter
		},
		data() {
			return {
				list: [],
				pageQuery: {
					page: 0,
					size: 30,
				},
				otherQuery: {
					itemType: null,
					search: "",
					currentCustomerId: null,
					customerId: null,
					warehouseId: null,
				},
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'search',
				placeholder: '请输入货品名称',
				apiUrl: '/wms/inventoryCheck/getItemList',

				selectedGoods: [],
			};
		},
		onShow(data) {
			if (this.searchField) this.otherQuery[this.searchField] = ''
			this.searchList()
		},
		onLoad({
			params
		}) {
			const {
				customerId
			} = JSON.parse(params || '{}')
			this.otherQuery.customerId = customerId
		},
		computed: {

		},
		methods: {
			showPopup() {
				this.$refs.filterRef.showPopup = true
			},
			filterChange({
				customerId,
				warehouseId
			}) {
				this.otherQuery.customerId = customerId
				this.searchList()
			},
			searchList() {
				this.pageQuery.page = 0
				this.list = []
				this.loadmore()
			},
			scrolltolower() {
				this.loadmore()
			},
			async loadmore() {
				// this.status = 'loading'
				const data = await uni.$u.http.get(this.apiUrl, null)
				if (!data) return
				const selectedGoods = uni.getStorageSync('check_selectGoods')
				data.forEach(item => {
					const isExist = selectedGoods?.some(i => i.id == item.id)
					item._selected = isExist
				})
				this.list = data
				// if (data.length === 0 || data.length < this.pageQuery.size) {
				// 	if (totalElements > this.list.length) this.list.push(...data)
				// 	return this.status = 'nomore'
				// }
				// if (data.length >= this.pageQuery.size) {
				// 	this.list.push(...data)
				// 	this.pageQuery.page++
				// 	this.status = 'loadmore'
				// }
			},
			click(item) {
				uni.navigateTo({
					url: `/pages_sub/inventoryCheck/selectGoods/editGoods/editGoods?params=${JSON.stringify(item)}`
				});
			}
		},
	}
</script>

<style lang="scss">
	.page {
		padding: 24rpx;
		background: #ececec;
		height: 100vh;

		.search-box {
			gap: 26rpx;
			box-sizing: border-box;

			.more-box {
				width: 30px;
				background: #fff;
				padding-left: 12rpx;
				border-radius: 12rpx;
			}
		}
	}

	.list-item {
		grid-row-gap: 16rpx;
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

	.add-btn {
		position: fixed;
		top: 50vh;
		right: 24rpx;
		background: #2979ff;
		border-radius: 50%;
		padding: 12rpx;

		&:active {
			background: #245eb0;
		}
	}

	.list-item {
		grid-template-columns: 120rpx 1fr 120rpx 1fr;
	}
</style>