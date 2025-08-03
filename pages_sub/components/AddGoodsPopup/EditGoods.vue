<template>
	<u-popup :show="show" mode="right" :round="10" :closeOnClickOverlay="false" @close="close" @open="open">
		<view style="overflow-y: auto;max-height: 96vh; width: 86vw;padding: 26rpx;">
			<view style="grid-column-start: 1; grid-column-end: 5;">
				<u--form labelPosition="left" :model="goodsForm" :rules="goodsformRules" ref="formRef" labelWidth="100">
					<u-form-item label="货物品名" borderBottom>
						<u--input v-model="goodsForm.itemName" disabled border="none"></u--input>
					</u-form-item>
					<u-form-item label="批次" borderBottom>
						<u--input v-model="goodsForm.batchNo" border="none" placeholder="请输入批次"></u--input>
					</u-form-item>
					<u-form-item label="实收数量" prop="realQuantity" borderBottom>
						<u--input v-model="goodsForm.realQuantity" border="none" placeholder="请输入数量"></u--input>
					</u-form-item>
					<u-form-item label="实收重量(吨)" prop="realWeight" borderBottom>
						<u--input v-model="goodsForm.realWeight" border="none" placeholder="请输入重量"></u--input>
					</u-form-item>
					<u-form-item label="仓库/库区" @click="stashLocationShow = true" prop="warehouseId" borderBottom>
						<u-picker ref="uPicker" :show="stashLocationShow" :defaultIndex="defaultIndexs"
							:columns="treeWarehouseArea" @change='treeWareHouseAreaChange' @confirm="areaConfirm"
							@cancel='pickCancelClick' keyName="curLabel"></u-picker>
						<u--text :text="checkAreaTextShow" :color="goodsForm.warehouseId?'#303133':'#c0c4cc'"></u--text>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<view class="flexb" style="gap: 50rpx; margin-top: 56rpx;">
					<u-button plain text="取消" @click="cancel"></u-button>
					<u-button type="primary" text="确定" @click="submit"></u-button>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import dicts from '@/utils/dict.js';
	import {
		bindData
	} from '@/utils/common.js';
	export default {
		props: {
			editGoodsItem: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			const validateNumber = (rule, value, callback) => {
				return Number(value) > 0
			}
			return {
				show: false,
				goodsForm: {
					id: 0,
					// 货物品名
					itemName: "",
					// 批次
					batchNo: "",
					// 实收数量
					realQuantity: "",
					// 实收重量
					realWeight: "",
					warehouseId: "",
					areaId: "",
					// 库位号
					rackId: "",
				},
				goodsformRules: {
					realQuantity: [{
							type: 'number',
							required: true,
							message: '请输入数量',
							trigger: ['change', 'blur']
						},
						{
							validator: validateNumber,
							message: '数量必须大于0',
							trigger: ['change', 'blur']
						}
					],
					realWeight: [{
							type: 'number',
							required: true,
							message: '请输入重量',
							trigger: ['change', 'blur']
						},
						{
							validator: validateNumber,
							message: '重量必须大于0',
							trigger: ['change', 'blur']
						}
					],
					warehouseId: {
						type: 'number',
						required: true,
						message: '请选择仓库/库区',
						trigger: ['change', 'blur']
					},
				},
				stashLocationShow: false,
				treeWarehouseArea: [],
				checkAreaTextShow: '请选择仓库/库区',
				defaultIndexs: [],
				wareHouseArray: []
			}
		},
		methods: {
			initData() {
				bindData(this.goodsForm, this.editGoodsItem)
				console.log(11, this.goodsForm);
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
			close() {
				this.show = false
			},
			open() {
				this.show = true
				this.initData()
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
				}).catch(errors => {})
			},
			cancel() {
				this.$refs.formRef.resetFields()
				this.show = false
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