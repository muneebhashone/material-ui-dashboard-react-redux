import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Toolbar from 'src/components/brands/Toolbar';
import Form from 'src/components/brands/Form';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getSingleBrand } from 'src/requests';

const BrandsEdit = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(
    ['getSingleBrandQuery', params.id],
    ({ queryKey }) => getSingleBrand(queryKey[1])
  );

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
          <Box sx={{ pt: 3 }}>{data && <Form data={data.data.data} />}</Box>
        </Container>
      </Box>
    </>
  );
};

export default BrandsEdit;
