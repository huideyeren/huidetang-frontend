import React from 'react';
import PropTypes from 'prop-types';

const Markdown = ({ children }) => (
  <div
    className="markdown"
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

Markdown.propTypes = {
  children: PropTypes.node.isRequired
};

export default Markdown;
