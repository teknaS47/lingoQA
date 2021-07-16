import { Route, Switch, BrowserRouter } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import { PageHeader, Page } from "@patternfly/react-core";
import React from "react";
import Products from "./Screens/Products";
import Versions from "./Screens/Versions";

export default function PageLayoutSimpleNav() {
  const logoProps = {
    href: "https://github.com/lingostack",
    target: "_blank",
  };

  const Header = (
    <PageHeader logo={"LingoQA Dashboard"} logoProps={logoProps} />
  );

  return (
    <Page header={Header}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route path="/products/:productid/screenshots" component={Versions} />
        </Switch>
      </BrowserRouter>
    </Page>
  );
}
