import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Toolbar from 'src/components/news/Toolbar';
import Form from 'src/components/news/Form';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getSingleNews } from 'src/requests';

const NewsEdit = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(
    ['getSingleNewsQuery', params.id],
    ({ queryKey }) => getSingleNews(queryKey[1])
  );

  return (
    <>
      <Helmet>
        <title>News | Metric Gaming</title>
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
