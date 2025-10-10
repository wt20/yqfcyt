<!-- 我的页面 -->
<template>
	<view>
		<view class="account-bg">
		</view>
		<u-navbar title="我的" bgColor="rgba(0,0,0,0)" :titleStyle="{color: '#fff', fontWeight: 600, fontSize: '34rpx'}">
			<template #left></template>
		</u-navbar>
		<view class="avatar flexc">
			<u-avatar :src="src" size="100"></u-avatar>
		</view>
		<view class="menu-box">
			<u-cell-group>
				<u-cell icon="account-fill" title="姓名" :value="userInfo.userName"></u-cell>
				<u-cell icon="bookmark-fill" title="角色" :value="userInfo.roles.map(i=> i.roleName)"></u-cell>
				<u-cell icon="man-add-fill" title="部门" :value="userInfo.dept.deptName"></u-cell>
				<u-cell icon="phone-fill" title="电话" :value="userInfo.phonenumber"></u-cell>
				<u-cell title="修改密码" :isLink="true" url="/pages_sub/resetPass/resetPass"></u-cell>
			</u-cell-group>
		</view>
		<view class="log-out">
			<view class="plain-btn" @click="logOut">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://img0.baidu.com/it/u=2608378185,3480127378&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
				userInfo: uni.getStorageSync('user_info')?.user
			};

		},
		methods: {
			// 退出登录
			logOut() {
				uni.removeStorageSync('token');
				uni.removeStorageSync('t_user_info');
				uni.redirectTo({
					url: '/pages_sub/login/login'
				});
			}
		}
	}
</script>

<style lang="scss">
	.account-bg {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		z-index: -1;
		background-image: linear-gradient(#b2cdff, #f0f3fb);
	}

	.avatar {
		margin-top: 200rpx;
	}

	.flexc {
		display: flex;
		justify-content: center;
	}

	.menu-box {
		margin: 80rpx 20rpx 0rpx 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		overflow: hidden;
		background: #ffffff;
	}

	.log-out {
		padding: 0px 20rpx;
		box-sizing: border-box;
		position: absolute;
		bottom: 40rpx;
		width: 100%;
	}
</style>