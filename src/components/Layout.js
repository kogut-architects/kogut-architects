import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Container from 'react-bootstrap/Container';

import "../styles";
//import { Navbar } from "../components/Navbar";
import { Header } from '../components/Header'
import { Footer } from "../components/Footer";

const TemplateWrapper = ({ footerData = null, headerData = null, children }) => (
  <div>
    <Helmet>
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1"/> 
      <meta name="keywords" content="" /> 
    </Helmet>
    <Header data={headerData} />
    <main className="main-content">
      <Container fluid={true}>{children}</Container>
    </main>
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
    headerData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "header" } } }) {
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
    homeData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          id
          frontmatter {
            imageGallery
          }
        }
      }
    }
    portfolioTypes: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "portfolio-page"}}}) {
      edges {
        node {
          id
          frontmatter {
            title
            templateKey
            portfolioTypes {
              name
              jobs {
                name
                location
              }
            }
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
