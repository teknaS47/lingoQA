import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import {
  PageHeader,
  PageHeaderTools,
  Page,
  Button,
} from "@patternfly/react-core";
import React from "react";
import Products from "./Screens/Products";
import Versions from "./Screens/Versions";
import Login from "./Screens/Login";
import Admin from "./Screens/Admin";

import axios from "axios";
import BASE_URL from "./API/BASE_URL";

// import username from "./Screens/Login.js";

const tokenString = localStorage.getItem("token");
const adminTokenString = localStorage.getItem("adminToken");

let logoProps = "";

export default function PageLayoutSimpleNav() {
  if (tokenString) {
    logoProps = {
      href: "/",
      target: "_self",
    };
  } else {
    logoProps = {
      href: "/admin",
      target: "_self",
    };
  }

  const logoutButtonClicked = async (event) => {
    event.preventDefault();

    await axios.post(`${BASE_URL}/users/logout`, {
      name: localStorage.getItem("userName"),
      login_time: localStorage.getItem("loginTime"),
    });
    localStorage.clear();
    window.open("/login", "_self");
  };

  const headerTools = (
    <PageHeaderTools>
      <Button
        onClick={
          logoutButtonClicked
          // localStorage.clear();
          // window.open("/login", "_self");
        }
      >
        Logout
      </Button>
    </PageHeaderTools>
  );

  if (!!tokenString && !!adminTokenString) {
    return <Redirect to="/login" />;
  }
  return (
    <BrowserRouter>
      <Page
        header={
          <PageHeader
            style={{ zIndex: 100 }}
            logo={"LingoQA Dashboard"}
            logoProps={logoProps}
            headerTools={headerTools}
          />
        }
      >
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/products/:productid/screenshots" component={Versions} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </Page>
    </BrowserRouter>
  );
}
