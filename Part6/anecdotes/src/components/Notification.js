import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 7,
    borderWidth: 5,
    borderRadius: 50,
    backgroundColor: "white",
  }
  if ( props.message.length > 0 ) {
    return (
      <div style={style}>
        {props.message}
      </div>
    )
  }
}
const dispProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(dispProps)(Notification)