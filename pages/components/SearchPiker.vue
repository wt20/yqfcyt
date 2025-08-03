<template>
	<view>
		<view v-if="show && showSearch"
			style="position: fixed; z-index: 99999;transform: translate(-50%, -50%);left: 50vw;top: 50vh;"><u-search
				placeholder="请输入" v-model="keyword" :actionStyle="{display: 'none'}"></u-search></view>
		<u-picker :show="show" :columns="getColumns" :keyName="keyName" :defaultIndex="defaultIndex" @cancel="cancel"
			@confirm="confirm"></u-picker>
	</view>
</template>

<script>
	export default {
		name: "SearchPiker",
		props: ['showSearch', 'show', 'columns', 'keyName', 'defaultIndex'],
		data() {
			return {
				keyword: ''
			};
		},
		methods: {
			cancel() {
				this.$emit('cancel')
				// this.keyword = ''
			},
			confirm(e) {
				this.$emit('confirm', e)
			},
		},
		computed: {
			getColumns() {
				const cols = this.columns[0].filter(i => {
					return i.customerName.includes(this.keyword)
				})
				return [cols]
			}
		}
	}
</script>

<style lang="scss">

</style>