import { connect } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
  const css = {
    marginBottom: 25,
    backgroundColor: "aqua",
    color: "black"
  }

  const changeH = (event) => {
    props.filter(event.target.value)
  }
  return (
    <div style={css}>
      Filter results <input type="text" onChange={changeH} />
    </div>
  )
}
const dispProps = {
  filter,
}
export default connect(
  null,
  dispProps
)(Filter)