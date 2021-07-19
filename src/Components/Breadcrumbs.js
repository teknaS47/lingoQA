import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

export default function Breadcrumbs() {
  return (
    <nav className="pf-c-breadcrumb" aria-label="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/"> Products </BreadcrumbItem>
        <BreadcrumbItem isActive> Versions </BreadcrumbItem>
      </Breadcrumb>
    </nav>
  );
}
