import * as React from "react"
import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"

import Layout from "../components/layout/layout"

const NewsTemplate = ({
  data,
  location,
  intl
}) => {
  const news = data.allMarkdownRemark.nodes[0]
  // get the genre from last location segment
  const siteTitle = `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <h1 className="bluu">{intl.formatMessage({id: "news"})}</h1>
      <p>
        To stay up to date on all our releases and news, please <a href="https://citapress.substack.com" className="blue">sign up to our newsletter here!</a>
      </p>
      <hr />
      <section
          dangerouslySetInnerHTML={{ __html: news.html }}
          className={`news-content ${news.frontmatter.lang}`}
          itemProp="articleBody"
        />
    </Layout>
  )
}

export default injectIntl(NewsTemplate)

export const pageQuery = graphql`
  query blogListQuery($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {frontmatter: { date: DESC } }
      limit: 1
      filter: {frontmatter: {
        lang: {eq: $language}
        templateKey: { eq: "news-page" }
      }}
      ) {
      nodes {
        excerpt
        html
        fields {
          slug
        }
        frontmatter {
          title
          lang
        }
      }
    }
  }
`
