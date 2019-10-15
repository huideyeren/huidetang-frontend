import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const dateformat = require(`dateformat`);

const HomePage = ({ data }) => {
  const page = data.allWagtailData.pages.home.homePage[0];
  const articles = data.allWagtailData.pages.articles.articlePage;

  const renderPageList = (pages, title) => {
    if (!pages || pages.length === 0) {
      return;
    }

    let titleHeading;

    if (title) {
      titleHeading = <h2>{title}</h2>;
    }

    return <>
      {titleHeading}
      <h3>記事へのリンク</h3>
      <ul>
        {articles.map(article => {
          const createdAt = Date.parse(article.date);
          const year = dateformat(createdAt, `yyyy`);
          const month = dateformat(createdAt, `MM`);
          const day = dateformat(createdAt, `dd`);
          const url = `/${year}/${month}/${day}/${article.slug}/`;
          return (
            <li key={article.id}>
              <Link to={url}>{article.title}</Link>
            </li>
          );
        })}
      </ul>
      <h3>子ページへのリンク</h3>
      <ul>
        {pages.map(page => {
          if (page.pageType !== 'articles.ArticlePage') {
            return (
              <li key={page.id}>
                <Link to={page.url}>{page.title}</Link>
              </li>
            );
          }
        })}
      </ul>
    </>;
  };

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <h1>{page.title}</h1>
    <p>Page statically generated with data provided from Wagtail CMS.</p>
    <a href="https://wagtail.io">
      <img src={require('../images/wagtail.svg')} style={{ width: '50%' }} />
    </a>
    {renderPageList(page.children, 'See')}
  </Layout>;
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query($pageID: ID) {
    allWagtailData {
      pages {
        home {
          homePage(id: $pageID) {
            id
            title
            seoTitle
            seoDescription
            children {
              id
              title
              url
              pageType
            }
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
`;

export default HomePage;
