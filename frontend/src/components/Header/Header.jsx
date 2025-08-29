import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Username from './Username';
import './Header.css';
import UserStorage from './UserStorage';
import { logout } from '../../slices/authSlice';

function Header() {
    const dispatch = useDispatch();
    const { sessionId, username, currentStorageUser } = useSelector((state) => ({
        sessionId: state.auth.sessionId,
        username: state.auth.username,
        currentStorageUser: state.storage.currentUser,
    }));

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <section className="header">
            <div className="header--logo">
                <Link to="/">Cloud_Service</Link>
            </div>
            {currentStorageUser && <UserStorage storageUserId={currentStorageUser} />}
            <div className="header--menu-container">
                {!sessionId ? (
                    <>
                        <div className="header--menu-container--item">
                            <Link to="/sign-in">Sign in</Link>
                        </div>
                        <div className="header--menu-container--item">
                            <Link to="/sign-up">Sign up</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <Username username={username} />
                        <div className="header--menu-container--item">
                            <button onClick={handleLogout} type="button">Logout</button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Header;