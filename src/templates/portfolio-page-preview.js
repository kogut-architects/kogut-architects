import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FigureCaption from 'react-bootstrap/FigureCaption'

import Layout from '../components/Layout'
import '../styles/portfolio-page.scss'
import ImageGallery from '../components/ImageGallery'

export class PortfolioPagePreviewTemplate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
      openPortfolioType: '',
      selectedPortfolioType: '',
      selectedJob: {
        imageGallery: [],
      },
    }

    this.handlePortfolioTypeClick = this.handlePortfolioTypeClick.bind(this)
    this.handleJobNameClick = this.handleJobNameClick.bind(this)
  }

  handlePortfolioTypeClick(e, type) {
    //console.log('Portofolio Type:', type);
    const { selectedPortfolioType } = type
    const openPortfolioType = type !== this.state.openPortfolioType ? type : ''
    e.target.blur()
    this.setState({ selectedPortfolioType, openPortfolioType })
  }

  handleJobNameClick(e, job) {
    //console.log('Job Name:', job);
    e.target.blur()
    this.setState({ selectedJob: job })
  }

  render() {
    const { page } = this.props
    const imageGallery =
      this.state.selectedJob.imageGallery.length > 0 ? (
        <ImageGallery
          key={this.state.selectedJob.name}
          images={this.state.selectedJob.imageGallery}
        />
      ) : (
        <ImageGallery
          key={this.state.selectedJob.name}
          images={page.homeData.edges[0].node.frontmatter.imageGallery}
        />
      )
    return (
      <Container className="portfolio">
        <Row>
          <Col md={3}>
            <dd className="portfolio-type">
              {page.frontmatter.portfolioTypes.map((portfolioType, index) => (
                <dl key={index} className="portfolio-list-item">
                  <dt>
                    <button
                      onClick={(e) =>
                        this.handlePortfolioTypeClick(e, portfolioType.name)
                      }
                    >
                      {portfolioType.name}
                    </button>
                  </dt>
                  <div></div>
                  {portfolioType.jobs.map((job, index) => (
                    <dd
                      key={index}
                      className={
                        portfolioType.name === this.state.openPortfolioType
                          ? 'portfolio-jobs open'
                          : 'portfolio-jobs hidden'
                      }
                    >
                      <button
                        className={
                          this.state.selectedJob.name === job.name
                            ? 'portfolio-job-selected'
                            : ''
                        }
                        onClick={(e) => this.handleJobNameClick(e, job)}
                      >
                        {job.name}
                      </button>
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
    )
  }
}

const PortfolioPagePreview = ({ data }) => {
  const {
    markdownRemark: page,
    footerData,
    headerData,
    homeData,
    portfolioTypes,
  } = data
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page

  return (
    <Layout footerData={footerData} headerData={headerData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <PortfolioPagePreviewTemplate
        page={{
          ...page,
          portfolioTypes: portfolioTypes,
          homeData: homeData,
          bodyIsMarkdown: false,
        }}
      />
    </Layout>
  )
}

PortfolioPagePreview.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PortfolioPagePreview

export const portfolioPagePreviewQuery = graphql`
  query PortfolioPagePreview($id: String!) {
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
`
