import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const ArticlePage = ({ data }) => {
  const page = data.wagtail.pages.articles.articlePage[0];

  const renderPageList = (pages, title, author) => {
    if (!pages || pages.length === 0) {
      return;
    }

    let titleHeading;

    if (title) {
      titleHeading = <h2>{title}</h2>;
    }

    return <>
      {titleHeading}
      <ul>
        {pages.map(page => <li key={page.id}>
          <Link to={page.url}>{page.title}</Link>
        </li>)}
      </ul>
    </>;
  };

  return <Layout>
    <SEO title={page.seoTitle} description={page.seoDescription} />
    <h1>{page.title}</h1>
    <p>{page.author != null ? 'Posted by ' + page.author.name + '.' : 'Posted anonymously.'}</p>
    <p>Published at {page.date}</p>
    {renderPageList([page.parent].filter(x => x), 'Parent')}
    {renderPageList(page.ancestors, 'Ancestors')}
    {renderPageList(page.children, 'Children')}
    {renderPageList(page.previousSiblings, 'Previous siblings')}
    {renderPageList(page.nextSiblings, 'Next siblings')}
    {renderPageList(page.descendants, 'Descendants')}
  </Layout>;
};

ArticlePage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query ($pageID: ID) {
    wagtail {
      pages {
        articles {
          articlePage(id: $pageID) {
            id
            title
            body
            date
            author {
              id
              name
              portrait {
                id
                title
              }
            }
            seoTitle
            seoDescription
            parent {
              title
              id
              url
            }
            children {
              title
              id
              url
            }
            previousSiblings(limit: 1) {
              title
              id
              url
            }
            nextSiblings(limit: 1) {
              title
              id
              url
            }
          }
        }
      }
    }
  }
`;

export default ArticlePage;