import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/requests';
import { validateUsername, validatePassword } from './validateForm';
import Preloader from '../Preloader/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, clearError } from '.frontend/src/redux/slices/authSlice.js'; 
import '../formStyle/Form.css';
import img from 'frontend/src/components/formStyle/icons8-close.svg';

function SignUpForm() {
    const email = useRef();
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const password = useRef();
    const password2 = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth); 

    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setLoading(true));
            const response = await signUp(formData);
            const data = await response.json();

            if (!response.ok) {
                dispatch(setError(Object.values(data))); 
                dispatch(setLoading(false));
                return;
            }

            dispatch(setLoading(false));
            navigate('/sign-in/');
        };

        if (formData.email) {
            fetchData();
        }
    }, [formData, dispatch, navigate]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (page === 1) {
            const usernameIsValid = validateUsername(username.current.value);
            const passwordIsValid = validatePassword(password.current.value);

            if (!usernameIsValid.ok) {
                dispatch(setError([usernameIsValid.message]));
                return;
            }

            if (!passwordIsValid.ok) {
                dispatch(setError([passwordIsValid.message]));
                return;
            }

            setFormData({
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                password2: password2.current.value,
            });

            dispatch(clearError()); 
            setPage(2);
            email.current.value = '';
            username.current.value = '';
            return;
        }

        const secondPageFormData = {
            first_name: firstName ? firstName.current.value : null,
            last_name: lastName ? lastName.current.value : null,
        };

        setFormData(prevData => ({ ...prevData, ...secondPageFormData })); 
    };

    return (
        <>
            <form className="form" onSubmit={onSubmitHandler}>
                <h2 className="form--title">Sign Up</h2>
                {page === 1 ? (
                    <>
                        <input type="email" placeholder="email*" ref={email} required />
                        <input type="text" placeholder="username*" ref={username} required />
                        <input type="password" placeholder="password*" ref={password} required />
                        <input type="password" placeholder="repeat password*" ref={password2} required />
                        <input type="submit" value="OK" />
                    </>
                ) : (
                    <>
                        <input type="text" placeholder="first name" ref={firstName} />
                        <input type="text" placeholder="last name" ref={lastName} />
                        <input type="submit" value="OK" />
                    </>
                )}
                {error ? error.map((a, index) => <span key={index}>{a}</span>) : null}
                <button className="close" type="button" aria-label="Close">
                    <Link to="/"><img src={img} alt="close" /></Link>
                </button>
            </form>
            {isLoading && <Preloader />}
        </>
    );
}

export default SignUpForm;