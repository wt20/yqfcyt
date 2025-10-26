<!-- 首页 -->
<template>
	<view class="home">
		<image class="top-bg" src="https://yqfcyt.com/pro-api/profile/wx/static/home_top_bg.png"></image>
		<u-status-bar></u-status-bar>
		<view class="title">运齐发储运通</view>
		<view class="slogan flexc">质量更高速度更快</view>
		<view class="content">
			<view class="transport">
				<view class="title-box flexs">
					<image class="dot" src="https://yqfcyt.com/pro-api/profile/wx/static/dot.png"></image>
					<view class="title-text">
						运输管理
					</view>
				</view>
				<view class="menu">
					<view class="menu-item">
						<view class="menu-title-box flexs">
							我要发货
							<u-icon name="arrow-right" color="#333333" size="24rpx"></u-icon>
						</view>
						<view class="menu-img menu-img-1"></view>
					</view>
					<view class="menu-item">
						<view class="menu-title-box flexs">
							我要发货
							<u-icon name="arrow-right" color="#333333" size="24rpx"></u-icon>
						</view>
						<view class="menu-img menu-img-2"></view>
					</view>
				</view>
				<view class="menu-small">
					<view class="menu-small-item" v-for="(item, key) in transportMenus" :key="key">
						<image class="menu-small-img"
							:src="`https://yqfcyt.com/pro-api/profile/wx/static/${item.img}.png`"></image>
						<view class="menu-small-text">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>

			<view class="warehouse transport">
				<view class="title-box flexs">
					<image class="dot" src="https://yqfcyt.com/pro-api/profile/wx/static/dot.png"></image>
					<view class="title-text">
						仓库管理
					</view>
				</view>
				<view class="menu-small">
					<view class="menu-small-item" v-for="(item, key) in warehouseMenus" :key="key"
						@click="openPage(item)">
						<template>
							<image class="menu-small-img"
								:src="`https://yqfcyt.com/pro-api/profile/wx/static/${item.img}.png`"></image>
							<view class="menu-small-text">
								{{item.text}}
							</view>
						</template>
					</view>
				</view>
			</view>
			<image class="bottom-box" src="https://yqfcyt.com/pro-api/profile/wx/static/advertisement.png"></image>
		</view>

	</view>
</template>

<script>
	import dicts from '@/utils/dict.js';
	export default {
		data() {
			return {
				// 菜单1
				transportMenus: [{
						img: 'transport_menu1',
						text: '回单确认'
					},
					{
						img: 'transport_menu2',
						text: '运单查询'
					},
					{
						img: 'transport_menu3',
						text: '我要报销'
					},
					{
						img: 'transport_menu4',
						text: '加油管理'
					}
				],
				// 菜单2
				warehouseMenus: [],
				// 权限配置
				menuPowers: {
					admin: ['/pages_sub/appointment/appointment',
						'/pages_sub/inStorage/inStorage', '/pages_sub/outStorage/outStorage',
						'/pages_sub/inventoryCheck/inventoryCheck', '/pages_sub/myGoods/myGoods',
						'/pages_sub/vehicle/vehicle', '/pages_sub/kanban/kanban'
					],
					stock_supervisor: ['/pages_sub/inStorage/inStorage', '/pages_sub/outStorage/outStorage',
						'/pages_sub/inventoryCheck/inventoryCheck'],
					storage_supervisor: ['/pages_sub/inStorage/inStorage', '/pages_sub/outStorage/outStorage',
						'/pages_sub/inventoryCheck/inventoryCheck'],
					service_supervisor: ['/pages_sub/appointment/appointment',
						'/pages_sub/inStorage/inStorage', '/pages_sub/outStorage/outStorage'],
					service_audit_supervisor: ['/pages_sub/appointment/appointment',
						'/pages_sub/inStorage/inStorage', '/pages_sub/outStorage/outStorage'],
					customer: ['/pages_sub/appointment/appointment', '/pages_sub/myGoods/myGoods'],
					doorman: ['/pages_sub/vehicle/vehicle'],
				}
			}
		},
		beforeCreate() {
			// 获取用户信息
			const user_info = uni.getStorageSync('user_info');
			const token = uni.getStorageSync('token')
			if (!user_info || !token) {
				// 跳转登录
				uni.redirectTo({
					url: '/pages_sub/login/login'
				});
				return
			}
			import('@/utils/dict.js')
		},
		onShow() {
			dicts()
			this.warehouseMenus = this.getWarehouseMenus()
			// if (uni.getStorageSync('user_info')?.roles[0] === 'doorman') {
			// 	uni.setTabBarItem({
			// 		index: 3,
			// 		visible: true
			// 	})
			// }
		},
		methods: {
			// 菜单点击
			openPage({
				url
			}) {
				// 跳转
				uni.navigateTo({
					url
				})
			},
			// 获取菜单
			getWarehouseMenus() {
				const menus = [{
						img: 'warehouse_menu1',
						text: '仓储预约',
						url: '/pages_sub/appointment/appointment',
					},
					{
						img: 'warehouse_menu2',
						text: '入库管理',
						url: '/pages_sub/inStorage/inStorage',
					},
					{
						img: 'warehouse_menu3',
						text: '出库管理',
						url: '/pages_sub/outStorage/outStorage',
					},
					{
						img: 'warehouse_menu4',
						text: '盘库管理',
						url: '/pages_sub/inventoryCheck/inventoryCheck',
					},
					{
						img: 'warehouse_menu5',
						text: '我的货物',
						url: '/pages_sub/myGoods/myGoods',
					},
					{
						img: 'warehouse_menu6',
						text: '经营看板',
						url: '/pages_sub/kanban/kanban',
					}, {
						img: 'warehouse_menu7',
						text: '车辆管理',
						url: '/pages_sub/vehicle/vehicle',
					}
				]
				const roles = uni.getStorageSync('user_info')?.roles
				return menus.filter(i => {
					const roleMenuPowers = roles?.reduce((cur, next) => {
						cur.push(...this.menuPowers[next])
						return cur
					}, [])
					return roleMenuPowers.includes(i.url)
				})
			}
		},

	}
