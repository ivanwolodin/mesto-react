import React from "react";

function Main() {

    // function handleEditAvatarClick() {
    //     const popup = document.querySelector('.popup_profile');
    //     popup.classList.add('popup_opened');
    // }

    // function handleAddPlaceClick() {
    //     const popup = document.querySelector('.popup_avatar');
    //     popup.classList.add('popup_opened');
    // }

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar">
                        <div className="profile__image"/>
                        <div className="profile__change-avatar"/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__personal-data">
                            <h1 className="profile__name"/>
                            <button className="profile__edit-button"/>
                        </div>
                        <p className="profile__position"/>
                    </div>
                    <button className="profile__add-button"/>
                </section>

                <section>
                    <ul className="elements"/>
                </section>
            </main>
        </>
    );
}

export default Main;