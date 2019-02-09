import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Carousel from 'nuka-carousel';

import Layout from "../components/Layout";
import "../styles/home.scss";

export const HomePageTemplate = ({ home }) => {
  
  return (
    <>
      <section className="main-content">
        <div className="header-container  container">
          <div className="header-image-carousel"> 
            <Carousel>
              <div>Slide 1</div>
              <img src="/img/annie-spratt-608001-unsplash.jpg"/>
              <div>Slide 3</div>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
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
    allMarkdownRemark(
      filter: { frontmatter: { presenters: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            presenters {
              name
              image
              text
              presentationTitle
            }
            location {
              mapsLatitude
              mapsLongitude
              mapsLink
              name
            }
          }
        }
      }
    }
    ...LayoutFragment
    homePageData: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "home-page" } } }) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
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
