import * as React from "react"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import ChangeLanguage from "../components/changeLanguage/changeLanguage"


const Layout = ({ location, title, children, intl }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  
  let header = (
    <div className="flex main-heading">
      <h1 className="main-heading">
        <Link to="/">Cita:</Link>
      </h1>
      <ul className="navigation">
        <li><Link to="/about"><FormattedMessage id="about" /></Link></li>
        <li><Link to="/books"><FormattedMessage id="books" /></Link></li>
      </ul>
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header bluu">{header}</header>
      <main className="main-wrapper">{children}</main>
      <footer>
        <div className={"footer-container"}>
          <div className="message">
            All rights reserved  CC-BY-SA 4.0 / {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
          </div>
          <ChangeLanguage />
        </div>
      </footer>
    </div>
  )
}

export default Layout
