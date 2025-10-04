import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000'
});

function getLoadingContext() {
  // Importa dinamicamente para evitar problemas de importação circular
  return require('../hooks/useLoading');
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Ativa loading global
    try {
      const { useLoading } = getLoadingContext();
      const loading = useLoading();
      loading.showLoading();
    } catch {}
    return config;
});

api.interceptors.response.use(
  (response) => {
    try {
      const { useLoading } = getLoadingContext();
      const loading = useLoading();
      loading.hideLoading();
    } catch {}
    return response;
  },
  (error) => {
    try {
      const { useLoading } = getLoadingContext();
      const loading = useLoading();
      loading.hideLoading();
    } catch {}
    return Promise.reject(error);
  }
);

export { api };