import React from "react";


function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isPopupOpen}`}>
            <div className="popup__overlay"/>
            <form name={props.name} className="popup__container popup__container_profile_form popup__form"
                  onSubmit={props.onSubmit}>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__close-profile popup__close-button" type="reset" onClick={props.closePopup}/>
                <button className="popup__save-image popup__button" type="submit">
                    {props.submitButton}
                </button>
            </form>
        </div>
    );
}

export default PopupWithForm;
