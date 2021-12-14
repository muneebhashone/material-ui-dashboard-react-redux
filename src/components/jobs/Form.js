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
import { updateVideo, addVideo } from 'src/requests';
import { useMutation } from 'react-query';
import uploadToCloudinary from 'src/utils/uploadToCloudinary';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Editor from 'src/components/WYSIWYG/Editor';

const linkRegex =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  image: Yup.string().required('Required'),
  link: Yup.string().matches(linkRegex, 'URL is not valid').required('Required')
});

const Form = ({ data }) => {
  const [editor, setEditor] = useState('');
  const updateMutation = useMutation((data) => updateVideo(data));
  const addMutation = useMutation((data) => addVideo(data));
  const [canAutogenerateThumbnail, setCanAutogenerateThumbnail] =
    useState(false);

  const params = useParams();

  const notifyEdit = () => toast('Successfully updated');
  const notifyAdd = () => toast('Successfully added');

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      location: data?.location || '',
      type: data?.type || '',
      description: data?.description || '',
      status: data?.active || false,
      department: data?.department || '',
      experience: data?.experience || ''
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
        title: values.title,
        link: values.link,
        description: values.description,
        image: values.image,
        active: values.status
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
        title: values.title,
        location: values.link,
        type: values.description,
        description: values.image,
        department: values.image,
        experience: values.image,
        active: values.status
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
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.title}
                          variant="outlined"
                          name="title"
                          label="Title"
                          fullWidth
                          helperText={
                            formik.errors.title &&
                            formik.touched.title &&
                            formik.errors.title
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.department}
                          variant="outlined"
                          name="department"
                          label="Department"
                          fullWidth
                          helperText={
                            formik.errors.department &&
                            formik.touched.department &&
                            formik.errors.department
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          value={formik.values.experience}
                          variant="outlined"
                          name="experience"
                          label="Experience"
                          fullWidth
                          helperText={
                            formik.errors.experience &&
                            formik.touched.experience &&
                            formik.errors.experience
                          }
                          onChange={formik.handleChange}
                        />
                      </Grid>

                      <Grid item md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="type-label">Type</InputLabel>
                          <Select
                            labelId="type-label"
                            id="type"
                            value={formik.values.type}
                            label="Type"
                            name="type"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value="Full Time">Full-time</MenuItem>
                            <MenuItem value="Part Time">Part-time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                            <MenuItem value="Freelancer">Freelancer</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="location-label">Location</InputLabel>
                          <Select
                            labelId="location-label"
                            id="location"
                            value={formik.values.location}
                            label="Location"
                            name="location"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value="Full Time">Remote</MenuItem>
                            <MenuItem value="Part Time">On-site</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item md={6}>
                        <FormControl fullWidth>
                          <InputLabel id="status-label">Status</InputLabel>
                          <Select
                            labelId="status-label"
                            id="status"
                            value={formik.values.status}
                            label="Status"
                            name="status"
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Disabled</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={12} style={{ height: '500px' }}>
                        <InputLabel id="status-label">Description</InputLabel>
                        <Editor
                          initialValue={formik.values.description}
                          onEditorChange={(nextState) =>
                            formik.setFieldValue('description', nextState)
                          }
                        />
                      </Grid>
                    </Grid>
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
