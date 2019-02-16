import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/about-page.scss";

export const PortfolioPageTemplate = props => {
  const { page } = props;

  return (
    <div className="portfolio">
      <ul className="portfolio-type">
            {page.portfolioTypes.edges.map((edge, index) => (
              <li key={index} className="portfolio-list-item">
                {edge.node.frontmatter.title}
                <ul key={index} className="job-list-item">
                  {edge.node.frontmatter.jobs.map((job, index) => (
                    <li key={index}>{job.jobName}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
    </div>
  );
};

const PortfolioPage = ({ data }) => {
  const { markdownRemark: page, footerData, headerData, portfolioTypes } = data;
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
      <PortfolioPageTemplate page={{ ...page, portfolioTypes: portfolioTypes, bodyIsMarkdown: false }} />
    </Layout>
  );
};

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioPage;

export const porfolioPageQuery = graphql`
  query PortfolioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title 
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
