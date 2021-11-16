import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/videos/Results';
import Toolbar from 'src/components/videos/Toolbar';
import { useQuery } from 'react-query';
import { getVideos } from 'src/requests';

const Brands = () => {
  const { data, loading, error, refetch } = useQuery('getVideos', getVideos);
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
        <title>Videos | Metric Gaming Dashboard</title>
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
