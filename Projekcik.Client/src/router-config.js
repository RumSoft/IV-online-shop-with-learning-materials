import HomePage from './Pages/Home';
import ValuesPage from './Pages/Values';

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
  }
];
