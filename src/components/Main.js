import React, {useState} from "react";
import {api} from "../utils/Api";

function Main(props) {
    const [userName, setUserName] = useState('');
    const [userProfession, setUserProfession] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
            // let userId = userData._id;
            setUserName(userData.name);
            setUserProfession(userData.about);
            setUserAvatar(userData.avatar);
        })
        .catch((err) => {
            alert("Cannot get data from server");
            alert(err);
        });

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" >
                    <div className="profile__image" style={{ backgroundImage: `url(${userAvatar})` }}/>
                    <div className="profile__change-avatar" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__personal-data">
                        <h1 className="profile__name"> {userName} </h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile}/>
                    </div>
                    <p className="profile__position"> {userProfession} </p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace}/>
            </section>

            <section>
                <ul className="elements"/>
            </section>
        </main>

    );
}

export default Main;