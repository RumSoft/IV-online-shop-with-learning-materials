import HomePage from './Pages/Home';
import { RegisterPage } from './Pages/Register';
import LogoutPage from './Pages/Logout';
import { UserPage } from './Pages/UserPage';
import LoginPage from './Pages/Login';
import RodoPage from './Pages/Rodo';
import UploadPage from './Pages/Upload';
import NotePage from './Pages/Note';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/rodo',
    component: RodoPage
  },
  {
    path: '/note/:id',
    component: NotePage
  }
];

const protectedRoutes = [
  {
    path: '/logout',
    component: LogoutPage
  },
  {
    path: '/protected',
    component: UserPage,
    exact: true
  },
  {
    path: '/upload',
    component: UploadPage
  }
];

export default {
  routes: routes,
  protectedRoutes: protectedRoutes
};
