import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import uploadToCloudinary from 'src/utils/uploadToCloudinary';
import { updateSettings } from 'src/requests';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const SettingsComponent = ({ data }) => {
  const notifyUpdated = () => toast('Settings updated');

  const updateSettingsMutation = useMutation((updatedData) =>
    updateSettings(updatedData)
  );

  const formik = useFormik({
    initialValues: {
      logo: data.logoSrc || '',
      logoDark: data.logoDark || '',
      email: data.email || '',
      phone: data.phoneNumber || '',
      address: data.address || '',
      address_two: data.address_two || ''
    },
    onSubmit: (values) => {
      handleSubmitSettings(values);
    }
  });

  const handleSubmitSettings = (values) => {
    updateSettingsMutation.mutate(
      {
        email: values.email,
        logoSrc: values.logo,
        logoDark: values.logoDark,
        phoneNumber: values.phone,
        address: values.address,
        address_two: values.address_two
      },
      {
        onSuccess: () => {
          notifyUpdated();
        },
        onError: (err) => console.log(err)
      }
    );
  };

  const handleImage = async (image, variant) => {
    if (!image) return;
    try {
      // const imgBase64 = await getBase64(image);
      const imgUrl = await uploadToCloudinary(image);
      console.log(imgUrl);
      variant === 'light'
        ? formik.setFieldValue('logo', imgUrl)
        : formik.setFieldValue('logoDark', imgUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Manage the settings" title="Settings" />
        <Divider />
        <CardContent sx={{ px: 10 }}>
          <Grid container spacing={4}>
            <Grid
              item
              md={6}
              textAlign="center"
              display="flex"
              gap={4}
              flexDirection="column"
            >
              <img
                height={60}
                style={{ objectFit: 'contain' }}
                src={formik.values.logo}
              />
              <input
                accept="image/*"
                onChange={(event) =>
                  handleImage(event.target.files[0], 'light')
                }
                style={{ display: 'none' }}
                id="upload-logo-light"
                type="file"
              />
              <label style={{ display: 'block' }} htmlFor="upload-logo-light">
                <Button
                  fullWidth
                  variant="contained"
                  style={{ borderRadius: '6px' }}
                  component="span"
                >
                  Update Logo (Light)
                </Button>
              </label>
            </Grid>
            <Grid item md={6} display="flex" gap={4} flexDirection="column">
              <img
                height={60}
                style={{ objectFit: 'contain' }}
                src={formik.values.logoDark}
              />
              <input
                accept="image/*"
                onChange={(event) => handleImage(event.target.files[0])}
                style={{ display: 'none' }}
                id="upload-logo-dark"
                type="file"
              />
              <label style={{ display: 'block' }} htmlFor="upload-logo-dark">
                <Button
                  fullWidth
                  variant="contained"
                  style={{ borderRadius: '6px' }}
                  component="span"
                >
                  Update Logo (Dark)
                </Button>
              </label>
            </Grid>

            <Grid item md={6}>
              <TextField
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                label="Email"
                fullWidth
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                label="Phone"
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                label="Address 1"
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                name="address_two"
                value={formik.values.address_two}
                onChange={formik.handleChange}
                label="Address 2"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" type="submit" variant="contained">
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsComponent;
