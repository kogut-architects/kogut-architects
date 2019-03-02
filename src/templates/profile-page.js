import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/profile-page.scss";

export const ProfilePageTemplate = props => {
  const { page } = props;
  return (
    <Container className="profile">
      <Row className="profile-content">
        {page.frontmatter.employees.map((employee, index) => (
            <Col key={index}>
              <h2 className="profile-employee-name">{employee.name}</h2>
              {employee.info.detailType.map((detail) => (
                <Container className="profile-detail-type"> 
                  <Row><h3>{detail.title}</h3></Row>
                  <ReactMarkdown className="profile-details" source={detail.details} />
                </Container>
              ))}
            </Col>
        ))}
      </Row>
    </Container>
  );
};

const ProfilePage = ({ data }) => {
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
      <ProfilePageTemplate page={{ ...page, homeData: homeData, bodyIsMarkdown: false }} />
    </Layout>
  );
};

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfilePage;

export const profilePageQuery = graphql`
  query ProfilePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        employees {
          name
          info {
            detailType {
              details
              title
            }
          }
        }
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
