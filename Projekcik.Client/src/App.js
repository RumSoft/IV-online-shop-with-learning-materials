import React, { Component } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import routes from "./router-config";
import "./App.scss";
import NotFoundPage from "./pages/NotFound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                Home witam pozdrawiam
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">
                login
              </NavLink>
            </li>
            <li>
              <NavLink to="/something" activeClassName="active">
                something
              </NavLink>
            </li>
          </ul>

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
