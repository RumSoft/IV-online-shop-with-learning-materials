import HomePage from './Pages/Home';
import { RegisterPage } from './Pages/Register';
import { LoginPage } from './Pages/Login';
import LogoutPage from './Pages/Logout';
import { UserPage } from './Pages/UserPage';

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
  }
];

export default {
  routes: routes,
  protectedRoutes: protectedRoutes
};
