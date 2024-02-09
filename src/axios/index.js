import Axios from 'axios'
import store from '@/store';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_MY_ENV_API_BACKEND
})

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
  );
 

axios.interceptors.response.use(undefined, function (response) {
  store.dispatch("auth/logout");
  
}, function (error) {
  return Promise.reject(error);
});

export const get = (url) => axios.get(url).then(res => res.data)
export const post = (url, data) => axios.post(url, data).then(res => res.data)
export const put = (url, data) => axios.put(url, data).then(res => res.data)
export const del = (url) => axios.delete(url).then(res => res.data)
