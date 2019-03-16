import React from "react";
import { Link } from "gatsby";

import "./styles.scss";
import logo from './logo.png';

export const HeaderTemplate = ({ data }) => (
  <header className="header">
    <div className="header-inner">
      <div className="header-bottom container">
        <Link to="/">
          <img src={logo} alt="Kogut Architects LLC."></img>
        </Link>
      </div>
    </div>
  </header>
);

const Header = props => {
  if (!props.data) {
    return null;
  }
  const data = props.data.edges[0].node.frontmatter;
  return <HeaderTemplate data={data} />;
};

export { Header };
