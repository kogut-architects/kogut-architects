import React from "react";

import "./styles.scss";
import CustomLink from "../CustomLink";
import logo from './logo.png';

export const HeaderTemplate = ({ data }) => (
  <header className="header">
    <div className="header-inner">
      <div className="header-bottom container">
        <a>
          <img src={logo}></img>
        </a>
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
