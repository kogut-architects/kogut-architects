module.exports = {
  siteMetadata: {
    title: "Gatsby + Netlify CMS Starter",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // {
    //   resolve: `gatsby-plugin-favicon`,
    //   options: {
    //     logo: "./src/img/favicon.png",
    //     appName: "Kogut Architects",
    //   },
    // },
    /*{
      resolve: `gatsby-source-wordpress`,
      options: {
        // your wordpress source
        baseUrl: `kogut-architects.com`,
        protocol: `http`,
        // is it hosted on wordpress.com, or self-hosted?
        hostingWPCOM: false,
        // does your site use the Advanced Custom Fields Plugin?
        useACF: false,
        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will be allowed
          // to access endpoints that are protected with .htaccess.
          htaccess_user: "kogutadmin",
          htaccess_pass: "PP9l0GNIhqPWHCOIfrzT9ODU",
          htaccess_sendImmediately: false,
        }
      },
    },*/
    // "gatsby-plugin-netlify-identity-widget",
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
