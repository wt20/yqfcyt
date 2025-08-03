<template>
	<u-popup :show="show" mode="right" :round="10" :closeOnClickOverlay="false" @close="close" @open="open">
		<view style="overflow-y: auto;max-height: 96vh; width: 86vw;padding: 26rpx;">
			<view style="grid-column-start: 1; grid-column-end: 5;">
				<u--form labelPosition="left" :model="goodsForm" :rules="goodsformRules" ref="formRef" labelWidth="100">
					<u-form-item label="数量" prop="planQuantity" borderBottom>
						<u--input v-model="goodsForm.planQuantity" border="none" placeholder="请输入数量"></u--input>
					</u-form-item>
					<u-form-item label="重量(吨)" prop="planWeight" borderBottom>
						<u--input v-model="goodsForm.planWeight" border="none" placeholder="请输入重量"></u--input>
					</u-form-item>
					<u-form-item label="体积" prop="volume" borderBottom>
						<u--input v-model="goodsForm.volume" border="none" placeholder="请输入数量"></u--input>
					</u-form-item>
					<u-form-item label="仓库/库区" @click="stashLocationShow = true" prop="warehouseId" borderBottom>
						<u-picker ref="uPicker" :show="stashLocationShow" :defaultIndex="defaultIndexs"
							:columns="treeWarehouseArea" @change='treeWareHouseAreaChange' @confirm="areaConfirm"
							@cancel='pickCancelClick' keyName="curLabel"></u-picker>
						<u--text :text="checkAreaTextShow" :color="goodsForm.warehouseId?'#303133':'#c0c4cc'"></u--text>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="生产日期" prop="productionDate" borderBottom @click="showProductionDate = true">
						<u--input v-model="goodsForm.productionDate" placeholder="请选择生产日期" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<view class="flexb" style="gap: 50rpx; margin-top: 56rpx;">
					<u-button plain text="取消" @click="cancel"></u-button>
					<u-button type="primary" text="确定" @click="submit"></u-button>
				</view>
			</view>
		</view>
		<u-calendar :show="showProductionDate" @close="showProductionDate = false"
			@confirm="productionDateSelect"></u-calendar>
	</u-popup>
</template>

<script>
	import dicts from '@/utils/dict.js';

	export default {
		props: {
			editGoodsItem: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			let {
				planQuantity = '', planWeight = '', volume = '', rackId = '', areaId = '',
					warehouseId = '',
					productionDate = ''
			} = this.editGoodsItem || {}
			function validateNumber(rule, value, callback) {
				return Number(value) > 0
			}
			return {
				show: false,
				goodsForm: {
					planQuantity,
					planWeight,
					volume,
					rackId,
					areaId,
					warehouseId,
					productionDate
				},
				goodsformRules: {
					planQuantity: [{
							type: 'string',
							required: true,
							message: '请输入数量',
							trigger: ['change', 'blur']
						},
						{
							validator: validateNumber,
							message: '必须大于0',
							trigger: ['change', 'blur']
						}
					],
					planWeight: [{
							type: 'string',
							required: true,
							message: '请输入重量',
							trigger: ['change', 'blur']
						},
						{
							validator: validateNumber,
							message: '必须大于0',
							trigger: ['change', 'blur']
						}
					],
					volume: {
						type: 'string',
						required: true,
						message: '请输入体积',
						trigger: ['change', 'blur']
					},
					warehouseId: {
						type: 'number',
						required: true,
						message: '请选择仓库/库区',
						trigger: ['change', 'blur']
					},
					productionDate: {
						type: 'string',
						required: true,
						message: '请选择生产日期',
						trigger: ['change', 'blur']
					},
				},
				showProductionDate: '',
				stashLocationShow: false,
				treeWarehouseArea: [],
				checkAreaTextShow: '请选择仓库/库区',
				checkDefaultArray: [],
				defaultIndexs: [],
				wareHouseArray: []
			}
		},
		created() {
			this.wareHouseArray = dicts().getTreeWarehouseArea()
			let wareHouseArray = this.wareHouseArray
			this.defaultIndexs = this.handleDefaultIndex()
			//数据回显
			if (this.goodsForm.warehouseId) {
				this.checkAreaTextShow = this.handleAreaTextShow(this.defaultIndexs)
			}
			this.treeWarehouseArea = [wareHouseArray, wareHouseArray[this.defaultIndexs[0]]?.children ?? [],
				wareHouseArray[this.defaultIndexs[0]]?.children[this.defaultIndexs[1]]?.children ?? []
			]
		},
		methods: {
			close() {
				this.show = false
			},
			open() {
				this.show = true
			},
			productionDateSelect(e) {
				this.goodsForm.productionDate = e[0]
				this.$refs.formRef.validateField('productionDate')
				this.showProductionDate = false
			},
			treeWareHouseAreaChange(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				let nextIndex = columnIndex
				let nextChilren = value[columnIndex]?.children ?? []
				while (nextIndex < this.treeWarehouseArea.length - 1) {
					picker.setColumnValues(nextIndex + 1, nextChilren)
					nextIndex += 1
					nextChilren = nextChilren?.[0]?.children ?? []
				}

			},
			areaConfirm(e) {
				let {
					value,
					indexs
				} = e
				let curValue
				while (!curValue && value.length > 0) {
					curValue = value.pop()
				}
				this.goodsForm.warehouseId = (curValue.warehouseId || curValue.id)
				this.goodsForm.areaId = (curValue.areaId ? curValue.areaId : (curValue.warehouseId ? curValue.id : null))
				this.goodsForm.rackId = (curValue.warehouseId && curValue.areaId ? curValue.id : null)
				this.checkAreaTextShow = this.handleAreaTextShow(indexs)
				this.stashLocationShow = false
			},
			handleDefaultIndex() {
				let ids = [this.goodsForm.warehouseId, this.goodsForm.areaId, this.goodsForm.rackId]
				let indexs = []
				let areaList = this.wareHouseArray
				for (let i = 0; i < ids.length; i++) {
					let index = areaList.findIndex(el => el.id == ids[i])
					indexs.push(index !== -1 ? index : 0)
					areaList = areaList?.[index]?.children ?? []
				}
				return indexs
			},
			handleAreaTextShow(indexs) {
				let curArea = this.wareHouseArray[indexs[0]]
				let checkAreaText = []
				for (let i = 0; i < indexs.length; i++) {
					let curLabel = curArea?.curLabel
					curLabel && checkAreaText.push(curLabel)
					curArea = curArea?.children?.[indexs[i + 1]]
				}
				return checkAreaText.join('-')
			},
			submit() {
				this.$refs.formRef.validate().then(res => {
					this.$emit('submit', {
						...this.goodsForm
					})
					this.show = false
					this.$emit('closeEditGoods')
				}).catch(errors => {})
			},
			cancel() {
				this.$refs.formRef.resetFields()
				this.show = false
				this.$emit('closeEditGoods')
			},
			pickCancelClick() {
				this.stashLocationShow = false
			}
		},
		onReady() {
			this.$refs.formRef.setRules(this.goodsformRules)
		},
	}
</script>

<style>
</style>