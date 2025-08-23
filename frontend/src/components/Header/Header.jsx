import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Username from './Username';
import Context from '../../GlobalState/state';
import './Header.css';
import UserStorage from './UserStorage';

function Header() {
    const { sessionId, username, currentStorageUser } = useContext(Context);

    return (
        <section class="header">
            <div
                class="header--logo"
            >
                <Link
                    to="/"
                >
                    Cloud_Service
                </Link>
            </div>
            {currentStorageUser
                ? <UserStorage storageUserId={currentStorageUser} />
                : null}
            <div class="header--menu-container">
                {
                    !sessionId
                        ? (
                            <>
                                <div
                                    class="header--menu-container--item"
                                >
                                    <Link
                                        to="/sign-in"
                                    >
                                        Sign in
                                    </Link>
                                </div>
                                <div
                                    class="header--menu-container--item"
                                >
                                    <Link
                                        to="/sign-up"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </>
                        )
                        : <Username username={username} />
                }

            </div>
        </section>
    );
}

export default Header;