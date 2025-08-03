<!-- 修改密码页面 -->
<template>
	<view class="reset-pass">
		<u--form labelWidth="150rpx" labelPosition="top" :model="model" :rules="rules" ref="uForm">
			<u-form-item label="旧密码" prop="oldPass" borderBottom placeholder="请选择旧密码">
				<u--input v-model="model.oldPass" password border="none"></u--input>
			</u-form-item>
			<u-form-item label="新密码" prop="newPass" borderBottom placeholder="请输入新密码">
				<u--input v-model="model.newPass" password border="none"></u--input>
			</u-form-item>
			<u-form-item label="确认密码" prop="repeatPass" borderBottom placeholder="请再次输入新密码">
				<u--input v-model="model.repeatPass" password border="none"></u--input>
			</u-form-item>
		</u--form>
		<view class="primary-btn" style="margin-top: 12vh;" @click="resetPass">
			提 交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					oldPass: '',
					newPass: '',
					repeatPass: ''
				},
				rules: {
					oldPass: {
						type: 'string',
						required: true,
						message: '请输入旧密码',
						trigger: ['blur', 'change']
					},
					newPass: {
						type: 'string',
						required: true,
						message: '请输入新密码',
						trigger: ['blur', 'change']
					},
					repeatPass: [{
							type: 'string',
							required: true,
							message: '请再次输入新密码',
							trigger: ['blur', 'change']
						},
						{
							validator: (rule, value, callback) => {
								return this.model.newPass === this.model.repeatPass
							},
							message: '新密码和确认密码不一致',
							trigger: ['blur'],
						}
					]
				},
				loading: false
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			resetPass() {
				if(this.loading) return
				this.$refs.uForm.validate().then(async res => {
					this.loading = true
					const data = await uni.$u.http.post('user/changePsw', null, {
						params: {
							id: uni.getStorageSync('user_info').number,
							oldPsw: this.model.oldPass,
							newPsw: this.model.newPass
						}
					}).finally(()=> this.loading = false)
					this.loading = true
					uni.$u.toast('修改成功，请重新登录')
					setTimeout(() => {
						uni.removeStorageSync('user_info');
						uni.redirectTo({
							url: '/pages_sub/login/login'
						});
						this.loading = false
					}, 2000)
				}).catch(errors => {})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reset-pass {
		padding: 48rpx;
	}
</style>