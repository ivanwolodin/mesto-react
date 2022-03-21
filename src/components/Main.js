import React, {useState, useEffect, useContext} from "react";
import {userContext} from "../context/CurrentUserContext";

import Card from "./Card";
import {api} from "../utils/api";

function Main(props) {
    const currentUser = useContext(userContext);
    const [cards, setCards] = useState([]);

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

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__image" style={{backgroundImage: `url(${currentUser.avatarUrl})`}}/>
                    <div className="profile__change-avatar" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__personal-data">
                        <h1 className="profile__name"> {currentUser.name} </h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile}/>
                    </div>
                    <p className="profile__position"> {currentUser.about} </p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace}/>
            </section>

            <section>
                <ul className="elements">
                    {cards.map((card) => <Card key={card._id}
                                               isOwn={card.owner._id === currentUser.id}
                                               isLiked={card.likes.some(i => i._id === currentUser.id)}
                                               card={card}
                                               onCardClick={props.onCardClick}
                                               onCardLike={handleCardLike}
                                               onCardDelete={handleDeleteCard}/>
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main;