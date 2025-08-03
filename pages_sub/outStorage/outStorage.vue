<!-- 出库管理页面 -->
<template>
	<view class="page">
		<view class="search-box">
			<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
				@input="$u.debounce(searchList, 500)"></u--input>
		</view>
		<slot name="top"></slot>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list @scrolltolower="scrolltolower" :height="height">
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<u-transition show mode="fade">
						<view class="list-item" @click="click(item)">
							<view class="title">
								出库单号
							</view>
							<view class="content content-full">
								{{ item.shipmentOrderNo }}
							</view>
							<view class="title">
								入库日期
							</view>
							<view class="content">
								{{ item.shipmentOrderDate }}
							</view>
							<view class="title">
								操作类型
							</view>
							<view class="content">
								{{ getDictLabel(item.shipmentOrderType, 'wms_shipment_type')  }}
							</view>
							<view class="title">
								仓库
							</view>
							<view class="content">
								{{ getDictLabel(item.warehouseId, 'warehouse')  }}
							</view>
							<view class="title">
								审核状态
							</view>
							<view class="content" style="display: inline-flex;">
								<u-tag :text="getDictLabel(item.auditStatus, 'audit_status')" plain shape="circle"
									:type="statusColors[item.auditStatus]" size="mini"></u-tag>
							</view>
						</view>
					</u-transition>
					
				</u-list-item>
				<u-loadmore :status="status" />
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
				otherQuery: {
					customerId: '',
					auditStatus: [3,4]
				},
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'shipmentOrderNo',
				placeholder: '请输入出库单号',
				apiUrl: '/wms/shipmentOrder/list',

				statusColors: ['info', 'error', 'warning', 'warning', 'success'],
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
				this.pageQuery.page = 0
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
					params: this.pageQuery,
					data: this.otherQuery,
					custom: {
						loading: false
					}
				})
				if (!content) return
				if (content.length === 0 || content.length < this.pageQuery.size) {
					if (totalElements > this.list.length) this.list.push(...content)
					return this.status = 'nomore'
				}
				if (content.length >= this.pageQuery.size) {
					this.list.push(...content)
					this.pageQuery.page++
					this.status = 'loadmore'
				}
			},
			click(item) {
				uni.navigateTo({
					url: `/pages_sub/outStorage/details/details?params=${item.id}`
				});
			},
			add() {
				uni.navigateTo({
					url: `/pages_sub/outStorage/details/details`
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
			background: #fff;
		}
	}

	.list-item {
		grid-row-gap: 16rpx;
	}
</style>