<template>
	<view style="background-color: #efefef;">
		<u-navbar :autoBack="true">
			<template #center>
				<view class="custom-title">
					<view>
						我要发货
					</view>
					<image src="/static/deliver_goods_active.png"></image>
				</view>
			</template>
		</u-navbar>
		<u-status-bar></u-status-bar>
		<view class="banner">
			<image src="/static/deliver_goods_active.png"></image>
		</view>
		<u--form labelPosition="left" :model="formModel" :rules="rules" ref="uForm" labelWidth="70px">
			<view class="card-box">
				<u-form-item label="货品名称" prop="goodsName" borderBottom>
					<view class="tips">{{ formModel.goodsName || '选择货品名称' }}</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="包装方式" prop="packagingType" borderBottom @click="showPackagingType = true">
					<view class="tips">{{ formModel.packagingType || '选择包装方式' }}</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="货物照片" prop="goodsPhotos" borderBottom>
					<FileUplaod @change="fileChange" :defaultData="formModel.goodsPhotos" />
				</u-form-item>
			</view>
			<view class="card-box">
				<view class="form-item" style="gap: 20px;">
					<u-form-item label="总重量" prop="totalWeigth" borderBottom label-width="50px">
						<view class="flexs unit-item">
							<u--input v-model="formModel.totalWeigth" :customStyle="{width: '20px'}"
								placeholder="请输入"></u--input>
							<view class="unit">
								吨
							</view>
						</view>
					</u-form-item>
					<u-form-item label="总件数" prop="totalNum" borderBottom label-width="50px">
						<view class="flexs unit-item">
							<u-number-box v-model="formModel.totalNum" button-size="37"></u-number-box>
							<view class="unit">
								件
							</view>
						</view>
					</u-form-item>
				</view>
				<u-form-item label="托盘数" prop="tuopanshu" borderBottom>
					<view class="flexs unit-item">
						<u-number-box v-model="formModel.tuopanshu" button-size="37"></u-number-box>
						<view class="unit">
							件
						</view>
					</view>

				</u-form-item>
				<view class="form-item" style="gap: 20rpx;">
					<u-form-item label="长度" prop="changdu" :borderBottom="false" label-width="70rpx">
						<view class="flexs unit-item">
							<u--input v-model="formModel.changdu" placeholder="请输入"></u--input>
							<view class="unit">
								米
							</view>
						</view>
					</u-form-item>
					<u-form-item label="宽度" prop="kuandu" :borderBottom="false" label-width="70rpx">
						<view class="flexs unit-item">
							<u-number-box v-model="formModel.kuandu" button-size="37"></u-number-box>
							<view class="unit">
								米
							</view>
						</view>
					</u-form-item>
				</view>
				<u-form-item label="高度" prop="gaodu" borderBottom>
					<view class="flexs unit-item">
						<u-number-box v-model="formModel.gaodu" button-size="37"></u-number-box>
						<view class="unit">
							米
						</view>
					</view>

				</u-form-item>
				<u-form-item label="车辆数" prop="cheliangshu" borderBottom>
					<view class="flexs unit-item">
						<u-number-box v-model="formModel.cheliangshu" :customStyle="{width: '140px'}"
							button-size="37"></u-number-box>
						<view class="unit">
							辆
						</view>
					</view>
				</u-form-item>
			</view>
			<view class="card-box">
				<view class="chezibox">
					<u-tabs :list="chezichangdus"></u-tabs>
					<u-swiper :list="chezis" @change="change" @click="click"></u-swiper>
				</view>
			</view>
			<view class="card-box">
				<view class="title-box">
					<view class="basic-box">
						装
					</view>
					<view class="title-label">
						基本信息
					</view>
				</view>
			</view>
		</u--form>

		<u-picker :show="showPackagingType" :columns="packagingOptions" @close="showPackagingType = false"
			@confirm="packagingSelect" @cancel="showPackagingType = false"></u-picker>
	</view>
</template>

<script>
	import FileUplaod from '@/pages/components/upload.vue'

	export default {
		components: {
			FileUplaod,
		},
		data() {
			return {
				formModel: {
					goodsName: '',
					packagingType: '',
					goodsPhotos: [],
					totalWeigth: '',
					totalNum: '',
					tuopanshu: '',
					changdu: '',
					kuandu: '',
					gaodu: '',
					cheliangshu: ''

				},
				showPackagingType: false,
				packagingOptions: [
					['中国', '美国', '日本']
				],
				chezis: [
					"/static/deliver_goods_active.png",
					"https://uviewui.com/swiper/swiper2.png",
					"https://uviewui.com/swiper/swiper3.png",
				],
				chezichangdus: ['4米2', '4米8', '8米6', '9米6', '13米', '不限制'].map(i => ({
					name: i
				})),

				rules: {
					'goods': {
						type: 'string',
						required: true,
						message: '请输入车牌/车号',
						trigger: ['change', 'blur']
					}
				},

			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			rightClick() {
				console.log('rightClick');
			},
			packagingSelect(e) {
				this.formModel.packagingType = e.value[0]
				this.$refs.uForm.validateField('packagingType')
				this.showPackagingType = false
			},
			fileChange(files) {
				this.formModel.goodsPhotos = files.map(i => {
					return {
						fileName: i.fileName,
						fileUrl: i.fileUrl
					}
				})
			},
			change(val) {
				console.log(11, val);
			}
		}
	}
</script>

<style lang="scss">
	.custom-title {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;

		image {
			width: 24px;
			height: 24px;
		}
	}

	.card-box {
		background-color: #fff;
		border-radius: 16rpx;
		margin: 36rpx;
		padding: 0rpx 36rpx;
	}

	.banner {
		padding: 24px;
		border-radius: 12px;
		margin-top: 36px;

		image {
			width: 100%;
			height: 120px;
		}
	}

	.form-item {
		display: flex;
		width: 100%;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.u-form-item {
			flex: 1;
		}
	}

	.unit-item {
		gap: 8rpx;
	}

	.chezibox {
		background: #fff;
		border-radius: 24rpx;
	}

	.title-box {
		display: flex;
		gap: 12rpx;
		align-items: center;
		.basic-box {
			background-color: #000;
			border-radius: 50%;
			padding: 8rpx;
			color: #fff;
			width: 36rpx;
			height: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 24rpx 0px;
		}

		.title-label {
			color: #000;
			font-weight: 600;
		}
	}
</style>