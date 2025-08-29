import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionId, setUsername, setIsAdmin } from './userSlice'; 
import { userMe, getCsrfCookie } from '../api/requests';

export default function UserProvider({ children }) {
    const dispatch = useDispatch();
    const sessionId = useSelector(state => state.user.sessionId);

    const getUserData = async () => {
        const response = await userMe();
        const data = await response.json();
        dispatch(setUsername(data.username));
        dispatch(setIsAdmin(data.isAdmin));
    };

    useEffect(() => {
        const sessionIdCookie = Cookies.get('sessionid');
        dispatch(setSessionId(sessionIdCookie));
        getUserData();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await getCsrfCookie();
        };

        if (!Cookies.get('csrftoken')) {
            fetchData();
        }
    }, []);

    return <>{children}</>; 
}

UserProvider.propTypes = {
    children: PropTypes.element.isRequired,
};