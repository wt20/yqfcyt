<template>
	<view style="background-color: #F9F9F9;">
		<u-navbar :autoBack="true">
			<template #center>
				<view class="custom-title">
					<view>
						我要发货
					</view>
					<image src="/static/car_title.png"></image>
				</view>
			</template>
		</u-navbar>
		<u-status-bar></u-status-bar>
		<view class="banner">
			<image src="/static/banner.png"></image>
		</view>
		<u--form labelPosition="left" :model="formModel" :rules="rules" ref="uForm" labelWidth="70px">
			<view class="card-box">
				<u-form-item label="货品名称" prop="goodsName" borderBottom @click="showGoodsNamePicker = true">
					<view class="tips">{{ formModel.goodsName || '选择货品名称' }}</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<!-- <u-form-item label="包装方式" prop="packagingType" borderBottom @click="showPackagingType = true">
					<view class="tips">{{ formModel.packagingType || '选择包装方式' }}</view>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item> -->
				<u-form-item label="包装方式" prop="packagingType" borderBottom>
					<view slot="right" style="width: 200rpx;">
						<u--input v-model="packagingType" placeholder="请填写包装方式" border="none"></u--input>
					</view>
				</u-form-item>
				<u-form-item label="货物照片" prop="goodsPhotos" :borderBottom="false">
					<!-- <FileUplaod @change="fileChange" :defaultData="formModel.goodsPhotos" /> -->
					<u-upload :fileList="fileList" :maxCount="1" @afterRead="afterRead" @delete="deleteFile"
						:previewFullImage="true"></u-upload>
				</u-form-item>
			</view>
			<view class="card-box">
				<view class="form-item">
					<u-form-item label="总重量" prop="totalWeigth" borderBottom label-width="50px">
						<view class="flexs unit-item">
							<u--input v-model="formModel.totalWeigth" :customStyle="{width: '20px'}"
								placeholder="请输入"></u--input>
							<view class="unit" style="margin-right: 36rpx;">
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
							<view class="unit" style="margin-right: 36rpx;">
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
				<u-form-item label="车辆数" prop="cheliangshu" :borderBottom="false">
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
				<view class="car-module-box">
					<u-tabs :list="chezichangdus"></u-tabs>
					<view class="swiper-box">
						<u-swiper :list="chezis" @change="change" @click="click"></u-swiper>
					</view>
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
				<u-form-item label="订单号" prop="zhuangbasic.dingdanhao" borderBottom label-width="180rpx">
					<u--input v-model="formModel.zhuangbasic.dingdanhao" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="客户单号" prop="zhuangbasic.kehudanhao" borderBottom label-width="180rpx">
					<u--input v-model="formModel.zhuangbasic.kehudanhao" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="发货单位" prop="zhuangbasic.fahuodanwei" borderBottom label-width="180rpx">
					<u--input v-model="formModel.zhuangbasic.fahuodanwei" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="下单人" prop="zhuangbasic.xiadanren" borderBottom label-width="180rpx">
					<u--input v-model="formModel.zhuangbasic.xiadanren" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="省市区" prop="zhuangbasic.shengshiqu" borderBottom label-width="180rpx">
					<u--input v-model="formModel.zhuangbasic.shengshiqu" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="详细地址" prop="zhuangbasic.xiangxidizhi" :borderBottom="false" label-width="180rpx">
					<u--textarea v-model="formModel.zhuangbasic.xiangxidizhi" placeholder="请输入"
						border="none"></u--textarea>
				</u-form-item>
			</view>
			<view class="card-box">
				<view class="title-box">
					<view class="basic-box">
						卸
					</view>
					<view class="title-label">
						基本信息
					</view>
				</view>
				<u-form-item label="收货单位" prop="xiebaisc.shouhuodanwei" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.shouhuodanwei" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="收货联系人" prop="xiebaisc.shouhuolianxi" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.shouhuolianxi" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="手机号" prop="xiebaisc.shoujihao" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.shoujihao" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="省市区" prop="xiebaisc.shengshiqu" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.shengshiqu" placeholder="请输入" border="none"></u--input>
					<template slot="right">
						<view class="location-box" @click="importLocate">
							<u-icon name="map-fill" color="#1B83FD;"></u-icon>
							<view class="location-text">
								定位
							</view>
						</view>
					</template>

				</u-form-item>
				<u-form-item label="详细地址" prop="xiebaisc.xiangxidizhi" borderBottom label-width="180rpx">
					<u--textarea v-model="formModel.xiebaisc.xiangxidizhi" placeholder="请输入"
						border="none"></u--textarea>
				</u-form-item>
				<u-form-item label="卸货方式" prop="xiebaisc.xiehuofangshi" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.xiehuofangshi" placeholder="请输入" border="none"></u--input>
				</u-form-item>
				<u-form-item label="预计装车时间" prop="xiebaisc.yujizhuangcheshijian" borderBottom label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.yujizhuangcheshijian" placeholder="请输入"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="要求送达时间" prop="xiebaisc.yaoqiudaodashijian" :borderBottom="false"
					label-width="180rpx">
					<u--input v-model="formModel.xiebaisc.yaoqiudaodashijian" placeholder="请输入"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-button type="primary" @click="submit">提 交</u-button>
			</view>
		</u--form>

		<u-picker :show="showGoodsNamePicker" :closeOnClickOverlay="true" :columns="goodsNameOptions" keyName="itemName"
			@close="showGoodsNamePicker = false" @confirm="goodsNameSelect"
			@cancel="showGoodsNamePicker = false"></u-picker>
		<!-- <u-picker :show="showPackagingType" :closeOnClickOverlay="true" :columns="packagingOptions"
			@close="showPackagingType = false" @confirm="packagingSelect"
			@cancel="showPackagingType = false"></u-picker> -->
	</view>
