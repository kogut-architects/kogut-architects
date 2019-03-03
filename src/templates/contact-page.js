import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import ReactMarkdown from "react-markdown";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { navigate } from 'gatsby-link'

import "../styles/contact-page.scss";
import Layout from "../components/Layout";

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export class ContactPageTemplate extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render () {
    const { page } = this.props;
    return (
      <Container className="contact">
        <h2>Contact the Firm:</h2>
        <Row>
          <Col>
            <Form name="contact" 
              method="POST" 
              action="/contact/thanks/"
              data-netlify-honeypot="bot-field"
              data-netlify="true" 
              onSubmit={this.handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <Form.Group controlId="name">
                <Form.Control name="name" placeholder="Your Name" required onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control name="email" type="email" placeholder="Your Email" required onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="subject">
                <Form.Control name="subject" placeholder="Subject" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="message">
                <Form.Control name="message" as="textarea" rows="3" placeholder="Message" required onChange={this.handleChange} />
              </Form.Group>
              <Button variant="dark" type="submit">
                Send
            </Button>
            </Form>
          </Col>
          <Col>
            <div className="contact-section">
              <div>
                <h2>Address:</h2>
              </div>
              <div className="contact-details">
                <ReactMarkdown source={page.frontmatter.address} />
              </div>
            </div>
            <div className="contact-section">
              <div>
                <h2>Phone:</h2>
              </div>
              <div className="contact-details">
                <ReactMarkdown source={page.frontmatter.phone} />
              </div>
            </div>
            <div className="contact-section">
              <div>
                <h2>E-Mail:</h2>
              </div>
              <div className="contact-details">
                <a href={`mailto:${page.frontmatter.email}`}>{page.frontmatter.email}</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
  
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
