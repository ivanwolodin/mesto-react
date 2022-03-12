import React from "react";


function ImagePopup() {
    return (
        <>
            <div className="popup popup_pic">
                <div className="popup__overlay"/>
                <div className="popup__picture">
                    <img className="popup__source" src="#" alt="#"/>
                    <p className="popup__label"/>
                    <button className="popup__close-image popup__close-button" type="reset"/>
                </div>
            </div>
        </>
    );
}

export default ImagePopup;