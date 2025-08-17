<!-- 运输列表页面 -->
<template>
	<view class="page">
		<view class="search-box">
			<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
				@input="$u.debounce(searchList, 500)"></u--input>
		</view>
		<slot name="top"></slot>
		<view v-if="list.length" style="margin-top: 24rpx;">
			<u-list>
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<view class="list-item" @click="()=> click(item)">
						<view class="title">
							货物品名
						</view>
						<view class="content">
							{{ item.carNo || '--' }}
						</view>
						<view class="title">
							包装方式
						</view>
						<view class="content">
							{{ typeMapping[item.type] || '--' }}
						</view>
						<view class="title">
							发货单位
						</view>
						<view class="content">
							{{ item.warehouseName || '--'  }}
						</view>
						<view class="title">
							收货单位
						</view>
						<view class="title">
							卸货方式
						</view>
						<view class="content">
							{{ item.driverName || '--'  }}
						</view>
						<view class="title">
							预计装车时间
						</view>
						<view class="content">
							{{ item.driverMobile || '--'  }}
						</view>
						<view class="title">
							要求送达时间
						</view>
					</view>
				</u-list-item>
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" />
	</view>
</template>

<script>
	import {
		getDictLabel
	} from '@/utils/dict.js';

	export default {
		data() {
			return {
				list: [],
				pageQuery: {
					page: 0,
					size: 30,
				},
				otherQuery: {},
				searchField: 'search',
				placeholder: '请输入货权单位/司机姓名/手机号',
				apiUrl: '/PetroCarRentPlatform/api/orders/getDriverTransportOrder',
			};
		},
		created() {
			if (this.searchField) this.otherQuery[this.searchField] = ''
		},
		onShow() {
			this.searchList()
		},
		methods: {
			getDictLabel,
			searchList() {
				this.loadmore()
			},
			scrolltolower() {
				this.loadmore()
			},
			async loadmore() {
				// const res = await uni.$u.http.get(this.apiUrl, {
				// 	params: this.pageQuery,
				// 	data: this.otherQuery,
				// 	custom: {
				// 		loading: false
				// 	}
				// })
				// this.list = res || []
				this.list = [{}]
			},
			click(item = "{}") {
				uni.navigateTo({
					url: `/pages/deliver_goods/details?params=${JSON.stringify(item)}`
				});
			},
		},
	}
</script>

<style lang="scss">
	.page {
		padding: 24rpx;
		background: #ececec;
		height: 100vh;

		.search-box {
			background: #fff;
		}
	}

	.list-item {
		grid-row-gap: 16rpx;
	}
</style>