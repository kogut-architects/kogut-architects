import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Layout from "../components/Layout";

export const ContactPageTemplate = props => {
  const { page } = props;
  return (
    <Container className="contact">
      
    </Container>
  );
};

const ContactPage = ({ data }) => {
  const { markdownRemark: page, footerData, headerData, homeData } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout footerData={footerData} headerData={headerData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <ContactPageTemplate page={{ ...page, homeData: homeData, bodyIsMarkdown: false }} />
    </Layout>
  );
};

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        address
        phone
        email
        seo {
          browserTitle
          title
          description
        }
      }
    }
    ...LayoutFragment
  }
`;
