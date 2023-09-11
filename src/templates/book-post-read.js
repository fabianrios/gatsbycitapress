import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"

const BookPostReadTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
  intl
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
  const image = getImage(post.frontmatter.post_image);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout location={location} title={siteTitle}>
      <div className="progress-bar" style={{width: `${scrollPosition / (document.body.scrollHeight - window.innerHeight) * 100}%`}}></div>
      {/* <span className="progress-bar-text">{Math.round(scrollPosition / (document.body.scrollHeight - window.innerHeight) * 100)}%</span>  */}

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="post-header">
          <GatsbyImage image={image} alt={post.frontmatter.title} />
        </header>
        <div className="info">
          <h1 className="bluu" itemProp="headline">{post.frontmatter.title}</h1>
          <h2 className="bluu" itemProp="headline">{post.frontmatter.author}</h2>
        </div>{/* /info */}
        <div
          className="table-content"
          dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          itemProp="contentTable"
        />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          footer part
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default injectIntl(BookPostReadTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      timeToRead
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        description
        post_image {
          childImageSharp {
            gatsbyImageData(width: 380)
          }
        }
        lang
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
