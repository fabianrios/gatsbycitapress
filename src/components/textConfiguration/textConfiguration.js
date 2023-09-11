// list of books component
import * as React from "react"
import { injectIntl } from "gatsby-plugin-intl"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as classes from "./textConfiguration.module.scss";

const textConfiguration = ({ onChangeSize, onChangeLine, onChangeSpacing, onChangeFontFamily, onChangeLineLength, intl }) => {

  const handleChangeSize = value => {
    onChangeSize(value)
  }
  
  const handleChangeLine = value => {
    onChangeLine(value)
  }
  
  const handleChangeSpacing = value => {
    onChangeSpacing(value)
  }
  
  const fontChange = value => {
    onChangeFontFamily(value)
  }

  const handleLineLenght = value => {
    onChangeLineLength(value)
  }

  return (
    <div className={classes.configBody}>
      <label>{intl.formatMessage({id: 'Type size'})}:</label>
      <Slider name="font-size" min={10} max={40} defaultValue={19} onChange={handleChangeSize}/>
      <label>{intl.formatMessage({id: 'Line Height'})}:</label>
      <Slider name="line-heigth" min={15} max={50} defaultValue={26} onChange={handleChangeLine}/>
      <label>{intl.formatMessage({id: 'Letter spacing'})}:</label>
      <Slider min={-5} max={10} defaultValue={0} onChange={handleChangeSpacing}/>
      <label>{intl.formatMessage({id: 'Line length'})}:</label>
      <Slider min={0} max={100} defaultValue={90} onChange={handleLineLenght}/>
      <label>{intl.formatMessage({id: 'Font'})}:</label>
      <div className={classes.fonts}>
        <button onClick={(e) => fontChange('bluu')} className="bluu">A</button>
        <button onClick={(e) => fontChange('zilla')} className="zilla">A</button>
        <button onClick={(e) => fontChange('garamond')} className="garamond">A</button>
      </div>
    </div>
  )
}

export default injectIntl(textConfiguration)