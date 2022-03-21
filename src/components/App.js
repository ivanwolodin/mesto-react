import React, {useEffect, useState} from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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
    const [cards, setCards] = useState([]);

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log("Cannot get data from server");
                console.log(err);
            });
    }, []);

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

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser.id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => {
                console.log("Cannot handle liking");
                console.log(err);
            });
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id).then((response) => {
            setCards(cards.filter(item => item._id !== card._id));
        })
            .catch((err) => {
                console.log("Cannot handle card deleting");
                console.log(err);
            });
    }

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

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data.cardName, data.cardLink)
            .then((response) => {
                console.log(response)
                setCards([response, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log("Cannot add new card");
                console.log(err);
            });
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
                          handleCardLike={handleCardLike}
                          handleDeleteCard={handleDeleteCard}
                          cards={cards}
                    />
                    <Footer/>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
                                   onClose={closeAllPopups}
                                   onAddNewCard={handleAddPlaceSubmit}
                    />
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
