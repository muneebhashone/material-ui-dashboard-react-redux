import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from 'src/config.js';
import axios from 'axios';

const uploadToCloudinary = async (imageToUpload) => {
  try {
    const formData = new FormData();
    formData.append('file', imageToUpload);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const { data } = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
      transformRequest: (data, headers) => {
        delete headers.common['Authorization'];
        return data;
      }
    });
    return data.url;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default uploadToCloudinary;
