import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FigureCaption from 'react-bootstrap/FigureCaption';

import Layout from "../components/Layout";
import "../styles/portfolio-page.scss";
import ImageGallery from "../components/ImageGallery";

export class PortfolioPageTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      openPortfolioType: '',
      selectedPortfolioType: '',
      selectedJob: {
        imageGallery: []
      } 
    }

    this.selectedJob = { name: '' };
  }

  render() {
    const { page, context, location } = this.props;
    const selectedPortfolio = page.frontmatter.portfolioTypes.find((type) => {
      return type.name === context.typeName;
    });
    
    if (selectedPortfolio && context.jobName) {
      this.selectedJob = selectedPortfolio.jobs.find((job) => {
        return job.name === context.jobName;
      });
    }
    // if we don't have a selected job, i.e. maybe clicked portfolio type, then see if there is state in history
    else if (location.state && location.state.selectedJob) {
      this.selectedJob = location.state.selectedJob;
    }
    /*const isActive = ({ isCurrent, location }) => {
      if (isCurrent) {
        console.log(location);
      }
    }*/
    const imageGallery = this.selectedJob.imageGallery && this.selectedJob.imageGallery.length > 0 ? 
      <ImageGallery key={this.selectedJob.name} images={this.selectedJob.imageGallery} /> :
      <ImageGallery images={page.homeData.edges[0].node.frontmatter.imageGallery} />
    return (
      <Container className="portfolio">
        <Row>
          <Col md={3}>
            <dd className="portfolio-type">
              {page.frontmatter.portfolioTypes.map((portfolioType, index) => (
                <dl key={index} className="portfolio-list-item">
                  <dt>
                    <Link to={`/portfolio/${portfolioType.name.replace(/\s/g, '-').toLowerCase()}`} 
                          state={{ portfolioType, selectedJob: this.selectedJob }}>
                      {portfolioType.name}
                    </Link></dt>
                  <div></div>
                  {portfolioType.jobs.map((job, index) => (
                      <dd key={index} 
                      className={portfolioType.name === context.typeName ? 'portfolio-jobs open' : 'portfolio-jobs hidden'}>
                      <Link activeClassName="active" state={{ portfolioType, selectedJob: this.selectedJob }}
                        to={`/portfolio/${portfolioType.name.replace(/\s/g, '-').toLowerCase()}/${job.name.replace(/\s/g, '-').toLowerCase()}`}>{job.name}</Link>
                      </dd>
                    ))}
                </dl>
              ))}
            </dd>
          </Col>
          <Col className="image-gallery">
            <Container fluid="true">
              <Row>{imageGallery}</Row>
              <Row className="portfolio-job-location">
                <FigureCaption>{this.state.selectedJob.location}</FigureCaption>
              </Row>
            </Container>
          </Col>
        </Row>
        
      </Container>
    );
  }
};

const PortfolioPage = ({ data, pageContext, location }) => {
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
      <PortfolioPageTemplate location={location} context={pageContext} page={{ ...page, portfolioTypes: portfolioTypes, homeData: homeData, bodyIsMarkdown: false }} />
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
            location
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
