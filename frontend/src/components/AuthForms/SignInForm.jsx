import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Preloader from '../Preloader/Preloader';
import { logIn } from '../../api/requests';
import { useDispatch } from 'react-redux';
import { setSessionId } from 'frontend/src/redux/slices/sessionSlice.js'; 
import '../formStyle/Form.css';
import img from 'frontend/src/components/formStyle/icons8-close.svg';

function SignInForm() {
    const email = useRef();
    const password = useRef();
    const [sendRequest, setSendRequest] = useState(false);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const response = await logIn(email.current.value, password.current.value);
            const data = await response.json();

            if (!response.ok) {
                setError(Object.values(data));
                setSendRequest(false);
                setIsLoading(false);
                return;
            }

            dispatch(setSessionId(Cookies.get('sessionid'))); 

            navigate('/my-storage/');
            setSendRequest(false);
            setIsLoading(false);
        };

        if (sendRequest) {
            fetchData();
        }
    }, [sendRequest, dispatch, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSendRequest(true);
    };

    return (
        <>
            <form className="form" onSubmit={onSubmitHandler}>
                <h2 className="form--title">Sign In</h2>
                <input type="email" ref={email} placeholder="email" required />
                <input type="password" ref={password} placeholder="password" required />
                <input type="submit" value="OK" required />
                <span>{error}</span>
                <button className="close" type="button" aria-label="Close">
                    <Link to="/"><img src={img} alt="close" /></Link>
                </button>
            </form>
            {isLoading ? <Preloader /> : null}
        </>
    );
}

export default SignInForm;