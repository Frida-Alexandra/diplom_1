import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setCurrentStorageUser } from 'frontend/src/redux/slices/storageSlice.js';

function ToStorageBtn({ userId }) {
    const dispatch = useDispatch();
    
    const onClickHandler = () => {
        dispatch(setCurrentStorageUser(userId)); 
    };

    return (
        <Link
            to="/my-storage"
            onClick={onClickHandler}
            className="to-storage-btn"
        >
            to storage
        </Link>
    );
}

ToStorageBtn.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default ToStorageBtn;