import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from '../components/brands/Results';
import Toolbar from '../components/brands/Toolbar';
import { useQuery } from 'react-query';
import { getBrands } from 'src/requests';

const Brands = () => {
  const { data, loading, error } = useQuery('getBrands', getBrands);

  return (
    <>
      <Helmet>
        <title>Brands | Material Kit</title>
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
