import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UserProvider from 'src/Context/UserContext';

// axios.defaults.baseURL = 'http://178.79.129.18/api/v1';
axios.defaults.baseURL = 'http://localhost:9000/api/v1';
const queryClient = new QueryClient();

const App = () => {
  const content = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {content}
            <ToastContainer />
          </ThemeProvider>
        </UserProvider>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
};

export default App;
