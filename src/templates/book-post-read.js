import React, { useState, useEffect, useRef } from 'react';
import { graphql } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import TextConfiguration from '../components/textConfiguration/textConfiguration';

const BookPostReadTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
  intl
}) => {
  const isBrowser = typeof window !== "undefined"
  const siteTitle = site.siteMetadata?.title || `Title`;
  const image = getImage(post.frontmatter.post_image);
  const where = `${post.frontmatter.language_link}/read`;
  const postReference = useRef(null);

  const fontFamilies = {
    bluu: 'Bluu, serif',
    zilla: 'Zilla Slab, serif',
    garamond: 'EB Garamond'
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const [fontSize, setFontSize] = useState(19);
  const [lineHeight, setLineHeight] = useState(26);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [lineLength, setLineLength] = useState(90);

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  }
  
  const handleTextChange = (e) => {
    setFontSize(e); 
  }

  const handleLineChange = (e) => {
    setLineHeight(e); 
  }

  const handleSpacing = (e) => {
    setLetterSpacing(e); 
  }

  const handleFontFamily = (e) => {
    setFontFamily(fontFamilies[e]); 
  }

  const handleLineLength = (e) => {
    setLineLength(e); 
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout location={location} title={siteTitle} where={where}>
      { isBrowser &&
        <div className="progress-bar" style={{width: `${scrollPosition / (postReference?.current?.scrollHeight - window.innerHeight) * 100}%`}}></div>
      }
      {/* <span className="progress-bar-text">{Math.round(scrollPosition / (postReference.current.scrollHeight - window.innerHeight) * 100)}%</span>  */}
      <TextConfiguration onChangeSize={handleTextChange} onChangeLine={handleLineChange} onChangeSpacing={handleSpacing} onChangeFontFamily={handleFontFamily} onChangeLineLength={handleLineLength} />
      <article
        className="blog-post"
        itemScope
        ref={postReference}
        itemType="http://schema.org/Article"
      >
        <header className="post-header">
          <div className="portrait">
            <GatsbyImage image={image} alt={post.frontmatter.title} />
          </div>
          <div className="info read-info">
            <h1 className="bluu" itemProp="headline">{post.frontmatter.title}</h1>
            <h2 className="bluu" itemProp="headline">{post.frontmatter.author}</h2>
            <div className="reference">
                <ul>
                  <li>ISBN: {post.frontmatter.isbn}</li>
                  <li>First published: {intl.formatDate(post.frontmatter.release, {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}</li>
                  <li>Publication date: {intl.formatDate(post.frontmatter.publication, {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        })}</li>
                </ul>
              </div>{/* /reference */}
              <br />
              <div className="actions">
                { post.frontmatter.download &&
                  <a href={post.frontmatter.download} target="_blank" rel="noreferrer" className={"btn btn-secondary"}>Download Guide</a>
                }
                <a href="#guide-link" target="_blank" rel="noreferrer" className={"btn btn-secondary"}>Download Guide</a>
              </div>
            </div>
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
          className={`blog-post-content ${post.frontmatter.lang}`}
          style={{fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, letterSpacing: `${letterSpacing}px`, fontFamily: `${fontFamily}`, maxWidth: `${lineLength}ch`}}
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
        isbn
        release
        download
        publication
        language_link
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
