import * as React from "react"
import { graphql } from "gatsby"
import { injectIntl, Link } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BooksList from "../components/bookList/bookList"

const BookPostTemplate = ({
  data: { previous, next, site, markdownRemark: post, allMarkdownRemark },
  location,
  intl
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`;
  const image = getImage(post.frontmatter.post_image);

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className={'blog-post'}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="post-header">
          <div className="portrait">
            <GatsbyImage image={image} alt={post.frontmatter.title} />
          </div>
          <div className="info">
            <h1 className="bluu" itemProp="headline">{post.frontmatter.title}</h1>
            <h2 className="bluu" itemProp="headline">{post.frontmatter.author}</h2>
            <div className="reference">
              <button className="btn btn-primary">Download Free eBook</button>
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
            <div className="description">
              <p>{post.frontmatter.description}</p>
            </div>
            <div className="actions">
              <Link to={`${post.fields.slug}read`} itemProp="url" className={"btn btn-secondary"}>Read Online</Link>
              <a className={"btn btn-secondary"}>Download Guide</a>
            </div>
          </div>{/* /info */}
        </header>
        <hr />
      </article>
      <div className="related-articles">
        <BooksList data={allMarkdownRemark.nodes} />
      </div>
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

export default injectIntl(BookPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $language: String!
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
      fields {
        slug
      }
      frontmatter {
        title
        author
        isbn
        date(formatString: "MMMM DD, YYYY")
        release(formatString: "MMMM DD, YYYY")
        publication(formatString: "MMMM DD, YYYY")
        description
        post_image {
          childImageSharp {
            gatsbyImageData(width: 380)
          }
        }
        lang
      }
    }
    allMarkdownRemark(
      sort: {frontmatter: { date: DESC } }
      filter: {
        id: {ne: $id},
        frontmatter: {lang: {eq: $language}}
      }
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          square_image {
            childImageSharp {
              gatsbyImageData(width: 380)
            }
          }
        }
      }
    }
  }
`
