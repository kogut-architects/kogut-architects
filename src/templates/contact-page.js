import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import "../styles/contact-page.scss";
import Layout from "../components/Layout";

export const ContactPageTemplate = props => {
  const { page } = props;
  return (
    <Container className="contact">
      <Row>
        <Col>
          <Form name="contact" method="POST" netlify data-netlify-recaptcha="true">
            <Form.Group controlId="name">
              <Form.Control name="name" placeholder="Your Name" required />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control name="email" type="email" placeholder="Your Email" required />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Control name="subject" placeholder="Subject" />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Control name="message" as="textarea" rows="3" placeholder="Message"  required />
            </Form.Group>
            <Button variant="dark" type="submit">
              Send
            </Button>
          </Form>
        </Col>
        <Col>
          <Row>
            <h2>Address:</h2>
            <Row>
              <ReactMarkdown source={page.frontmatter.address} />
            </Row>
            
          </Row>
          
        </Col>
      </Row>
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
