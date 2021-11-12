import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from './Logo';
import { URL } from 'src/config';

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to={`${URL}/app/brands`}>
        <Logo />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
