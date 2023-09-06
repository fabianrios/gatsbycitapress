/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const books = path.resolve(`./src/templates/book-post.js`)
const booksread = path.resolve(`./src/templates/book-post-read.js`)
const genreTemplate = path.resolve(`./src/templates/genre-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      booksEnglish: allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        filter: {frontmatter: {lang: {eq: "en"}}}
        limit: 1000
      ) {
        nodes {
          id
          frontmatter{
            lang
          }
          fields {
            slug
          }
        }
      }
      Allbooks: allMarkdownRemark(
        sort: {frontmatter: {date: DESC}}
        limit: 1000
      ) {
        nodes {
          id
          frontmatter{
            lang
            genre
            time_period
            theme
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const englishPosts = result.data.booksEnglish.nodes;
  const posts = result.data.Allbooks.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/books" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: books,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          lang: post.frontmatter.lang,
        },
      })
      createPage({
        path: post.fields.slug+"read",
        component: booksread,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          lang: post.frontmatter.lang,
        },
      })
    })
  }

  const genres = ["fiction", "short-stories", "novella", "poetry", "nonfiction", "essay", "manifesto", "autobiography"];
  genres.forEach((genre) => {
    const genrePosts = posts.filter((post) => post.frontmatter.genre?.includes(genre));
    if (genrePosts.length > 0) {
      createPage({
        path: `/genre/${genre}`,
        component: genreTemplate,
        context: {
          id: genre.id,
          genre: genre,
          lang: "en",
        },
      })
    }
  });
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/books" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      lang: String
    }

    type Fields {
      slug: String
    }
  `)
}
