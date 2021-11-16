import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SettingsComponent from '../components/settings/SettingsComponent';
import SettingsPassword from '../components/settings/SettingsPassword';
import { getSettings } from 'src/requests';
import { useQuery } from 'react-query';

const SettingsView = () => {
  const { data, loading, error } = useQuery('getSettings', getSettings);

  return (
    <>
      <Helmet>
        <title>Settings | Metric Gaming Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {data && <SettingsComponent data={data.data.data} />}
        </Container>
      </Box>
    </>
  );
};

export default SettingsView;
