<!-- 库存管理页面 -->
<template>
	<view class="page" v-if="hasPower">
		<view class="search-box flexb">
			<view style="background: #fff;flex: 1; border-radius: 12rpx;">
				<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
					prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
					@input="$u.debounce(searchList, 500)"></u--input>
			</view>
			<view class="more-box" @click="showPopup">
				<u-icon name="more-dot-fill" color="#2979ff" size="22"></u-icon>
			</view>
		</view>
		<slot name="top"></slot>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list @scrolltolower="scrolltolower" :height="height">
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<view class="list-item" @click="()=> clickItem(item)">
						<view class="title">
							货权单位
						</view>
						<view class="content">
							{{ item.customerName || '--' }}
						</view>
						<view class="title">
							商品名称
						</view>
						<view class="content">
							{{ item.itemName || '--' }}
						</view>
						<view class="title">
							重量
						</view>
						<view class="content">
							{{ (item.weight || '--') + 'KG'  }}
						</view>
						<view class="title">
							数量
						</view>
						<view class="content">
							{{ item.quantity || '--' }}
						</view>
						<view class="title">
							仓库
						</view>
						<view class="content">
							{{ item.rackNames || '--'  }}
						</view>
					</view>
				</u-list-item>
				<u-loadmore :status="status" />
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" />
		<Filter ref="filterRef" @submit="filterChange" :showFilterCustomer="!isCustomer"/>
	</view>
</template>

<script>
	import Filter from './Filter.vue';

	const {
		id,
		userType
	} = uni.getStorageSync('user_info');
	import {
		businessModelMapping,
		inModelMapping
	} from '@/utils/const.js'

	export default {
		props: {
			// otherQuery: {
			// 	type: Object,
			// 	default: {},
			// }
		},
		components: {
			Filter
		},
		data() {
			return {
				isCustomer: false,
				businessModelMapping,
				inModelMapping,
				list: [],
				query: {
					page: 0,
					size: 30,
				},
				otherQuery: {
					customerId: "",
					itemId: null,
					panelType: 20,
					warehouseId: null
				},
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'itemName',
				placeholder: '输入货物名称',
				apiUrl: 'wms/inventory/list',
			};
		},
		created() {
			if (this.searchField) this.otherQuery[this.searchField] = ''
			this.loadmore()
		},
		onShow() {
			this.isCustomer = uni.getStorageSync('user_info')?.roles?.includes('customer')
		},
		computed: {
			// 是否有权限
			hasPower() {
				return uni.getStorageSync('user_info')?.roles[0] !== 'doorman'
			}
		},
		methods: {
			searchList() {
				this.query.page = 0
				this.list = []
				this.loadmore()
			},
			scrolltolower() {
				this.loadmore()
			},
			async loadmore() {
				this.status = 'loading'
				const {
					content,
					totalElements
				} = await uni.$u.http.post(this.apiUrl, null, {
					params: this.query,
					data: this.otherQuery,
					custom: {
						loading: false
					}
				})
				if (!content) return
				if (content.length === 0 || content.length < this.query.size) {
					if (totalElements > this.list.length) this.list.push(...content)
					return this.status = 'nomore'
				}
				if (content.length >= this.query.size) {
					this.list.push(...content)
					this.query.page++
					this.status = 'loadmore'
				}
			},
			clickItem(item) {
				uni.navigateTo({
					url: `/pages_sub/myGoods/details/details?params=${JSON.stringify(item)}`
				});
			},
			filterChange({
				customerId,
				warehouseId
			}) {
				this.otherQuery.warehouseId = warehouseId
				this.otherQuery.customerId = customerId
				this.searchList()
			},
			showPopup() {
				this.$refs.filterRef.showPopup = true
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
	}
</style>