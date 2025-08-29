import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSessionId } from 'frontend/src/redux/slices/sessionSlice.js'; 
import './StartPage.css';
import img from './StartPage.svg';

function StartPage() {
    const navigate = useNavigate();
    const sessionId = useSelector(selectSessionId); 
    const onClickHandler = () => {
        navigate('/sign-up/');
    };

    useEffect(() => {
        if (sessionId) {
            navigate('/my-storage/');
        }
    }, [sessionId, navigate]);

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
                    <img src={img} className="start-page--image" alt="StartPage" />
                </section>
            )
            : null
    );
}

export default StartPage;