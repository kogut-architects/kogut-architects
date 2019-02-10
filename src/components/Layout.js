import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import "../styles";
//import { Navbar } from "../components/Navbar";
import { Header } from '../components/Header'
import { Footer } from "../components/Footer";

const TemplateWrapper = ({ footerData = null, navbarData = null, children }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <meta name="robots" content="noindex"></meta>
      <meta name="keywords" content="" /> 
    </Helmet>
    <Header data={navbarData} />
    <main>{children}</main>
    <Footer data={footerData} />
  </div>
);

export const query = graphql`
  fragment LayoutFragment on Query {
    footerData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "footer" } } }) {
      edges {
        node {
          id
          frontmatter {
            menuItems {
              label
              linkType
              linkURL
            }
          }
        }
      }
    }
    navbarData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "navbar" } } }) {
      edges {
        node {
          id
          frontmatter {
            menuItems {
              label
              linkType
              linkURL
            }
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
