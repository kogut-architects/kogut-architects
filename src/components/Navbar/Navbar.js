import React from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";
import logo from './logo.png';

export const NavbarTemplate = ({ data }) => (
  <nav className="navbar">
    <div className="container">
      <div className="navbar-container">
        <a>
          <img src={logo}></img>
        </a>
      </div>
    </div>
  </nav>
);

const Navbar = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <NavbarTemplate data={data} />;
};

export { Navbar };
