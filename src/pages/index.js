import React from "react"
import { graphql } from "gatsby"
import { injectIntl, Link, navigate } from "gatsby-plugin-intl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import TimePeriodSelector from "../components/timePeriodSelector/timePeriodSelector"
import GenreSelector from "../components/genreSelector/genreSelector"
import ThemesSelector from "../components/themesSelector/themesSelector"

const BlogIndex = ({ data, location, intl }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>nothing here yet</p>
      </Layout>
    )
  }

  const onChange = (where, event) => {
    navigate(`/${where}/${event}`)
  }

  return (
    <Layout location={location} title={siteTitle}>
      {intl.locale === "en" ? (
        <h1 className="bluu dotted large-text" id="home">
          a feminist indie press publishing
          {" "}
          <span className="gif-link">
            open access
            {" "}
            <img
              src="/img/gif/together.gif"
              alt="illustration of kids dancing in a circle"
            />
          </span>
          <Link to="/books" data-title="Books">
            books
          </Link>{" "}
          written by women. We make{" "}
          <span className="gif-link">
            carefully designed
            <img
              src="/img/gif/typo.gif"
              alt="Gif in which character says -there's a typo"
            />
          </span>{" "}
          <span className="gif-link">
            books
            <img
              src="/img/gif/books.gif"
              alt="Beauty and the beast gif in which main character sings in the huge library"
            />
          </span>{" "}
          <span className="gif-link">
            available free
            <img
              src="/img/gif/good.gif"
              alt="kid in front of a computer smiles and shows thumbs up"
            />
          </span>{" "}
          in both{" "}
          <span className="gif-link">
            print and web formats
            <img
              src="/img/gif/reading.gif"
              alt="a very funny cat reading a book on military strategy"
            />
          </span>
          .{" "}
          <a
            href="https://www.youtube.com/watch?v=F21bP9pydE0"
            target="_blank"
            rel="noreferrer"
            data-title="Youtube"
          >
            Watch our video
          </a>
          ,{" "}
          <a href="https://citapress.substack.com" data-title="Collaborate">
            subscribe to our newsletter
          </a>
          , or{" "}
          <a href="pages/books.html" data-title="Books">
            just start reading
          </a>
        </h1>
      ) : (
        <h1 className="bluu dotted large-text" id="home">
          una editorial y biblioteca feminista enfocada en libros de acceso
          abierto escritos por mujeres. Publicamos gratuitamenteniño hace
          signo de pulgar arriba en frente de un computador textos
          cuidadosamente diseñados tanto en formato impreso como web. Mira
          nuestro video, colabora, o simplemente lee
        </h1>
      )}
      
      <div className="selectors">
        <TimePeriodSelector onChange={onChange} />
        <GenreSelector onChange={onChange} />
        <ThemesSelector onChange={onChange} />
      </div>
      <ul className="main-list">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const image = getImage(post.frontmatter.square_image)

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <Link to={post.fields.slug} itemProp="url">
                    <GatsbyImage image={image} alt={title} />
                  </Link>
                </header>
                { post.frontmatter.description &&
                  <section className="d-none">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                }
              </article>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default injectIntl(BlogIndex)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query blogListQuery($language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          lang: { eq: $language }
          templateKey: { nin: ["news-page"] }
        }
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
