import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import { useMutation } from 'react-query';
import { login as LOGIN } from 'src/requests';
import { useAuth } from 'src/Context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuth();
  const login = useMutation((data) => LOGIN(data));
  const notifyError = (message) => toast(message);

  const handleLoginUserSubmit = (values) => {
    console.log(values);

    login.mutate(
      {
        email: values.email,
        password: values.password
      },
      {
        onSuccess: ({ data }) => {
          const token = data.token;
          setCurrentUser({ ...data.data.user, token });
          return true;
        },
        onError: (err) => notifyError('Invalid credentials')
      }
    );

    // setCurrentUser(data.login);

    // navigate(URL + '/app/brands');
  };

  useEffect(() => {
    if (currentUser || localStorage.getItem('currentUser')) {
      navigate(URL + '/app/brands');
    }
  }, [currentUser]);

  if (currentUser || localStorage.getItem('currentUser')) {
    navigate(URL + '/app/brands');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Login | Metric Gaming Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              handleLoginUserSubmit(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
