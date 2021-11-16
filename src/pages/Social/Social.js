import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/social/Results';
import Toolbar from 'src/components/social/Toolbar';
import { useQuery } from 'react-query';
import { getSocial } from 'src/requests';

const Brands = () => {
  const { data, loading, error, refetch } = useQuery('getSocial', getSocial);
  const [search, setSearch] = useState('');

  const getData = () => {
    if (!data) return [];
    if (!search) return data.data.data;
    return data.data.data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      <Helmet>
        <title>Social Profiles | Metric Gaming Dashboard</title>
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
