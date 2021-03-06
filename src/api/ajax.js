import axios from 'axios'

import {Toast} from "antd-mobile";

import {dev} from './config.js'

axios.defaults.baseURL = dev.host;

export default function ajax(url, data = {}, type = "POST", loading = true) {

	data = {...data, token: sessionStorage.token};

	return new Promise((resolve, reject) => {
		let promise;
		if (type === 'GET') {
			promise = axios.get(url, {params: data})
		} else {
			promise = axios.post(url, data)
		}

		promise.then(
			response => {
				resolve(response.data)
			},
			error => {
				reject(error)
			}
		);

		// 添加请求拦截器
		axios.interceptors.request.use(function (config) {
			// 在发送请求之前做些什么

			// 加载 loading 动画
			if (loading) {
				Toast.loading('数据加载中...', 60, () => {
				}, true);
			}


			return config;
		}, function (error) {
			// 对请求错误做些什么
			return Promise.reject(error);
		});

		// 添加响应拦截器
		axios.interceptors.response.use(function (response) {
			// 对响应数据做点什么
			if (response.data.code === 2) {
				sessionStorage.clear();
				window.location.replace('/');
			}
			// 关闭 Loading 状态
			Toast.hide();
			return response;
		}, function (error) {
			// 对响应错误做点什么
			// sessionStorage.clear();
			// window.location.replace('/');
			// 提示 数据加载失败
			console.log(error);
			Toast.fail('服务器错误', error);
			// Toast.fail(error, 1);

			return Promise.reject(error);
		});

	})
}
