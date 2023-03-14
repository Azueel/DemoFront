import axios from 'axios';
const authApi = axios.create({
	baseURL: 'http://localhost:5001/api',
});

authApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default authApi;
