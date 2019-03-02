import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from "../components/Layout";
import "../styles/portfolio-page.scss";
import ImageGallery from "../components/ImageGallery";


export class PortfolioPageTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      activeIndex: 0,
      selectedPortfolioType: '', 
      selectedJob: {
        imageGallery: []
      } 
    }
    this.handleCarouselItemSelect = this.handleCarouselItemSelect.bind(this);
    this.handlePortfolioTypeClick = this.handlePortfolioTypeClick.bind(this);
    this.handleJobNameClick = this.handleJobNameClick.bind(this);
  }

  handleCarouselItemSelect(index) {
    // zero-based
    this.setState({ activeIndex: index });    
  }
  handlePortfolioTypeClick(type) {
   //console.log('Portofolio Type:', type);
    this.setState({
      selectedPortfolioType: type,
    });
  }

  handleJobNameClick(job) {
    //console.log('Job Name:', job);
    this.setState({ activeIndex: 0, selectedJob: job});
  }

  render() {
    const { page } = this.props;
    const imageGallery = this.state.selectedJob.imageGallery.length > 0 ? 
      <ImageGallery images={this.state.selectedJob.imageGallery} /> :
      <ImageGallery images={page.homeData.edges[0].node.frontmatter.imageGallery} />
    return (
      <Container className="portfolio">
        <Row>
          <Col md={2}>
            <dd className="portfolio-type">
              {page.frontmatter.portfolioTypes.map((portfolioType, index) => (
                <dl key={index} className="portfolio-list-item">
                  <dt><a onClick={() => this.handlePortfolioTypeClick(portfolioType.name)}>{portfolioType.name}</a></dt>
                  <div></div>
                  {portfolioType.jobs.map((job, index) => (
                      <dd key={index} 
                        className={this.state.selectedPortfolioType === portfolioType.name ? 'portfolio-jobs open' : 'portfolio-jobs hidden'}>
                        <a className={this.state.selectedJob.name === job.name ? 'portfolio-job-selected' : ''} 
                          onClick={() => this.handleJobNameClick(job)}><span>{job.name}</span></a>
                      </dd>
                    ))}
                </dl>
              ))}
            </dd>
          </Col>
          <Col className="image-gallery">
            <Container fluid="true">
              {imageGallery}
            </Container>
          </Col>
        </Row>
        
      </Container>
    );
  }
};

const PortfolioPage = ({ data }) => {
  const { markdownRemark: page, footerData, headerData, homeData, portfolioTypes } = data;
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
      <PortfolioPageTemplate page={{ ...page, portfolioTypes: portfolioTypes, homeData: homeData, bodyIsMarkdown: false }} />
    </Layout>
  );
};

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PortfolioPage;

export const portfolioPageQuery = graphql`
  query PortfolioPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title 
        portfolioTypes {
          name 
          jobs {
            name
            imageGallery
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
