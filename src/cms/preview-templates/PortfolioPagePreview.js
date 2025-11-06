import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioPagePreviewTemplate } from '../../templates/portfolio-page-preview'

const PortfolioPagePreview = ({ entry, widgetFor }) => (
  <PortfolioPagePreviewTemplate
    page={{
      frontmatter: entry.getIn(['data']).toJS(),
      homeData: { edges: [{ node: { frontmatter: { imageGallery: [] } } }] },
      html: entry.getIn(['data', 'body']),
      bodyIsMarkdown: true,
    }}
  />
)

PortfolioPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PortfolioPagePreview
