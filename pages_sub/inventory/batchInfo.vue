<template>
	<view class="page">
		<view v-if="batchs.length || status === 'loading'">
			<u-list @scrolltolower="scrolltolower" height="calc(100vh - 50rpx)">
				<u-list-item v-for="(item, index) in batchs" :key="index">
					<view class="list-item">
						<view class="title">
							批次
						</view>
						<view class="content">
							{{ item.batch }}
						</view>
						<view class="title">
							名称
						</view>
						<view class="content">
							{{ item.goods.name }}
						</view>
						<view class="title">
							数量
						</view>
						<view class="content">
							{{ item.batchNum }}
						</view>
						<view class="title">
							重量
						</view>
						<view class="content">
							{{ item.batchWeight }}吨
						</view>
						<view class="title">
							预警状态
						</view>
						<view class="content content-full">
							{{ stateMapping[Number(item.project.warningState)] }}
						</view>
						<view class="title">
							项目名称
						</view>
						<view class="content content-full">
							{{ item.project.projectName }}
						</view>
						<view class="flexs" style="grid: none;width: 100vw;gap: 12rpx; display: flex;flex-direction: column;align-items: flex-start;">
							<view class="flexs" style="gap: 12rpx;">
								<view class="title">
									轮换时限
								</view>
								<view class="content content-full" style="grid-column-start: 2;grid-column-end: 5;">
									{{ item.inOpDate }}
								</view>
							</view>
							<view class="flexs" style="gap: 12rpx;">
								<view class="title">
									保质期时限
								</view>
								<view class="content content-full" style="grid-column-start: 2;grid-column-end: 5;">
									{{ item.inOpDate }}
								</view>
							</view>
						</view>
					</view>

				</u-list-item>
				<u-loadmore :status="status" />
			</u-list>
		</view>
		<u-empty v-else mode="list" marginTop="40%" icon="http://cdn.uviewui.com/uview/empty/list.png" />
	</view>
</template>

<script>
	const {
		id,
		userType
	} = uni.getStorageSync('user_info');
	export default {
		data() {
			return {
				batchs: [],
				query: {
					page: 1,
					rows: 30,
					searchCont: '',
				},
				status: 'loading',
				colorMapping: ['success-bg', 'error-bg', 'danger-bg', 'warning-bg'],
				stateMapping: ['正常', '红色', '橙色', '黄色']
			};
		},
		onLoad({
			params
		}) {
			if (userType === 'customer') {
				this.query.userType = userType
				this.query.customerId = id
			}
			this.query.goodsId = JSON.parse(params).goodsId
			this.loadmore()
		},
		methods: {
			scrolltolower() {
				this.loadmore()
			},
			async loadmore() {
				this.status = 'loading'
				const {
					rows,
					records
				} = await uni.$u.http.post(`/stock/getDetailList`, null, {
					params: this.query,
					custom: {
						loading: false
					}
				})
				if (!rows) return
				if (rows.length === 0 || rows.length < this.query.rows) {
					if (records > this.batchs.length) this.batchs.push(...rows)
					return this.status = 'nomore'
				}
				if (rows.length >= this.query.rows) {
					this.batchs.push(...rows)
					this.query.page++
					this.status = 'loadmore'
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background: rgba(78, 130, 255, 0.1);
		padding: 24rpx;
	}

	.list-item {
		grid-row-gap: 16rpx;
	}
</style>