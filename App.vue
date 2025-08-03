<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage']
			});
			//#endif
		},
		onShareAppMessage(res) {
			return {
				title: '运齐发储运通',
				path: '/pages/index/index'
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

	.plain-btn {
		height: 92rpx;
		background: #FFFFFF;
		border-radius: 58rpx;
		border: 2rpx solid #63A6FF;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		font-size: 31rpx;
		color: #3487FC;
		margin-top: 23rpx;

		&:active {
			background: rgba(0, 0, 0, 0.03)
		}
	}

	.primary-btn {
		height: 92rpx;
		background: linear-gradient(313deg, #77CAFF 0%, #60A0FF 100%);
		box-shadow: 0rpx 10rpx 17rpx 0rpx rgba(111, 167, 253, 0.46);
		border-radius: 58rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: 500;
		font-size: 31rpx;
		color: #FFFFFF;

		&:active {
			background: linear-gradient(313deg, #77CAFF 0%, #60A0FF 50%);
		}
	}

	.flexs {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flexc {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flexb {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flexe {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	.info {
		color: #d3d4d6;
	}

	.warning {
		color: #ffba00;
	}

	.danger {
		color: #ff4949;
	}

	.error {
		color: #ff4949;
	}
	
	.success {
		color: #13ce66;
	}

	.success-bg {
		background: rgba(186, 238, 137, 0.3);
	}

	.warning-bg {
		background: rgba(233, 221, 0, 0.31);
	}

	.danger-bg {
		background: rgba(255, 179, 43, 0.32);
	}

	.error-bg {
		background: rgba(255, 0, 0, 0.3);
	}

	.list-item {
		padding: 24rpx;
		border-left: 2px solid rgb(78, 130, 255);
		background: #fff;
		margin-bottom: 16rpx;
		display: grid;
		grid-template-columns: 112rpx 1fr 112rpx 1fr;
		gap: 8rpx;
		box-shadow: inset 0px 0px 0px 1px #e4f2ff;
		.title {
			font-size: 26rpx;
		}

		.content {
			font-size: 26rpx;
			color: rgba(0, 0, 0, 0.5);
		}

		.content-full {
			grid-column-start: 2;
			grid-column-end: 5;
		}
	}

	.u-cell__body__content {
		align-items: flex-start !important;
	}

	.safe-bottom {
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.u-textarea {
		background-color: #efefef !important;
	}
	
	.u-cell__value {
		white-space: pre-wrap;
		word-break: break-all;
		max-width: 80%;
	}
	
	.u-list-item {
		.u-slot-value .u-text {
			justify-content: flex-end !important;
		}
	}
</style>