import React from "react";
import PropTypes from "prop-types";
import { PortfolioPageTemplate } from "../../templates/portfolio-page";

const PortfolioPagePreview = ({ entry, widgetFor }) => ( 
  <PortfolioPageTemplate page = {{
      frontmatter: entry.getIn(["data"]).toJS(),
      homeData: {edges: [{node: {frontmatter: {imageGallery: []}}}]},
      html: entry.getIn(["data", "body"]),
      bodyIsMarkdown: true,
    }}
  />
);

PortfolioPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default PortfolioPagePreview;
