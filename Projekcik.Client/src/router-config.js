import HomePage from './Pages/Home';
import ValuesPage from './Pages/Values';
import RegisterPage from './Pages/Register';
import LoginPage from './Pages/Login';


export default [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  // {
  //   path: "/protected",
  //   component: () =>
  //     fakeAuth.isAuthenticated ? (
  //       <Protected />
  //     ) : (
  //       <Redirect to={{ pathname: "/login", state: { from: "/protected" } }} />
  //     )
  // },
  {
    path: '/test',
    component: ValuesPage
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
