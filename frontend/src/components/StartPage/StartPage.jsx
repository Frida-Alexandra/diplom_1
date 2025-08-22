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
                <section className="start-page">
                    <div className="start-page--welcome">
                        <h1 className="start-page--welcome--title"> Хранилице под надзором котиков.</h1>
                        <h2 className="start-page--welcome--subtitle"> Мяу! </h2>
                        <div className="start-page--welcome--content">
                            Cloud_Server - Кошачье хранилище файлов.
                        </div>
                        <button className="sing-up-button" onClick={onClickHandler} type="button">Начать</button>
                    </div>
                    <img className="start-page--image" src={img} alt="StartPage" />
                </section>
            )
            : null
    );
}

export default StartPage;