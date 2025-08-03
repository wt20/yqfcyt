<!-- 选人组件 -->
<template>
	<u-popup :show="showPopup" mode="right" closeOnClickOverlay @close="showPopup = false">
		<view class="container">
			<view v-if="allUsers.length">
				<u-checkbox-group v-model="checkedUsers" iconPlacement="right" placement="column" borderBottom
					@change="change">
					<view class="item-box" v-for="item in allUsers" :key="item.userId">
						<u-checkbox labelColor="#333" labelSize="18" :label="item.nickName"
							:name="item.userId + ''"></u-checkbox>
					</view>
				</u-checkbox-group>
			</view>
			<u-empty v-else mode="list" marginTop="40%" />
		</view>

	</u-popup>

</template>

<script>
	export default {
		props: {
			defaultUser: {
				type: String
			}
		},
		data() {
			return {
				showPopup: false,
				allUsers: [],
				checkedUsers: [],
			}
		},
		created() {


		},
		watch: {
			defaultUser: {
				async handler() {
					if (this.defaultUser) {
						this.checkedUsers = this.defaultUser.split(',')
						if (!this.allUsers?.length) await this.getReceiptOrderUsers()
						this.change(this.checkedUsers)
					}else {
						this.getReceiptOrderUsers()
					}
				},
				immediate: true
			}
		},
		methods: {
			show() {
				this.showPopup = true
			},
			async getReceiptOrderUsers() {
				const {
					rows = []
				} = await uni.$u.http.get('/wms/wx/receiptOrder/getUserList')
				this.allUsers = rows.filter(i => !i.working)
			},
			change(val) {
				this.$emit('change', {
					ids: val.join(','),
					userNames: val.map(i => this.allUsers.filter(a => a.userId == i)[0]?.nickName)?.join(',')
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow-y: auto;
		max-height: 96vh;
		width: 60vw;
		padding: 24rpx;

		.item-box {
			padding: 26rpx 0rpx;
		}
	}
</style>