</template>

<script>
	import FileUplaod from '@/pages/components/upload.vue'
	import {
		getItemList,
		getCustomerList,
		getAreaList,
		ordersCreate,
		ordersUpdate
	} from '@/pages_sub/api/transport.js'
	import {
		pathToBase64
	} from 'image-tools'

	let QQMapWX = require('@/utils/qqmap-wx-jssdk.min.js');

	const qqmapsdk = new QQMapWX({
		key: 'KSDBZ-RPMWB-SAKU5-JBSQ4-SDQMJ-I2BFG'
	})

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
					cheliangshu: '',
					zhuangbasic: {
						dingdanhao: '',
						kehudanhao: '',
						fahuodanwei: '',
						xiadanren: '',
						shengshiqu: '',
						xiangxidizhi: ''
					},
					xiebaisc: {
						shouhuodanwei: '',
						shouhuolianxi: '',
						shoujihao: '',
						shengshiqu: '',
						xiangxidizhi: '',
						xiehuofangshi: '',
						yujizhuangcheshijian: '',
						yaoqiudaodashijian: ''
					}
				},
				showPackagingType: false,
				packagingOptions: [
					['中国', '美国', '日本']
				],
				chezis: [
					"/static/car_module.png",
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

				showGoodsNamePicker: false,
				goodsNameOptions: [
					['中国', '美国', '日本']
				],

				fileList: [],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)

			this.initData({
				page: 1,
				size: 1000
			})
		},
		methods: {
			async initData() {
				const {
					rows
				} = await getItemList()
				this.goodsNameOptions = [rows]
			},
			rightClick() {
				console.log('rightClick');
			},
			packagingSelect(e) {
				this.formModel.packagingType = e.value[0]
				this.$refs.uForm.validateField('packagingType')
				this.showPackagingType = false
			},
			goodsNameSelect(e) {
				const {
					itemName
				} = e.value[0]
				this.formModel.goodsName = itemName
				this.$refs.uForm.validateField('goodsName')
				this.showGoodsNamePicker = false
			},
			fileChange(files) {
				this.formModel.goodsPhotos = files.map(i => {
					return {
						fileName: i.fileName,
						fileUrl: i.fileUrl
					}
				})
			},
			change(val) {},

			beforeRead(file) {
				console.log(1, file);

			},
			afterRead(file, b, c) {
				console.log(file, b, c);
				this.fileList = [{
					url: file.file.url,
					file: file.file
				}]
			},
			deleteFile() {
				this.fileList = []
			},


			getLocation() {
				return new Promise((resolve) => {
					uni.getLocation({
						success({
							latitude,
							longitude
						}) {
							console.log(111000, latitude, longitude);
							qqmapsdk.reverseGeocoder({
								location: {
									latitude,
									longitude
								},
								success: function({
									result
								}) {
									const {
										province,
										city,
										district
									} = result.ad_info
									resolve({
										pmd: province + city + district,
										details: result.address
									})
								},
								fail: function(error) {
									console.log(error);
									uni.$u.toast(error)
								},
							})
						}
					})
				})
			},
			async importLocate() {
				const {
					pmd,
					details
				} = await this.getLocation()
				this.formModel.xiebaisc.shengshiqu = pmd
				this.formModel.xiebaisc.xiangxidizhi = details
				console.log(pmd, details);
			},
			submit() {}
		}
	}
</script>

<style lang="scss">
	.custom-title {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 18rpx;

		image {
			width: 68rpx;
			height: 48rpx;
		}
	}

	.card-box {
		background-color: #fff;
		border-radius: 16rpx;
		margin: 36rpx;
		padding: 0rpx 36rpx;

		.tips {
			text-align: end;
		}
	}

	.banner {
		padding: 24rpx 24rpx 0rpx 24rpx;
		border-radius: 12rpx;
		margin-top: 100rpx;

		image {
			width: 100%;
			height: 220rpx;
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

	.car-module-box {
		background: #fff;
		border-radius: 24rpx;

		.swiper-box {
			padding: 26rpx 0px;
		}
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
			margin: 24rpx 0rpx;
		}

		.title-label {
			color: #000;
			font-weight: 600;
		}

	}

	.location-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		color: #1B83FD;

		.location-text {
			color: #2A82E4;
		}
	}
</style>