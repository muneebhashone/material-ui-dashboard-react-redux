import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/news/Results';
import Toolbar from 'src/components/news/Toolbar';
import { useQuery } from 'react-query';
import { getNews } from 'src/requests';

const Brands = () => {
  const { data, loading, error, refetch } = useQuery('getNews', getNews);

  return (
    <>
      <Helmet>
        <title>News | Material Kit</title>
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
            {data && <Results refetchData={refetch} data={data.data.data} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Brands;
