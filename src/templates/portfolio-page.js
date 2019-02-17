import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Helmet from "react-helmet";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';

import Layout from "../components/Layout";
import HTMLContent from "../components/Content";
import "../styles/portfolio-page.scss";


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
      <Container className="portfolio">
        <Row>
          <Col md={2}>
            <dd className="portfolio-type">
              {page.portfolioTypes.edges.map((edge, index) => (
                <dl key={index} className="portfolio-list-item">
                  <dt><a onClick={() => this.handlePortfolioTypeClick(edge.node.frontmatter.title)}>{edge.node.frontmatter.title}</a></dt>
                  <div></div>
                  {edge.node.frontmatter.jobs.map((job, index) => (
                      <dd key={index} className={this.state.selectedPortfolioType === edge.node.frontmatter.title ? 'portfolio-jobs open' : 'portfolio-jobs hidden'}>{job.jobName}</dd>
                    ))}
                  
                </dl>
              ))}
            </dd>
          </Col>
          <Col>
            <Container fluid="true">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=First slide&bg=373940"
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Second slide&bg=282c34"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=20232a"
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Container>
          </Col>
        </Row>
        
      </Container>
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
