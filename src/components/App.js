import React, {useEffect, useState} from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {userContext} from "../context/CurrentUserContext";
import {cardsContext} from "../context/CardsContext";

function App() {

    const [currentUser, setCurrentUser] = useState({
        name: 'Jaque',
        profession: 'Physicist',
        avatarUrl: ''
    });

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(
                    {
                        name: userData.name,
                        profession: userData.about,
                        avatarUrl: userData.avatar
                    }
                )
            })
            .catch((err) => {
                console.log("Cannot get data from server");
                console.log(err);
            });

        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log("Cannot get data from server");
                console.log(err);
            });

    }, []);

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);

        setSelectedCard({});
    }

    return (
        <div className="root">
            <div className="page">
                <Header/>
                <cardsContext.Provider value={cards}>
                    <userContext.Provider value={currentUser}>
                        <Main onEditProfile={handleEditProfileClick}
                              onAddPlace={handleAddPlaceClick}
                              onEditAvatar={handleEditAvatarClick}
                              onCardClick={handleCardClick}
                        />
                    </userContext.Provider>
                </cardsContext.Provider>
                <Footer/>
                <PopupWithForm title='Редактировать профиль'
                               name='popup_profile'
                               isPopupOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               submitButton='Сохранить'
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
                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title='Новое место'
                               name='popup_image'
                               isPopupOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               submitButton='Создать'
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

                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title='Обновить аватар'
                               name='popup_avatar'
                               isPopupOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
                               closePopup={closeAllPopups}
                               submitButton='Сохранить'
                               children={
                                   <>
                                       <input className="popup__subtitle popup__subtitle_type_link popup__input"
                                              id="avatar-input"
                                              type="url"
                                              placeholder="Ссылка на аватар" name="link" required/>
                                       <span className="avatar-input-error"/>
                                   </>
                               }>
                </PopupWithForm>
                <PopupWithForm title='Вы уверены?'
                               name='popup_delete_card'
                               closePopup={closeAllPopups}
                               submitButton='Да'
                >
                </PopupWithForm>
                <ImagePopup selectedCard={selectedCard}
                            onClose={closeAllPopups}
                            isPopupOpen={Object.keys(selectedCard).length !== 0 ? "popup_opened" : ""}
                />
            </div>

        </div>
    );
}

export default App;
