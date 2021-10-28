import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Toolbar from 'src/components/social/Toolbar';
import Form from 'src/components/social/Form';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getSingleSocial } from 'src/requests';

const NewsEdit = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(
    ['getSingleSocialQuery', params.id],
    ({ queryKey }) => getSingleSocial(queryKey[1])
  );

  return (
    <>
      <Helmet>
        <title>Social | Metric Gaming</title>
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

export default NewsEdit;
