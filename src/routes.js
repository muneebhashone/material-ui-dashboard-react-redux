import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import Brands from './pages/Brands/Brands';
import BrandsEdit from './pages/Brands/Edit';
import BrandsAdd from './pages/Brands/Add';
import Videos from './pages/Videos/Videos';
import VideosEdit from './pages/Videos/Edit';
import VideosAdd from './pages/Videos/Add';
import Social from './pages/Social/Social';
import SocialAdd from './pages/Social/Add';
import SocialEdit from './pages/Social/Edit';
import News from './pages/News/News';
import NewsAdd from './pages/News/Add';
import NewsEdit from './pages/News/Edit';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'brands/edit/:id', element: <BrandsEdit /> },
      { path: 'brands/add', element: <BrandsAdd /> },
      { path: 'brands', element: <Brands /> },
      { path: 'news/edit/:id', element: <NewsEdit /> },
      { path: 'news/add', element: <NewsAdd /> },
      { path: 'news', element: <News /> },
      { path: 'videos/edit/:id', element: <VideosEdit /> },
      { path: 'videos/add', element: <VideosAdd /> },
      { path: 'videos', element: <Videos /> },
      { path: 'social/edit/:id', element: <SocialEdit /> },
      { path: 'social/add', element: <SocialAdd /> },
      { path: 'social', element: <Social /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
