import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageGallery from "../components/ImageGallery";
import Layout from "../components/Layout";
import "../styles/home.scss";

if (typeof process === "undefined") {
  window.process = {
    env: {},
    cwd: () => "", // Provide a dummy cwd function
    platform: "browser", // Indicate browser platform
  };
}

export const HomePageTemplate = ({ home }) => {
  return (
    <>
      <Container className="home-container">
        <Container fluid={true}>
          <ImageGallery images={home.imageGallery} />
        </Container>
      </Container>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, headerData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;

    return (
      <Layout footerData={footerData} headerData={headerData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
    ...LayoutFragment
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            imageGallery
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
