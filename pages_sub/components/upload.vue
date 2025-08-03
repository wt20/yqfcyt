<template>
	<u-upload :disabled="disabled" accept="media" capture="camera" :fileList="fileList" @afterRead="afterRead"
		@delete="deletePic" multiple :maxCount="15"></u-upload>
</template>

<script>
	export default {
		props: {
			defaultData: {
				type: Array,
				default: []
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				fileList: [],
			};
		},
		watch: {
			defaultData: {
				handler(val) {
					if (this.fileList.length) return
					this.fileList = val.map(i => {
						const url = i.fileUrl?.includes('http:') ? i.fileUrl :
							`http://yqfcyt.com/pro-api/${i.fileUrl}`
						return {
							fileName: i.fileName,
							fileUrl: i.fileUrl,
							status: "success",
							type: "image",
							url: url,
						}
					})
				},
				immediate: true
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1);
				this.$emit('change', this.fileList)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this.fileList.length;
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: "uploading",
						message: "上传中",
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this.fileList[fileListLen];
					this.fileList.splice(
						fileListLen,
						1,
						Object.assign(item, {
							status: "success",
							message: "",
							...result
						})
					);
					fileListLen++;
				}
				this.$emit('change', this.fileList)
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					const token = uni.getStorageSync('token')
					let a = uni.uploadFile({
						url: "https://yqfcyt.com/pro-api/common/upload",
						filePath: url,
						name: "file",
						header: {
							authorization: `Bearer ${token}`
						},
						success: (res) => {
							const {
								code,
								url,
								fileName,
								newFileName
							} = JSON.parse(res.data)
							if (code === 200) resolve({
								url,
								fileUrl: fileName,
								fileName: newFileName
							});
							else uni.$u.toast('上传失败，请重试')
						},
						fail(err) {
							console.log('上传失败', err);
						}
					});
				});
			},
		},
	};
</script>