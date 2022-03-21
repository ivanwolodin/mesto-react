import React, {useState, useContext, useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";
import {userContext} from "../context/CurrentUserContext";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
    const currentUser = useContext(userContext);
    let avatarRef = useRef();
    const isPopupOpen = isOpen ? "popup_opened" : ""
    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title='Обновить аватар'
                       name='popup_avatar'
                       isPopupOpen={isPopupOpen}
                       closePopup={onClose}
                       submitButton='Сохранить'
                       onSubmit={handleSubmit}
                       children={
                           <>
                               <input className="popup__subtitle popup__subtitle_type_link popup__input"
                                      id="avatar-input"
                                      type="url"
                                      ref={avatarRef}
                                      placeholder="Ссылка на аватар" name="link" required/>
                               <span className="avatar-input-error"/>
                           </>
                       }>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;