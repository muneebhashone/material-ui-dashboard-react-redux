import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Brands from './pages/Brands/Brands';
import BrandsEdit from './pages/Brands/Edit';
import BrandsAdd from './pages/Brands/Add';
import Videos from './pages/Videos/Videos';
import VideosEdit from './pages/Videos/Edit';
import VideosAdd from './pages/Videos/Add';
import Social from './pages/Social';
import News from './pages/News';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'brands/edit/:id', element: <BrandsEdit /> },
      { path: 'brands/add', element: <BrandsAdd /> },
      { path: 'brands', element: <Brands /> },
      { path: 'news', element: <News /> },
      { path: 'videos/edit/:id', element: <VideosEdit /> },
      { path: 'videos/add', element: <VideosAdd /> },
      { path: 'videos', element: <Videos /> },
      { path: 'social', element: <Social /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
