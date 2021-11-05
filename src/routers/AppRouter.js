import React, { useContext } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { LoginScreen } from "../components/login/LoginScreen";
// import { Navbar } from "../components/ui/Navbar";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

  const { user } = useContext(AuthContext)
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          
          {/* <Route exact path="/login" component={ LoginScreen } /> */}
          <PublicRoute exact path="/login" component={ LoginScreen } 
          isAuthenticated={user.logged}/>

          {/* <Route path="/" component={ DashboardRoutes } /> */}
          <PrivateRoute path="/" component={ DashboardRoutes } 
          isAuthenticated={user.logged}/>
        </Switch>
      </div>
    </Router>
  );
};
