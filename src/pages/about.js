import * as React from "react"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

import Layout from "../components/layout"

const AboutIndex = ({ location, intl }) => {
  
  return (
    <Layout location={location} title={'about'}>
      <hr />
      <h1 className="bluu">
        <FormattedMessage id="cita is" />
      </h1>
      <hr />
      <div className="flex about-content">
        <div className="flex-50">
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({id: 'about_left_entry'}),
            }}
            itemProp="description"
          />
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({id: 'Watch our video!'}),
            }}
            itemProp="description"
          />
          {intl.locale === 'en' ? 
           (
              <>
                <ul>
                  <li>To elevate the work of those who first addressed gender inequality </li>
                  <li>To use open-source resources and actively credit them </li>
                  <li>To maintain the content in open-access platforms, licenses and formats</li>
                  <li>To give free access to the content</li>
                  <li>To make visible and celebrate the work of contributors</li>
                  <li>To pair classic literature with contemporary open scholarship and design</li>
                  <li>To be committed to intersectionality</li>
                  <li>To be participatory, crowdsourced and open to new voices and collaborations</li>
                </ul>
                <p>
                  <span class="mini-title">Advisory Board:</span> <a href="https://openreflections.wordpress.com/" target="_blank" rel="noreferrer">Janneke Adema</a>, <a href="https://knightfoundation.org/employee/vicky-checo/" target="_blank" rel="noreferrer">Vicky Checo</a>, <a href="https://twitter.com/krmaher" target="_blank" rel="noreferrer">Katherine Maher</a>, <a href="https://educopia.org/jessica-meyerson/" target="_blank" rel="noreferrer">Jessica Meyerson</a>, & <a href="https://mindyseu.com/" target="_blank" rel="noreferrer">Mindy Seu</a>.
                </p>
              </>
            ) : (
              <>
                <p>
                  <span class="mini-title">Manifesto:</span>
                  <ul>
                    <li> Elevar el trabajo de quienes primero abordaron la desigualdad de género </li>
                    <li> Usar recursos de código abierto y acreditar a quienes colaboren activamente </li>
                    <li> Mantener el contenido en plataformas de acceso abierto, licencias y formatos </li>
                    <li> Dar acceso gratuito al contenido </li> <li> Hacer visible y celebrar el trabajo de las contribuyentes </li> <li> Emparejar la literatura clásica con la investigación y el diseño contemporáneo </li> <li> Comprometernos con la interseccionalidad </li><li> Ser participativas y abiertas a nuevas voces y colaboraciones </li></ul>
                </p>
                <p>
                  <span class="mini-title">Junta Asesora:</span> <a href="https://openreflections.wordpress.com/" target="_blank" rel="noreferrer">Janneke Adema</a>, <a href="https://knightfoundation.org/employee/vicky-checo/" target="_blank" rel="noreferrer">Vicky Checo</a>, <a href="https://twitter.com/krmaher" target="_blank" rel="noreferrer">Katherine Maher</a>, <a href="https://educopia.org/jessica-meyerson/" target="_blank" rel="noreferrer">Jessica Meyerson</a>, y <a href="https://mindyseu.com/" target="_blank" rel="noreferrer">Mindy Seu</a>.</p></>
            )}
          
        </div>
        <div className="flex-50">
          <p>What: Carefully designed public-domain books written by women in free, contemporary editions for print and web.</p>
        </div>
      </div>
    </Layout>
  )
}

export default injectIntl(AboutIndex)
