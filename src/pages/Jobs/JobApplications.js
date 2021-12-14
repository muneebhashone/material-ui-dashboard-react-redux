import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Results from 'src/components/jobs/ApplicationResults';
import Toolbar from 'src/components/jobs/Toolbar';
import { useQuery } from 'react-query';
import { getApplications } from 'src/requests';
import { useParams } from 'react-router';

const JobApplications = () => {
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(
    ['getApplications', params.id],
    ({ queryKey }) => getApplications(queryKey[1])
  );
  const [search, setSearch] = useState('');

  const getData = () => {
    if (!data) return [];
    if (!search) return data.data.data;
    return data.data.data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      <Helmet>
        <title>Job Applications | Metric Gaming Dashboard</title>
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
            {getData().length > 0 && (
              <Results refetchData={refetch} data={getData()} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default JobApplications;
