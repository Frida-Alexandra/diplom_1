import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../GlobalState/state';
import './StartPage.css';
import img from './StartPage.svg';

function StartPage() {
    const navigate = useNavigate();
    const { sessionId } = useContext(Context);

    const onClickHandler = () => {
        navigate('/sign-up/');
    };

    useEffect(() => {
        if (sessionId) {
            navigate('/my-storage/');
        }
    }, [sessionId]);

    return (
        !sessionId
            ? (
                <section class="start-page">
                    <div class="start-page--welcome">
                        <h1 class="start-page--welcome--title"> Хранилице под надзором котиков.</h1>
                        <h2 class="start-page--welcome--subtitle"> Мяу! </h2>
                        <div class="start-page--welcome--content">
                            Cloud_Server - Кошачье хранилище файлов.
                        </div>
                        <button class="sing-up-button" onClick={onClickHandler} type="button">Начать</button>
                    </div>
                    <img src="frontend\src\components\StartPage\StartPage.svg" class="start-page--image" alt="StartPage" />
                </section>
            )
            : null
    );
}

export default StartPage;