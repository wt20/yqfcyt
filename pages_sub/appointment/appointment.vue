<!-- 仓储预约列表页面 -->
<template>
	<view class="page">
		<view class="search-box">
			<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search"
				prefixIconStyle="font-size: 50rpx;color: #909399" v-model="otherQuery[searchField]"
				@input="$u.debounce(searchList, 500)"></u--input>
		</view>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list @scrolltolower="scrolltolower" :height="height">
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<view class="list-item" @click="click(item)">
						<view class="title">
							预约类型
						</view>
						<view class="content">
							{{ item.appointmentType == '0' ? '入库': '出库' }}
						</view>
						<view class="title">
							车牌/车号
						</view>
						<view class="content">
							{{ item.vehicleNo || '' }}
						</view>
						<view class="title">
							联系人
						</view>
						<view class="content">
							{{ item.picker || '' }}
						</view>
						<view class="title">
							手机号码
						</view>
						<view class="content">
							{{ item.pickerMobile || '' }}
						</view>
						<view class="title">
							预约时间
						</view>
						<view class="content content-full">
							{{ item.appointmentTime }}
						</view>
					</view>
				</u-list-item>
				<u-loadmore :status="status" />
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" />
		<view class="add-btn" @click="add">
			<u-icon name="plus" size="26" color="#fff"></u-icon>
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
					size: 30,
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
				if (rows.length === 0 || rows.length < this.pageQuery.size) {
					if (total > this.list.length) this.list.push(...rows)
					return this.status = 'nomore'
				}
				if (rows.length >= this.pageQuery.size) {
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