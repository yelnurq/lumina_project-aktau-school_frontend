import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8000/',
  baseURL: 'https://aktau-it-school.lumina.kz/',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.__tokenKey = 'token'; 
  }

  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && error.config?.__tokenKey) {
      localStorage.removeItem('token');

      const redirectTo = '/';

      if (window.location.pathname !== redirectTo) {
        alert('Сессия истекла. Пожалуйста, войдите заново.');
        window.location.href = redirectTo;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
