<!-- 加载更多列表组件 -->
<template>
	<view class="page">
		<u--input v-if="searchField" :placeholder="placeholder" prefixIcon="search" prefixIconStyle="font-size: 50rpx;color: #909399"
			v-model="query[searchField]" @input="$u.debounce(searchList, 500)"></u--input>
		<slot name="top"></slot>
		<view v-if="list.length || status === 'loading'" style="margin-top: 24rpx;">
			<u-list @scrolltolower="scrolltolower" :height="height">
				<u-list-item v-for="(item, index) in list" :key="item.id">
					<slot :item="item" multiSlots></slot>
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
		props: {
			// 高度
			height: {
				type: String,
				default: 'calc(100vh - 50rpx)',
			},
			// 搜索字段名
			searchField: {
				type: String,
			},
			// 搜索提示
			placeholder: {
				type: String,
				default: '输入关键字搜索',
			},
			// 请求接口
			apiUrl: {
				type: String,
				default: '',
			},
			// 其他请求参数
			otherQuery: {
				type: Object,
				default: {},
			}
		},
		data() {
			return {
				// 列表数据
				list: [],
				// 查询参数
				query: {
					page: 1,
					rows: 30,
				},
				// 列表状态
				status: 'loading'
			};
		},
		created() {
			if(this.searchField) this.query[this.searchField] = ''
			this.query.goodsId = 1082
			this.loadmore()
		},
		methods: {
			searchList() {
				this.query.page = 1
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
					records
				} = await uni.$u.http.post(this.apiUrl, null, {
					params: {
						...this.query,
						...this.otherQuery
					},
					custom: {
						loading: false
					}
				})
				if (!rows) return
				if (rows.length === 0 || rows.length < this.query.rows) {
					if (records > this.list.length) this.list.push(...rows)
					return this.status = 'nomore'
				}
				if (rows.length >= this.query.rows) {
					this.list.push(...rows)
					this.query.page++
					this.status = 'loadmore'
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 24rpx;
	}

	.list-item {
		grid-row-gap: 16rpx;
	}
</style>