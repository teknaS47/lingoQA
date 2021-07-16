import React from "react";
import { Link } from 'react-router-dom';
import { AngleRightIcon } from '@patternfly/react-icons'

export default function Breadcrumbs() {
    return (
        <nav className="pf-c-breadcrumb" aria-label="breadcrumb">
            <ol className="pf-c-breadcrumb__list">
                <li className="pf-c-breadcrumb__item">
                    <Link to="/" className="pf-c-breadcrumb__link">Products</Link>
                    <span className="pf-c-breadcrumb__item-divider">
                        <AngleRightIcon />
                    </span>
                </li>
                <li className="pf-c-breadcrumb__item">
                    <span className="pf-c-breadcrumb__link pf-m-current" aria-current="page">
                        Versions
                    </span>
                </li>
            </ol>
        </nav>
    )
}
