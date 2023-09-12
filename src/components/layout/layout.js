import * as React from "react"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import ChangeLanguage from "../changeLanguage/changeLanguage"
import * as classes from "./layout.module.scss"


const Layout = ({ location, children, intl, where }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [clicked, setClicked] = React.useState(false)
  
  let header = (
    <div className={clicked ? "flex main-heading" : "flex main-heading open"}>
      <h1 className="cita-heading">
        <Link to="/">cita:</Link>
      </h1>
      <ul className="navigation">
        <li><Link to="/about"><FormattedMessage id="about" />:</Link></li>
        <li><Link to="/books"><FormattedMessage id="books" />:</Link></li>
        <li><Link to="/people"><FormattedMessage id="people" />:</Link></li>
        <li><Link to="/news"><FormattedMessage id="news" />:</Link></li>
        <li><Link to="/contact"><FormattedMessage id="contact" />:</Link></li>
      </ul>
      <button className="btn btn-secondary menu-button" onClick={() => setClicked(!clicked)}>Menu</button>
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className={`${classes.globalHeader} bluu`}>{header}</header>
      <main className="main-wrapper">{children}</main>
      <footer>
        <div className={"footer-container"}>
          <ChangeLanguage where={where} />
          <div className="message">
            <div className="social">
              <a className="social-img" href="http://facebook.com/citapress"><img src="/img/fb.png" alt="fb" /></a>
              <a className="social-img" href="http://twitter.com/citapress"><img src="/img/tw.png" alt="tw" /></a>
            </div>
            <div>
              All rights reserved  CC-BY-SA 4.0 / {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.com">Gatsby</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
