import axios from 'axios';

// const baseURLs = {
// 	production: '',
// 	development: 'http://localhost:3001/'
// };
// const baseURL = baseURLs[process.env.NODE_ENV];
const baseURL = 'http://localhost:3001/';

const instance = axios.create({
	baseURL,
	headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default instance;
