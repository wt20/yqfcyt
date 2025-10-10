// 请求js
let cookies = []

uni.$u.http.setConfig((config) => {
	/* config 为默认全局配置*/
	config.baseURL = `https://yqfcyt.com/pro-api/`; /* 根域名 */
	config.custom.loading = true
	config.custom.auth = true
	return config
})

// 请求拦截
uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	if (config.custom.auth) {
		const token = uni.getStorageSync('token')
		if (token) config.header.authorization = `Bearer ${token}`
	}
	if (config.custom.loading) {
		uni.showLoading()
	}
	const tCookie = uni.getStorageSync('t_cookie') || []
	if (tCookie?.length) {
		config.header.cookie = tCookie.join(';')
	}
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

// 响应拦截
uni.$u.http.interceptors.response.use((response) => {
	if (response.cookies?.length) {
		const tCookie = uni.getStorageSync('t_cookie') || []
		uni.setStorageSync('t_cookie', [...response.cookies]);
	}
	try {
		uni?.hideLoading()
	} catch (error) {
		//TODO handle the exception
	}
	if (!response.data.code) return response.data
	if (response.data.code == 401 || response.data.code == 101 || response.data?.msg?.includes(
			'domain')) {
		uni.showToast({
			title: '登录失效，请重新登录',
			icon: 'none'
		});
		return setTimeout(() => {
			uni.redirectTo({
				url: '/pages_sub/login/login'
			});
		}, 1500)
	}
	if (response.data?.code != 200) {
		uni.showToast({
			title: response.data?.msg || '服务器异常',
			icon: 'none'
		});
		return Promise.reject(response)
	}
	return response.data.data || response.data
}, (response) => {
	try {
		uni?.hideLoading()
	} catch (error) {
		//TODO handle the exception
	}
	uni.showToast({
		title: response?.errMsg,
		icon: 'none'
	});
	return Promise.reject(response)
})