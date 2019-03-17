const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              portfolioTypes {
                name 
                jobs {
                  name
                  location
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    // Filter out the footer, header, and meetups so we don't create pages for those
    const postOrPage = result.data.allMarkdownRemark.edges.filter(edge => {
      if (edge.node.frontmatter.templateKey === "header") {
        return false;
      } else if (edge.node.frontmatter.templateKey === "footer") {
        return false;
      } else {
        return true;
      }
    });

    postOrPage.forEach(edge => {
      let component, pathName;
       if (edge.node.frontmatter.templateKey === "home-page") {
         pathName = "/";
         component = path.resolve(`src/pages/index.js`);
       }
       else if (edge.node.frontmatter.templateKey === "portfolio-page") {
        // create main portfolio page
         const id = edge.node.id;
         pathName = edge.node.frontmatter.path || edge.node.fields.slug;
         component = path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`);
         createPage({
           path: pathName,
           component,
           // additional data can be passed via context
           context: {
             id,
           },
         });
        // create a page for each portfolioType
         edge.node.frontmatter.portfolioTypes.forEach(type => {
           const typeName = type.name.replace(/\s/g, '-').toLowerCase();
           pathName = `${edge.node.frontmatter.path || edge.node.fields.slug}${typeName}/`;
           component = path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`);
           createPage({
             path: pathName,
             component,
             // additional data can be passed via context
             context: {
               id,
               typeName: type.name,
             },
            });
            // now for every job create a page
            type.jobs.forEach(job => {
              const jobName = job.name.replace(/\s/g, '-').toLowerCase();
              pathName = `${edge.node.frontmatter.path || edge.node.fields.slug}${typeName}/${jobName}/`;
              component = path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`);
              const context = {
                id,
                typeName: type.name,
                jobName: job.name,
                jobLocation: job.location,
              }
              createPage({
                path: pathName,
                component,
                // additional data can be passed via context
                context,
              });
            });
         });
      }
       else {
        pathName = edge.node.frontmatter.path || edge.node.fields.slug;
        component = path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.js`);
        const id = edge.node.id;
        createPage({
          path: pathName,
          component,
          // additional data can be passed via context
          context: {
            id,
          },
        });
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
