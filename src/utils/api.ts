import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fortestsworkshop-default-rtdb.firebaseio.com/',
});

export default api;
