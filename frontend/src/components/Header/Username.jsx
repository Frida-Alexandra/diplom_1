import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../api/requests';
import { setSessionId, setUsername } from '../../slices/authSlice';

function Username({ username }) {
    const [logoutButton, setLogoutButton] = useState(false);
    const [sendRequest, setSendRequest] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await logout();

            if (response.ok) {
                dispatch(setUsername(''));
                dispatch(setSessionId(''));

                navigate('/');
            }
        };

        if (sendRequest) {
            fetchData();
            setSendRequest(false);
        }
    }, [sendRequest, dispatch, navigate]);

    const onMouseEnterHandler = () => {
        setLogoutButton(true);
    };

    const onMouseLeaveHandler = () => {
        setLogoutButton(false);
    };

    const onClickHandler = () => {
        setSendRequest(true);
    };

    return (
        logoutButton
            ? (
                <div
                    className="header--logout-btn"
                    onMouseLeave={onMouseLeaveHandler}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    role="button"
                    tabIndex={0}
                >
                    Log out
                </div>
            )
            : (
                <div
                    className="header--logout-btn"
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                >
                    {username}
                </div>
            )
    );
}

Username.propTypes = {
    username: PropTypes.string,
};

Username.defaultProps = {
    username: 'Anonym',
};

export default Username;