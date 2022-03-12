import logo from './images/header-logo.svg';

function App() {
    return (
        <div className="root">
            <div className="page">
                <header className="header">
                    <img className="header__logo" src={logo} alt="лого"/>
                </header>

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

                <footer className="footer">
                    <p className="footer__copyright">&copy; 2021 Mesto Russia</p>
                </footer>
            </div>

            <div className="popup popup_profile">
                <div className="popup__overlay"/>
                <form className="popup__container popup__container_profile_form popup__form" noValidate>
                    <h3 className="popup__title">Редактировать профиль</h3>
                    <input className="popup__subtitle popup__subtitle_type_name popup__input" id="name-input"
                           type="text"
                           placeholder="Имя" name="name" required minLength="2" maxLength="40" value='sdsdf'/>
                    <span className="name-input-error"/>
                    <input className="popup__subtitle popup__subtitle_type_profession popup__input" id="position-input"
                           type="text"
                           placeholder="Профессия" name="profession" required minLength="2" maxLength="200"/>
                    <span className="position-input-error"/>
                    <button className="popup__save-profile popup__button" type="submit">
                        Сохранить
                    </button>
                    <button className="popup__close-profile popup__close-button" type="reset"/>
                </form>
            </div>

            <div className="popup popup_image">
                <div className="popup__overlay"/>
                <form className="popup__container popup__container_card_form popup__form" noValidate>
                    <h3 className="popup__title">Новое место</h3>
                    <input className="popup__subtitle popup__subtitle_type_image popup__input" id="card-input"
                           type="text"
                           placeholder="Название" name="name" required minLength="2" maxLength="30"/>
                    <span className="card-input-error"> </span>
                    <input className="popup__subtitle popup__subtitle_type_link popup__input" id="url-input" type="url"
                           placeholder="Ссылка на картинку" name="link" required/>
                    <span className="url-input-error"/>
                    <button className="popup__save-image popup__button" type="submit">
                        Создать
                    </button>
                    <button className="popup__close-image popup__close-button" type="reset"/>
                </form>
            </div>

            <div className="popup popup_pic">
                <div className="popup__overlay"/>
                <div className="popup__picture">
                    <img className="popup__source" src="#" alt="#"/>
                    <p className="popup__label"/>
                    <button className="popup__close-image popup__close-button" type="reset"/>
                </div>
            </div>

            <div className="popup popup_delete_card">
                <div className="popup__overlay"/>
                <div className="popup__container">
                    <h3 className="popup__title">Вы уверены?</h3>
                    <button className="popup__button" type="submit">
                        Да
                    </button>
                    <button className="popup__close-button" type="reset"/>
                </div>
            </div>

            <div className="popup popup_avatar">
                <div className="popup__overlay"/>
                <form className="popup__container popup__container_avatar_form popup__form" noValidate>
                    <h3 className="popup__title">Обновить аватар</h3>
                    <input className="popup__subtitle popup__subtitle_type_link popup__input" id="avatar-input"
                           type="url"
                           placeholder="Ссылка на аватар" name="link" required/>
                    <span className="avatar-input-error"/>
                    <button className="popup__button" type="submit">
                        Сохранить
                    </button>
                    <button className="popup__close-button" type="reset"/>
                </form>
            </div>

            <template className="elements-cards">
                <li className="element">
                    <article>
                        <img className="element__image" src="#" alt=""/>
                        <div className="element__info">
                            <h2 className="element__name"/>
                            <div className="element__like-section">
                                <button className="element__like-button"/>
                                <div className="element__like-counter"> 0</div>
                            </div>
                        </div>
                        <div className="element__delete-icon">
                            <div className="element__delete-icon-part1"/>
                            <div className="element__delete-icon-part2"/>
                        </div>
                    </article>
                </li>
            </template>
        </div>
    );
}

export default App;
