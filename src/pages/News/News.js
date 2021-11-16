import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/news/Results';
import Toolbar from 'src/components/news/Toolbar';
import { useQuery } from 'react-query';
import { getNews } from 'src/requests';

const Brands = () => {
  const { data, loading, error, refetch } = useQuery('getNews', getNews);
  const [search, setSearch] = useState('');

  const getData = () => {
    if (!data) return [];
    if (!search) return data.data.data;
    return data.data.data.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      <Helmet>
        <title>News | Metric Gaming Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Toolbar onChange={(e) => setSearch(e.target.value)} />
          <Box sx={{ pt: 3 }}>
            {data && <Results refetchData={refetch} data={getData()} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Brands;
