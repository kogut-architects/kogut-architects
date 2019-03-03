import React from 'react'
import Layout from '../../components/Layout'
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

export const ThanksPageTemplate = props => (
  <section className="section">
    <div className="container">
      <div className="content">
        <h1>Thank you!</h1>
        <p>This is a custom thank you page for form submissions</p>
      </div>
    </div>
  </section>
)

const ThanksPage = ({ data }) => {
  console.log({data});
  const { footerData, headerData } = data;

  return (
    <Layout footerData={footerData} headerData={headerData}>
      <ThanksPageTemplate page={{ bodyIsMarkdown: false }} />
    </Layout>
  );
};

ThanksPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ThanksPage;

export const thanksPageQuery = graphql`
  query ThanksPageQuery {
    ...LayoutFragment
  }
`;