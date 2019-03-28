import HomePage from './Pages/Home';

export default [
  {
    path: '/',
    component: HomePage,
    exact: true
  }
  // {
  //   path: "/protected",
  //   component: () =>
  //     fakeAuth.isAuthenticated ? (
  //       <Protected />
  //     ) : (
  //       <Redirect to={{ pathname: "/login", state: { from: "/protected" } }} />
  //     )
  // },
];
