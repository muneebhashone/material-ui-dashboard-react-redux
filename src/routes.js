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
import Jobs from './pages/Jobs/Jobs';
import JobApplications from './pages/Jobs/JobApplications';
import JobAdd from './pages/Jobs/Add';
import JobEdit from './pages/Jobs/Edit';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import { URL } from 'src/config';

const routes = [
  {
    path: `${URL}/app`,
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
      { path: 'jobs/edit/:id', element: <JobEdit /> },
      { path: 'jobs/add', element: <JobAdd /> },
      { path: 'applications/:id', element: <JobApplications /> },
      { path: 'applications', element: <JobApplications /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'contact', element: <Contact /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to={`${URL}/404`} /> }
    ]
  },
  {
    path: `${URL}`,
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: URL + '/', element: <Navigate to={`${URL}/login`} /> },
      { path: '*', element: <Navigate to={`${URL}/app/brands`} /> }
    ]
  }
];

export default routes;
