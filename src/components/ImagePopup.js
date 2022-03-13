import React from "react";

function ImagePopup({selectedCard, onClose, isPopupOpen}) {
    return (
        <div className={`popup popup_pic ${isPopupOpen}`}>
            <div className="popup__overlay"/>
            <div className="popup__picture">
                <img className="popup__source" src={selectedCard.link} alt={selectedCard.name}/>
                <p className="popup__label"> {selectedCard.name} </p>
                <button className="popup__close-image popup__close-button" type="reset" onClick={onClose}/>
            </div>
        </div>
    );
}

export default ImagePopup;