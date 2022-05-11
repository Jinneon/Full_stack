import React from "react"

const Popup = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: message.type === "error" ? "red" : "blue",
    background: "white",
    fontSize: 25,
    borderStyle: "solid",
    borderRadius: 50,
    padding: 5,
    marginBottom: 10,


  }

  return (
    <div style={style}    className="error">
      {message.note}
    </div>
  )
}
export default Popup