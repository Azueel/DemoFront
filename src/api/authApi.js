import axios from 'axios';
const authApi = axios.create({
	baseURL: 'https://tiendaalejo.up.railway.app/api',
});

authApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default authApi;
