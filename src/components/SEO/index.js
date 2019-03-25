import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

export default function SEO(props) {
  const { path, title, description } = props;
  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
        itemscope: undefined
      }}
      title={title}
      link={[{ rel: 'canonical', href: path }]}
      meta={[
        { itemprop: 'name', content: title },
        { itemprop: 'description', content: description },
        { name: 'description', content: description },
        { name: 'og:title', content: title },
        { name: 'og:url', content: path },
        { name: 'og:description', content: description },
        { name: 'og:site_name', content: title },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description }
      ]}
    />
  );
}
SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};
