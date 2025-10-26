<!-- 登录页面 -->
<template>
	<view>
		<view class="login-bg">
			<image src="https://yqfcyt.com/pro-api/profile/wx/static/home_bg.png" style="width: 100%"></u--image>
		</view>
		<u-status-bar></u-status-bar>
		<view class="top-box">
			<u-avatar src="https://yqfcyt.com/pro-api/profile/wx/static/logo.png" size="70"></u-avatar>
			<text class="logo-title">运齐发仓储宝</text>
		</view>
		<view class="login-content">
			<u-tabs :list="tabData" :scrollable="false" lineHeight="5" @click="tabClick"></u-tabs>
			<view class="user-icon">
				<u-icon name="account" color="#000000" size="20"></u-icon>
			</view>
			<view class="input-box" style="margin-top: 20rpx;">
				<u--input v-model="username" placeholder="请输入您的账号" shape="circle" border="none"></u--input>
			</view>
			<view class="flexs label-box">
				<u-icon name="lock-open" color="#000000" size="20"></u-icon>
				<text class="input-label">密码</text>
			</view>
			<view class="input-box">
				<u--input type="password" v-model="password" placeholder="请输入您的密码" shape="circle"
					border="none"></u--input>
			</view>

			<view class="flexs label-box">
				<u-icon name="eye" color="#000000" size="20"></u-icon>
				<text class="input-label">验证码</text>
			</view>
			<div class="flexs" style="gap: 24rpx;">
				<view class="input-box">
					<u--input v-model="code" placeholder="请输入验证码" shape="circle" border="none"></u--input>
				</view>
				<image class="code-img" :src="codeImg" @click="reloadCode"></u--image>
			</div>
		</view>

		<view class="btn-box">
			<view class="primary-btn" @click="login">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 库管：stock_supervisor
				// 仓储主管：storage_supervisor
				// 客服主管：service_supervisor
				// 普通用户：'common'
				// 超管 admin
				// 商户 customer
				tabData: [{
						name: '货主'
					},
					{
						name: '司机'
					},
					{
						name: '仓管'
					},
					{
						name: '管理人员'
					}
				],
				username: '',
				password: '',
				code: '',
				codeImg: '',
				uuid: ''
			};
		},
		onLoad() {
			const userInfo = uni.getStorageSync('user_info');
			this.username = userInfo?.user?.userName || ''
			this.getVerificationCode()
		},
		methods: {
			tabClick() {
				this.username = ''
				this.password = ''
				this.code = ''
				this.uuid = ''
				this.getVerificationCode()
			},
			reloadCode() {
				this.getVerificationCode()
			},
			getVerificationCode() {
				this.code = ''
				this.uuid = ''
				uni.$u.http.get(`captchaImage`, null)
					.then(({
						img,
						uuid
					}) => {
						this.codeImg = `data:image/jpeg;base64,${img}`
						this.uuid = uuid
					}).catch(err => {})
			},
			login() {
				if (!this.username) return uni.showToast({
					title: '请输入您的账号',
					icon: 'none'
				});
				if (!this.password) return uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				if (!this.code) return uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				});

				uni.$u.http.post(`login`, null, {
						data: {
							username: this.username,
							password: this.password,
							code: this.code,
							uuid: this.uuid
						},
						custom: {
							auth: false
						}
					}).then(data => {
						uni.setStorageSync('token', data.token);
						uni.$u.http.get('/getInfo').then(res => {
							uni.setStorageSync('user_info', {
								username: this.username,
								permissions: res.permissions,
								roles: res.roles,
								user: res.user
							});
							setTimeout(() => {
								if (res.roles.includes('doorman')) {
									uni.redirectTo({
										url: '/pages_sub/vehicle/vehicle'
									});
									return
								}
								uni.switchTab({
									url: '/pages/index/index'
								});
							}, 600)
						})

					})
					.catch(err => {
						setTimeout(() => {
							this.reloadCode()
						}, 1500)
					})

			}
		}
	}
</script>

<style lang="scss">
	.login-bg {
		width: 100vw;
		z-index: -1;
		position: absolute;
		top: 0px;
	}

	.top-box {
		margin-top: 60rpx;
		margin-bottom: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;

		.logo-title {
			font-size: 50rpx;
			color: #ffffff;
			font-weight: 600;
			letter-spacing: 6rpx;
			text-shadow: 1px 1px 6px #888;
		}
	}

	.login-content {
		background: #ffffff;
		border-top-left-radius: 50rpx;
		border-top-right-radius: 50rpx;
		padding: 30rpx 32rpx;
		position: relative;

		.user-icon {
			position: absolute;
			top: 56rpx;
		}

		.input-label {
			font-size: 30rpx;
			color: #000;
		}

		.label-box {
			gap: 8rpx;
			margin-top: 40rpx;
			margin-bottom: 24rpx;
		}

		.input-box {
			background-color: #1fd0d914;
			height: 100rpx;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			padding: 0px 50rpx;
		}
	}

	.btn-box {
		padding: 36rpx;
		margin-top: 50rpx;
	}

	.code-img {
		width: 260rpx;
		height: 100rpx;
	}
</style>