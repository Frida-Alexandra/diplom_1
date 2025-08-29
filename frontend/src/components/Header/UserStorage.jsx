import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStorageUser } from '../../features/storageSlice';

function UserStorage({ storageUserId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClickHandler = () => {
        dispatch(setCurrentStorageUser(null));
        navigate('/');
    };

    return (
        <div className="storage-user">
            <span className="storage-user-id">
                {`User storage with ID ${storageUserId}`}
            </span>
            <button
                className="storage-user--exit-btn"
                type="button"
                onClick={onClickHandler}
            >
                Leave storage
            </button>
        </div>
    );
}

UserStorage.propTypes = {
    storageUserId: PropTypes.number.isRequired,
};

export default UserStorage;