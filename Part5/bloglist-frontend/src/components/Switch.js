import { useState, forwardRef, useImperativeHandle } from "react"

import PropTypes from "prop-types"
const Switch = forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)
  const hide = { display: visible ? "none" : "" }
  const show = { display: visible ? "" : "none" }


  const hideData = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      hideData
    }
  })
  return (
    <div>
      <div style={hide}>
        <button type="submit" onClick={hideData}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button type="submit" onClick={hideData}>Cancel</button>
      </div>
    </div>
  )
})
Switch.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Switch.displayName = "Switch"


export default Switch