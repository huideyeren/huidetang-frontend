require('dotenv').config();

function getWagtailGraphQLEndpoint () {
  const url = process.env.WAGTAIL_GRAPHQL_ENDPOINT;
  if (!url) {
    throw new Error('You need to set WAGTAIL_GRAPHQL_ENDPOINT.');
  }
  return url;
}

module.exports = {
  siteMetadata: {
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'AllWagtailData',
        fieldName: 'allWagtailData',
        url: getWagtailGraphQLEndpoint()
      }
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Plugins configs
        plugins: [`gatsby-remark-smartypants`],
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true
      }
    }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
