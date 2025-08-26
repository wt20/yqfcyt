<!-- 仓储预约列表页面 -->
<template>
	<view class="page">
		<view class="search-box">
			<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
				@input="$u.debounce(searchList, 500)"></u--input>
		</view>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list>
					<u-list-item v-for="(item, index) in list" :key="item.id">
						<view class="list-item" @click="()=> click(item)">
							<view class="title">
								发货单位名称
							</view>
							<view class="content content-full">
								{{ item.carNo || '--' }}
							</view>
							<view class="title">
								收货单位名称
							</view>
							<view class="content content-full">
								{{ item.driverName || '--'  }}
							</view>
							<view class="title">
								订单状态
							</view>
							<view class="content">
								{{ typeMapping[item.type] || '--' }}
							</view>
							<view class="title">
								卸货方式
							</view>
							<view class="content">
								{{ item.warehouseName || '--'  }}
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
							<view class="content">
								{{ item.driverMobile || '--'  }}
							</view>
						</view>
					</u-list-item>
				</u-list>
			</view>
		<u-empty v-else mode="list" marginTop="40%" />
		<view class="add-btn" @click="add">
			<u-icon name="plus" pageSize="26" color="#fff"></u-icon>
		</view>
		<u-safe-bottom></u-safe-bottom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				pageQuery: {
					page: 0,
					pageSize: 30,
				},
				otherQuery: {},
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'keyword',
				placeholder: '请输入货品名称',
				apiUrl: '/wms/appointment/list',
			};
		},
		onShow() {
			if (this.searchField) this.otherQuery[this.searchField] = ''
			this.searchList()
		},
		computed: {},
		methods: {
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
					rows,
					total
				} = await uni.$u.http.get(this.apiUrl, {
					params: {
						...this.pageQuery,
						...this.otherQuery
					},
					custom: {
						loading: false
					}
				})
				if (!rows) return
				if (rows.length === 0 || rows.length < this.pageQuery.pageSize) {
					if (total > this.list.length) this.list.push(...rows)
					return this.status = 'nomore'
				}
				if (rows.length >= this.pageQuery.pageSize) {
					this.list.push(...rows)
					this.pageQuery.page++
					this.status = 'loadmore'
				}
			},
			click(item) {
				uni.setStorageSync('appointment_selectGoods', [])
				uni.navigateTo({
					url: `/pages_sub/appointment/addEdit/addEdit?params=${JSON.stringify(item)}`
				});
			},
			add() {
				uni.setStorageSync('appointment_selectGoods', [])
				uni.navigateTo({
					url: `/pages_sub/appointment/addEdit/addEdit`
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