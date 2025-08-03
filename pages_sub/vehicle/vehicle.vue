<!-- 车辆管理页面 -->
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
							车牌号
						</view>
						<view class="content">
							{{ item.carNo || '--' }}
						</view>
						<view class="title">
							车辆类型
						</view>
						<view class="content">
							{{ typeMapping[item.type] || '--' }}
						</view>
						<view class="title">
							仓库
						</view>
						<view class="content">
							{{ item.warehouseName || '--'  }}
						</view>
						<view class="title">
							进出状态
						</view>
						<view class="content" style="display: inline-flex;">
							<view v-if="item.carArriveStatus == 0">
								{{carArriveStatusMapping[String(item.carArriveStatus)]}}
							</view>
							<u-tag v-else :text="carArriveStatusMapping[String(item.carArriveStatus)]" plain
								shape="circle" size="mini"></u-tag>
						</view>
						<view class="title">
							司机姓名
						</view>
						<view class="content">
							{{ item.driverName || '--'  }}
						</view>
						<view class="title">
							手机号
						</view>
						<view class="content">
							{{ item.driverMobile || '--'  }}
						</view>
						<view class="title">
							进入时间
						</view>
						<view class="content content-full">
							{{ item.carArriveTime || '--'  }}
						</view>
						<view class="title">
							离开时间
						</view>
						<view class="content content-full">
							{{ item.carLeaveTime || '--'  }}
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
				height: 'calc(100vh - 126rpx)',
				searchField: 'search',
				placeholder: '请输入货权单位/司机姓名/手机号',
				apiUrl: '/wms/wx/car/getCarList',

				statusColors: ['info', 'error', 'warning', 'warning', 'success'],

				typeMapping: {
					APPOINTMENT: '预约',
					IN: '入库',
					OUT: '出库'
				},
				carArriveStatusMapping: {
					'0': '--',
					'1': '已进',
					'2': '已出'
				}
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
				const res = await uni.$u.http.get(this.apiUrl, {
					params: this.pageQuery,
					data: this.otherQuery,
					custom: {
						loading: false
					}
				})
				this.list = res || []
			},
			click(item) {
				uni.navigateTo({
					url: `/pages_sub/vehicle/details/details?params=${JSON.stringify(item)}`
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