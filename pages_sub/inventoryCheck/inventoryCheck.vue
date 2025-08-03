<!-- 盘库记录 -->
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
							盘点单号
						</view>
						<view class="content content-full">
							{{ item.inventoryCheckNo || '' }}
						</view>
						<view class="title">
							盘点状态
						</view>
						<view class="content content-full">
							{{ getDictLabel(item.inventoryCheckStatus, 'wms_check_status') }}
						</view>
						<view class="title">
							盘点时间
						</view>
						<view class="content content-full">
							{{ item.createTime || '' }}
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
				status: 'loading',
				height: 'calc(100vh - 126rpx)',
				searchField: 'inventoryCheckNo',
				placeholder: '请输入库存盘点单号',
				apiUrl: '/wms/inventoryCheck/list',
			};
		},
		onShow() {
			if (this.searchField) this.otherQuery[this.searchField] = ''
			this.searchList()
		},
		computed: {},
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
					url: `/pages_sub/inventoryCheck/addEdit/addEdit?params=${JSON.stringify(item)}`
				});
			},
			add() {
				uni.navigateTo({
					url: `/pages_sub/inventoryCheck/addEdit/addEdit`
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