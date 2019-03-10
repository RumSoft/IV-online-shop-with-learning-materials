import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/login",
    component: LoginPage
  }
  // {
  //   path: "/protected",
  //   component: () =>
  //     fakeAuth.isAuthenticated ? (
  //       <Protected />
  //     ) : (
  //       <Redirect to={{ pathname: "/login", state: { from: "/protected" } }} />
  //     )
  // }
];
