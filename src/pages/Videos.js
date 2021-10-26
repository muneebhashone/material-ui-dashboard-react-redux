import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from '../components/videos/Results';
import Toolbar from '../components/videos/Toolbar';
import { useQuery } from 'react-query';
import { getVideos } from 'src/requests';

const Brands = () => {
  const { data, loading, error } = useQuery('getVideos', getVideos);

  return (
    <>
      <Helmet>
        <title>Videos | Material Kit</title>
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
          <Box sx={{ pt: 3 }}>{data && <Results data={data.data.data} />}</Box>
        </Container>
      </Box>
    </>
  );
};

export default Brands;
