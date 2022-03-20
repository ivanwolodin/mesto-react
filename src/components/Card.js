import React from "react";

function Card({card, isOwn, isLiked, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete-icon' : ''}`
    );

    const cardLikedButtonClassName = (
        `${isLiked ? 'element__like-button_liked' : ''}`
    );

    return (
        <li className="element">
            <article>
                    <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
                    <div className="element__info" >
                        <h2 className="element__name">{card.name}</h2>
                        <div className="element__like-section">
                            <button className={`element__like-button ${cardLikedButtonClassName}`}/>
                            <div className="element__like-counter"> {card.likes.length}</div>
                        </div>
                    </div>
                    <div className={cardDeleteButtonClassName}/>
            </article>
        </li>
    );
}

export default Card;