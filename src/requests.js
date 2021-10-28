import axios from 'axios';

// Brands

export const getBrands = () => {
  return axios.get('/brands');
};

export const getSingleBrand = (id) => {
  return axios.get(`/brands/${id}`);
};

export const updateBrand = (data) => {
  const brandId = data.id;
  delete data.id;
  return axios.patch(`/brands/${brandId}`, data);
};

export const addBrand = (data) => {
  return axios.post(`/brands`, data);
};

export const deleteBrand = ({ id }) => {
  return axios.delete(`/brands/${id}`);
};

// Videos

export const getVideos = () => {
  return axios.get('/video');
};

export const addVideo = (data) => {
  return axios.post('/video', data);
};

export const getSingleVideo = (id) => {
  return axios.get(`/video/${id}`);
};

export const updateVideo = (data) => {
  const videoId = data.id;
  delete data.id;
  return axios.patch(`/video/${videoId}`, data);
};

export const deleteVideo = ({ id }) => {
  return axios.delete(`/video/${id}`);
};

// Social Profiles

export const getSocial = () => {
  return axios.get('/social');
};

export const addSocial = (data) => {
  return axios.post('/social', data);
};

export const getSingleSocial = (id) => {
  return axios.get(`/social/${id}`);
};

export const updateSocial = (data) => {
  const socialId = data.id;
  delete data.id;
  return axios.patch(`/social/${socialId}`, data);
};

export const deleteSocial = ({ id }) => {
  return axios.delete(`/social/${id}`);
};

// News

export const getNews = () => {
  return axios.get('/news');
};

export const addNews = (data) => {
  return axios.post('/news', data);
};

export const getSingleNews = (id) => {
  return axios.get(`/news/${id}`);
};

export const updateNews = (data) => {
  const newsId = data.id;
  delete data.id;
  return axios.patch(`/news/${newsId}`, data);
};

export const deleteNews = ({ id }) => {
  return axios.delete(`/news/${id}`);
};

// Settings

export const getSettings = () => {
  return axios.get('/settings');
};

export const updateSettings = (data) => {
  return axios.patch('/settings', data);
};
