import React, {useEffect, useState} from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {userContext} from "../context/CurrentUserContext";

function App() {
    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatarUrl: '',
        id: '',
    });

    useEffect(() => {
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(
                    {
                        name: userData.name,
                        about: userData.about,
                        avatarUrl: userData.avatar,
                        id: userData._id
                    }
                )
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

    function handleUpdateUser(data) {

        api.changeUserInfo(data.name, data.about)
            .then((response) => {
                setCurrentUser({
                    name: data.name,
                    about: data.about,
                    avatarUrl: currentUser.avatarUrl,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Cannot change user data");
                console.log(err);
            });
    }

    function handleAvatarUpdate(data) {
        api.changeAvatar(data.avatar)
            .then((response) => {
                setCurrentUser({
                    name: currentUser.name,
                    about: currentUser.about,
                    avatarUrl: data.avatar,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Cannot change avatar");
                console.log(err);
            });
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
                <userContext.Provider value={currentUser}>
                    <Main onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onCardClick={handleCardClick}
                    />

                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}
                    />
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
                                                  placeholder="Название" name="name" required minLength="2"
                                                  maxLength="30"/>
                                           <span className="card-input-error"> </span>
                                           <input className="popup__subtitle popup__subtitle_type_link popup__input"
                                                  id="url-input" type="url"
                                                  placeholder="Ссылка на картинку" name="link" required/>
                                           <span className="url-input-error"/>

                                       </>
                                   }>
                    </PopupWithForm>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                                     onClose={closeAllPopups}
                                     onUpdateAvatar={handleAvatarUpdate}/>
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
                </userContext.Provider>
            </div>

        </div>
    );
}

export default App;
