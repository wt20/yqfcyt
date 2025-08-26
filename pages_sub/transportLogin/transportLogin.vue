<!-- 运输登录页面 -->
<template>
	<view>
		<view class="login-bg">
			<image src="https://yqfcyt.com/pro-api/profile/wx/static/home_bg.png" style="width: 100%"></u--image>
		</view>
		<u-status-bar></u-status-bar>
		<view class="top-box">
			<u-avatar src="https://yqfcyt.com/pro-api/profile/wx/static/logo.png" size="70"></u-avatar>
			<text class="logo-title">运齐发储运通宝</text>
		</view>
		<view class="login-content">
			<u-tabs :list="tabData" :scrollable="false" lineHeight="5" @click="tabClick"></u-tabs>
			<view class="user-icon">
				<u-icon name="account" color="#000000" size="20"></u-icon>
			</view>
			<view class="input-box" style="margin-top: 20rpx;">
				<u--input v-model="mobile" placeholder="请输入您的账号" shape="circle" border="none"></u--input>
			</view>
			<view class="flexs label-box">
				<u-icon name="lock-open" color="#000000" size="20"></u-icon>
				<text class="input-label">密码</text>
			</view>
			<view class="input-box">
				<u--input type="password" v-model="password" placeholder="请输入您的密码" shape="circle"
					border="none"></u--input>
			</view>
		</view>

		<view class="btn-box">
			<view class="primary-btn" @click="login">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	import Qs from 'qs'
	import {
		tLogin
	} from '@/pages_sub/api/transport.js'


	export default {
		data() {
			return {
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
				mobile: '15584509795',
				password: 'YZ123456.',
			};
		},
		onLoad() {
			// const userInfo = uni.getStorageSync('t_user_info');
			// this.mobile = userInfo?.mobile || ''
		},
		methods: {
			tabClick() {
				this.mobile = ''
				this.password = ''
			},
			login() {
				if (!this.mobile) return uni.showToast({
					title: '请输入您的账号',
					icon: 'none'
				});
				if (!this.password) return uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});

				tLogin(Qs.stringify({
					Mobile: this.mobile,
					Password: this.password,
				})).then(({
					data
				}) => {
					if (!data) return
					uni.setStorageSync('t_user_info', {
						userName: data.userName,
						mobile: this.mobile,
						userRole: data.userRole,
					});
					uni.navigateBack()
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