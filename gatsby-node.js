/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const dateformat = require(`dateformat`);

const PAGE_TYPES = {
  'home.HomePage': path.resolve('src', 'pages', 'home-page.js'),
  'articles.ArticlePage': path.resolve('src', 'pages', 'article-page.js')
};

function getComponentPathForType (pageType) {
  return PAGE_TYPES[pageType] || path.resolve('src', 'pages', 'base-page.js');
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allWagtailData {
        pages {
          wagtailcore {
            page {
              id
              url
              pageType
            }
          }
          articles {
            articlePage {
              id
              slug
              date
              pageType
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      throw errors;
    }
    data.allWagtailData.pages.articles.articlePage.forEach(({ id, slug, date, pageType }) => {
      const createdAt = Date.parse(date);
      const year = dateformat(createdAt, `yyyy`);
      const month = dateformat(createdAt, `MM`);
      const day = dateformat(createdAt, `dd`);
      createPage({
        path: `/${year}/${month}/${day}/${slug}/`,
        component: getComponentPathForType(pageType),
        context: {
          pageID: id
        }
      });
    });
    data.allWagtailData.pages.wagtailcore.page.forEach(({ url, id, pageType }) => {
      if (pageType !== 'articles.ArticlePage') {
        createPage({
          path: url,
          component: getComponentPathForType(pageType),
          context: {
            pageID: id
          }
        });
      }
    });
  });
};
