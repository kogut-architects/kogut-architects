import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/portfolio-page.scss";
import { renderComponent } from "recompose";

export class PortfolioPageTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedPortfolioType: '' }
    this.handlePortfolioTypeClick = this.handlePortfolioTypeClick.bind(this);
  }

  handlePortfolioTypeClick(type) {
    console.log(type);
    this.setState({
      selectedPortfolioType: type,
    });
  }

  render() {
    const { page } = this.props;

    return (
      <div className="portfolio">
        <dd className="portfolio-type">
          {page.portfolioTypes.edges.map((edge, index) => (
            <dl key={index} className="portfolio-list-item">
              <dt><div><a onClick={() => this.handlePortfolioTypeClick(edge.node.frontmatter.title)}>{edge.node.frontmatter.title}</a></div></dt>
              <div></div>
              {edge.node.frontmatter.jobs.map((job, index) => (
                  <dd key={index} className={this.state.selectedPortfolioType === edge.node.frontmatter.title ? 'portfolio-jobs open' : 'portfolio-jobs hidden'}>{job.jobName}</dd>
                ))}
              
            </dl>
          ))}
        </dd>
      </div>
    );
  }
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
