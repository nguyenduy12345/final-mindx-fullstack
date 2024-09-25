import './style.css'

const Popup = ({dataPopup, setDataPopup}) => {
  return (
    <div className="popup">
        <i id="close" onClick={() => setDataPopup(false)} className="fa-solid fa-xmark"></i>
        <img src={dataPopup.image}/>
        <div className="popup__img">
            
        </div>
        <div className="popup__information">
            <h3>{dataPopup.name}</h3>
            <span>{`${dataPopup.time} min - ${dataPopup.year}`}</span>
            <p>{dataPopup.introduce}</p>
            <button><i className="fa-solid fa-play"></i>Play movie</button>
        </div>
    </div>
  )
}

export default Popup
