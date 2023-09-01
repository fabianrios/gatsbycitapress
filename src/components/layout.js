import * as React from "react"
import { Link } from "gatsby-plugin-intl"
import ChangeLanguage from "../components/changeLanguage/changeLanguage"


const Layout = ({ location, title, children, intl }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header bluu">{header}</header>
      <main className="main-wrapper">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
      <ChangeLanguage />
    </div>
  )
}

export default Layout