</script>

<style lang="scss">
	.home {
		font-family: AlimamaShuHeiTi, AlimamaShuHeiTi;

		.top-bg {
			width: 100%;
			position: absolute;
			top: 0;
			z-index: -1;
		}

		.title {
			font-weight: 400;
			font-size: 48rpx;
			color: #FFFFFF;
			letter-spacing: 3px;
			margin-left: 52rpx;
			margin-top: 40rpx;
		}

		.slogan {
			width: 238rpx;
			height: 46rpx;
			background: #FFFFFF;
			font-weight: 500;
			font-size: 24rpx;
			color: #48A6FD;
			letter-spacing: 2px;
			border-radius: 46rpx;
			margin-left: 52rpx;
			margin-top: 40rpx;
		}

		.content {
			padding: 0rpx 32rpx;
			margin-top: 80rpx;

			.transport {
				background: #FFFFFF;
				box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(130, 124, 124, 0.15);
				border-radius: 22rpx 22rpx 0rpx 0rpx;
				padding: 32rpx 26rpx;

				.title-box {
					.dot {
						width: 38rpx;
						height: 24rpx;
					}

					.title-text {
						font-size: 32rpx;
						color: #1A1A1A;
						margin-left: 12rpx;
					}
				}

				.menu {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 42rpx;
					margin-top: 28rpx;

					.menu-item {
						width: 296rpx;
						height: 160rpx;
						background: #EDF7FF;
						position: relative;

						.menu-title-box {
							margin-top: 48rpx;
							margin-left: 24rpx;
							font-size: 28rpx;
							color: #333333;
							gap: 8rpx;
						}

						.menu-img {
							width: 90rpx;
							height: 64rpx;
							position: absolute;
							bottom: 0;
							right: 0;

							background-size: 100%;
						}

						.menu-img-1 {
							background-image: url('https://yqfcyt.com/pro-api/profile/wx/static/car1.png');
						}

						.menu-img-2 {
							background-image: url('https://yqfcyt.com/pro-api/profile/wx/static/car2.png');
						}
					}
				}

				.menu-small {
					margin-top: 48rpx;
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					gap: 58rpx;

					.menu-small-item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.menu-small-img {
							width: 90rpx;
							height: 92rpx;
							border-radius: 24rpx;
						}

						.menu-small-text {
							font-size: 28rpx;
							color: #333333;
							margin-top: 16rpx;
						}

						&:active .menu-small-img {
							box-shadow: 0px 0px 12px #ccc;
						}
					}

				}
			}

			.warehouse {
				margin-top: 30rpx;
				border-radius: 0rpx;

				.menu-small {
					gap: 30rpx 58rpx;
				}
			}

			.bottom-box {
				width: 100%;
				height: 266rpx;
				// background-image: url('https://yqfcyt.com/pro-api/profile/wx/static/advertisement.png');
				background-size: 100%;
				margin-top: 30rpx;
				margin-bottom: 96rpx;
			}
		}
	}
</style>