import HomePage from './Pages/Home';
import { RegisterPage } from './Pages/Register';
import LogoutPage from './Pages/Logout';
import { UserPage } from './Pages/UserPage';
import UserPage2 from './Pages/UserPage2';
import LoginPage from './Pages/Login';
import RodoPage from './Pages/Rodo';
import UploadPage from './Pages/Upload';
import SearchPage from './Pages/Search';
import NotePage from './Pages/Note';
import CartPage from './Pages/Cart';
import OrderDetails from './Pages/OrderDetails';
import OrderNotes from './Pages/OrderNote';

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
    path: '/search',
    component: SearchPage
  },
  {
    path: '/note/:id',
    component: NotePage
  },
  {
    path: '/User/:id',
    component: UserPage2
  },
  {
    path: '/cart',
    component: CartPage
  }
];

const protectedRoutes = [
  {
    path: '/logout',
    component: LogoutPage
  },
  {
    path: '/userpanel',
    component: UserPage,
    exact: true
  },
  {
    path: '/upload',
    component: UploadPage
  },
  {
    path: '/order-details/:id',
    component: OrderDetails
  },
  {
    path: '/order-notes/',
    component: OrderNotes
  }
];

export default {
  routes: routes,
  protectedRoutes: protectedRoutes
};
