import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';

const SettingsComponent = ({ data }) => {
  console.log(data);
  return (
    <form>
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container>
            <Grid item md={6}></Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsComponent;
