import React from "react";

function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element" key={card._id}>
            <article>
                <div>
                    <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
                    <div className="element__info" >
                        <h2 className="element__name">{card.name}</h2>
                        <div className="element__like-section">
                            <button className="element__like-button"/>
                            <div className="element__like-counter"> {card.likes.length}</div>
                        </div>
                    </div>
                    <div className="element__delete-icon">
                        <div className="element__delete-icon-part1"/>
                        <div className="element__delete-icon-part2"/>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default Card;