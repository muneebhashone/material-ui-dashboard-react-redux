import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import Toolbar from 'src/components/videos/Toolbar';
import Form from 'src/components/videos/Form';

const VideosAdd = () => {
  return (
    <>
      <Helmet>
        <title>Brands | Metric Gaming</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Toolbar />
          <Box sx={{ pt: 3 }}>
            <Form />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VideosAdd;
