import axios from 'axios';

export const getBrands = () => {
  return axios.get('/brands');
};

export const getSingleBrand = (id) => {
  console.log(id);
  return axios.get(`/brands/${id}`);
};

export const getVideos = () => {
  return axios.get('/video');
};

export const getSocial = () => {
  return axios.get('/social');
};

export const getNews = () => {
  return axios.get('/news');
};

export const getSettings = () => {
  return axios.get('/settings');
};

export const updateSettings = (data) => {
  return axios.patch('/settings', data);
};
