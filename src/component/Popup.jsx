import '../design/popup.css'

function Popup(prop) {
    const {message}=prop
  return (
    <div id="container3">
    <div id="success-box">
      
      
      <div className="face">
        <div className="eye"></div>
        <div className="eye right"></div>
        <div className="mouth happy"></div>
      </div>
      <div className="shadow scale"></div>
      <div className="message">
        <h3 className="alert">{message}!!!</h3>
      </div>
   
    </div>
  </div>
  )
}

export default Popup