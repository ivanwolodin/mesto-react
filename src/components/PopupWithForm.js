import React from "react";


function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isPopupOpen}`}>
            <div className="popup__overlay"/>
            <form className="popup__container popup__container_profile_form popup__form" noValidate>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__close-profile popup__close-button" type="reset" onClick={props.closePopup}/>
            </form>
        </div>
    );
}

export default PopupWithForm;
