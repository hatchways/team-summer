import axios from 'axios';

const instance = axios.create({
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// example interceptor for setting token - could also set token as default
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
