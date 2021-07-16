import React from "react";
// import { Link } from "react-router-dom";
// import { AngleRightIcon } from '@patternfly/react-icons'
// import AngleRightIcon from "@patternfly/react-icons/dist/js/icons/angle-right-icon";
import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

export default function Breadcrumbs() {
  return (
    <nav className="pf-c-breadcrumb" aria-label="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/"> Products </BreadcrumbItem>
          <BreadcrumbItem isActive   > Versions </BreadcrumbItem>
        </Breadcrumb>
    </nav>
  );
}
