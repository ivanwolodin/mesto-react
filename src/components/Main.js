import React from "react";

function Main(props) {
    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar">
                        <div className="profile__image"/>
                        <div className="profile__change-avatar" onClick={props.onEditAvatar}/>
                    </div>
                    <div className="profile__info">
                        <div className="profile__personal-data">
                            <h1 className="profile__name"/>
                            <button className="profile__edit-button" onClick={props.onEditProfile}/>
                        </div>
                        <p className="profile__position"/>
                    </div>
                    <button className="profile__add-button" onClick={props.onAddPlace}/>
                </section>

                <section>
                    <ul className="elements"/>
                </section>
            </main>
        </>
    );
}

export default Main;