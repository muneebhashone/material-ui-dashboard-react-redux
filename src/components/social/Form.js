import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import { updateSocial, addSocial } from 'src/requests';
import { useMutation } from 'react-query';
import uploadToCloudinary from 'src/utils/uploadToCloudinary';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const linkRegex =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  image: Yup.string().required('Required'),
  link: Yup.string().matches(linkRegex, 'URL is not valid').required('Required')
});

const Form = ({ data }) => {
  const updateMutation = useMutation((data) => updateSocial(data));
  const addMutation = useMutation((data) => addSocial(data));

  const params = useParams();

  const notifyEdit = () => toast('Edit Success');
  const notifyAdd = () => toast('Add Success');

  const formik = useFormik({
    initialValues: {
      title: data?.name || '',
      image: data?.imgSrc || '',
      link: data?.link || ''
    },
    validationSchema,
    onSubmit: (values) => {
      if (!params.id) {
        handleAddSubmit(values);
        return;
      }

      handleEditSubmit(values);
      console.log(values);
    }
  });

  const handleEditSubmit = (values) => {
    updateMutation.mutate(
      {
        id: params.id,
        name: values.title,
        link: values.link,
        imgSrc: values.image
      },
      {
        onSuccess: (data) => {
          notifyEdit();
          console.log(data);
        },
        onError: (err) => console.log(err)
      }
    );
  };

  const handleAddSubmit = (values) => {
    addMutation.mutate(
      {
        name: values.title,
        link: values.link,
        imgSrc: values.image
      },
      {
        onSuccess: (data) => {
          notifyAdd();
          formik.resetForm();
          console.log(data);
        },
        onError: (err) => console.log(err)
      }
    );
  };

  const handleImage = async (image) => {
    if (!image) return;
    try {
      const imgUrl = await uploadToCloudinary(image);
      console.log(imgUrl);
      formik.setFieldValue('image', imgUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box>
        <Card>
          <CardContent>
            <Box
              style={{ width: '80%', margin: '0 auto', padding: '25px 0px' }}
            >
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item md={12}>
                        <img
                          width="100%"
                          height="122px"
                          style={{ objectFit: 'contain' }}
                          src={
                            formik.values.image ||
                            'https://i.stack.imgur.com/y9DpT.jpg'
                          }
                        />
                        {formik.errors.image && formik.touched.image && (
                          <Typography textAlign="center" variant="body2">
                            Image is required
                          </Typography>
                        )}
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.link}
                          variant="outlined"
                          placeholder="Link"
                          name="link"
                          label="Link"
                          fullWidth
                          helperText={
                            formik.errors.link &&
                            formik.touched.link &&
                            formik.errors.link
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.title}
                          variant="outlined"
                          placeholder="Title"
                          name="title"
                          label="Title"
                          fullWidth
                          helperText={
                            formik.errors.title &&
                            formik.touched.title &&
                            'Title is required'
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap="15px"
                      justifyContent="flex-end"
                      style={{ marginTop: '20px', textAlign: 'right' }}
                    >
                      <input
                        accept="image/*"
                        onChange={(event) => handleImage(event.target.files[0])}
                        style={{ display: 'none' }}
                        id="upload-logo-dark"
                        type="file"
                      />
                      <label
                        style={{ display: 'block' }}
                        htmlFor="upload-logo-dark"
                      >
                        <Button
                          variant="outlined"
                          style={{ borderRadius: '6px', height: '100%' }}
                          component="span"
                        >
                          Upload Image
                        </Button>
                      </label>
                      <Button
                        type="submit"
                        style={{
                          padding: '15px',
                          borderRadius: '6px'
                        }}
                        variant="contained"
                      >
                        {params.id ? 'Update' : 'Add'}
                      </Button>
                    </Box>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Form;
