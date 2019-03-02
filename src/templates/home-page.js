import React from 'react';
import { graphql } from 'gatsby';
import Container from 'react-bootstrap/Container';

import ImageGallery from '../components/ImageGallery';

const Home = props => {
  const { page } = props;
  console.log({page});
  return(
    <Container fluid="true" className="home-container">
      <ImageGallery images={page.frontmatter.imageGallery} />
      <div>hello</div>
    </Container>
  )
} 

export default Home;

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        imageGallery
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