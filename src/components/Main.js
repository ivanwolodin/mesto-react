import React, {useState, useEffect, useContext} from "react";
import {userContext} from "../context/CurrentUserContext";

import Card from "./Card";
import {api} from "../utils/api";

function Main(props) {
    const [cards, setCards] = useState([]);
    const currentUser = useContext(userContext);

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
                    {cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} />)}
                </ul>
            </section>
        </main>
    )
}

export default Main;