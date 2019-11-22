import axios from 'axios';

const baseURLs = {
	production: '',
	development: 'http://localhost:3001/'
};
const baseURL = baseURLs[process.env.NODE_ENV];

const instance = axios.create({
	baseURL,
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



// Alternatively for JWT we could set token as default in a 
// protected route HOC or something of the like.
// EG: httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

