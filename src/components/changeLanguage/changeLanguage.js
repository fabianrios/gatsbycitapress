import React from 'react'
// import changeLanguageStyle from "./changeLanguage.module.scss"
import { injectIntl, changeLocale } from "gatsby-plugin-intl"

export class changeLanguage extends React.Component {
  state = {
    language: this.props.intl.locale,
    languageName: {
      en: "English",
      es: "Spanish",
    },
    languageOriginal: {
      en: "English",
      es: "Español",
    },
    languages: [`en`, `es`]
  }

  handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
    changeLocale(event.target.value)
  }


  render() {
    return (
    <div>
      <select onChange={this.handleChange} value={this.state.language} name="language">
        {this.state.languages.map((language, index) => (
          <option 
            key={index}
            value={language}>{this.props.intl.formatMessage({ id: this.state.languageName[language] })} | {this.state.languageOriginal[language]}</option>
        ))}
      </select>
    </div>
    )
  }
}

export default injectIntl(changeLanguage)