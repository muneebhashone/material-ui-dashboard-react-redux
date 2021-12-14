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
import { updateJob, addJob } from 'src/requests';
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
  description: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  experience: Yup.string().required('Required')
});

const Form = ({ data }) => {
  const updateMutation = useMutation((data) => updateJob(data));
  const addMutation = useMutation((data) => addJob(data));

  const [editor, setEditor] = useState('');

  const handleEditorChange = (content, delta, source, editor) => {
    setEditor(content);
    console.log('content', content);
  };

  const params = useParams();

  const notifyEdit = () => toast('Successfully updated');
  const notifyAdd = () => toast('Successfully added');

  const formik = useFormik({
    initialValues: {
      title: data?.title || '',
      description: editor,
      location: data?.location || '',
      type: data?.type || 'Full Time',
      status: data?.active || false,
      department: data?.department || '',
      experience: data?.experience || ''
    },
    onSubmit: (values) => {
      console.log(values);
      if (!params.id) {
        handleAddSubmit(values);
        return;
      }

      handleEditSubmit(values);
    }
  });

  const handleEditSubmit = (values) => {
    updateMutation.mutate(
      {
        id: params.id,
        title: values.title,
        location: values.location,
        type: values.type,
        description: values.description,
        department: values.department,
        experience: values.experience,
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
        location: values.location,
        type: values.type,
        description: values.description,
        department: values.department,
        experience: values.experience,
        active: values.status
      },
      {
        onSuccess: (data) => {
          notifyAdd();
          formik.resetForm();
          setEditor('');
          console.log(data);
        },
        onError: (err) => console.log(err)
      }
    );
  };

  useEffect(() => {
    if (data?.description) {
      setEditor(data.description);
    }
  }, [data]);

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
                            <MenuItem value="Remote">Remote</MenuItem>
                            <MenuItem value="On-site">On-site</MenuItem>
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
                        <Editor value={editor} onChange={handleEditorChange} />
                      </Grid>
                    </Grid>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap="15px"
                      justifyContent="flex-end"
                      style={{ marginTop: '20px', textAlign: 'right' }}
                    >
                      <Button
                        style={{
                          padding: '15px',
                          borderRadius: '6px'
                        }}
                        onClick={formik.handleSubmit}
                        variant="contained"
                      >
                        {params.id ? 'Update Job' : 'Post Job'}
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
