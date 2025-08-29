import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setIsStaff } from 'frontend/src/redux/slices/staffSlice.js'; 

function IsStaffBtn({ onClickHandler }) {
    const dispatch = useDispatch();
    const isStaff = useSelector((state) => state.staff.isStaff); 

    const isStaffHandler = () => {
        const newIsStaff = !isStaff;
        dispatch(setIsStaff(newIsStaff)); 
        onClickHandler('PATCH');
    };

    return (
        <div
            className={`is-staff-btn-container ${isStaff ? 'on' : 'off'}`}
            role="button"
            onClick={isStaffHandler}
            onKeyDown={isStaffHandler}
            tabIndex={0}
        >
            <div className="is-staff-btn" />
        </div>
    );
}

IsStaffBtn.propTypes = {
    onClickHandler: PropTypes.func.isRequired,
};

export default IsStaffBtn;