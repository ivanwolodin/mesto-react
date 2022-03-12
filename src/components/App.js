import React, {useState} from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function closeAllPopups(){
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
    }

    return (
        <div className="root">
            <div className="page">
                <Header/>
                <Main onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}/>
                <Footer/>
                <PopupWithForm title={'Редактировать профиль'}
                               name={'popup_profile'}
                               isPopupOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               children={
                                   <>
                                       <input className="popup__subtitle popup__subtitle_type_name popup__input"
                                              id="name-input"
                                              type="text"
                                              placeholder="Имя" name="name" required minLength="2" maxLength="40"/>
                                       <span className="name-input-error"/>
                                       <input className="popup__subtitle popup__subtitle_type_profession popup__input"
                                              id="position-input"
                                              type="text"
                                              placeholder="Профессия" name="profession" required minLength="2"
                                              maxLength="200"/>
                                       <span className="position-input-error"/>
                                       <button className="popup__save-profile popup__button" type="submit">
                                           Сохранить
                                       </button>
                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title={'Новое место'}
                               name={'popup_image'}
                               isPopupOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               children={
                                   <>
                                       <input className="popup__subtitle popup__subtitle_type_image popup__input"
                                              id="card-input"
                                              type="text"
                                              placeholder="Название" name="name" required minLength="2" maxLength="30"/>
                                       <span className="card-input-error"> </span>
                                       <input className="popup__subtitle popup__subtitle_type_link popup__input"
                                              id="url-input" type="url"
                                              placeholder="Ссылка на картинку" name="link" required/>
                                       <span className="url-input-error"/>
                                       <button className="popup__save-image popup__button" type="submit">
                                           Создать
                                       </button>
                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title={'Обновить аватар'}
                               name={'popup_avatar'}
                               isPopupOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               children={
                                   <>
                                       <input className="popup__subtitle popup__subtitle_type_link popup__input"
                                              id="avatar-input"
                                              type="url"
                                              placeholder="Ссылка на аватар" name="link" required/>
                                       <span className="avatar-input-error"/>
                                       <button className="popup__button" type="submit">
                                           Сохранить
                                       </button>
                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title={'Вы уверены?'}
                               name={'popup_delete_card'}
                               closePopup={closeAllPopups}
                               children={
                                   <>
                                       <button className="popup__button" type="submit">
                                           Да
                                       </button>
                                   </>
                               }>
                </PopupWithForm>
                <ImagePopup/>
            </div>

            <template className="elements-cards">
                <li className="element">
                    <article>
                        <img className="element__image" src="#" alt=""/>
                        <div className="element__info">
                            <h2 className="element__name"/>
                            <div className="element__like-section">
                                <button className="element__like-button"/>
                                <div className="element__like-counter"> 0</div>
                            </div>
                        </div>
                        <div className="element__delete-icon">
                            <div className="element__delete-icon-part1"/>
                            <div className="element__delete-icon-part2"/>
                        </div>
                    </article>
                </li>
            </template>
        </div>
    );
}

export default App;
