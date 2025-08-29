import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFile } from '../../../api/requests';
import { selectCurrentUser } from 'frontend/src/redux/slices/userSlice.js';
import '../../formStyle/Form.css';
import img from 'frontend/src/components/formStyle/icons8-close.svg';

function DeleteFileSubmitForm({ currentFile, setForm, setFiles, setCurrentFile }) {
    const dispatch = useDispatch();
    const currentStorageUser = useSelector(selectCurrentUser);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        let response = await deleteFile(currentFile.id, currentStorageUser);
        const data = await response.json();

        if (response.ok) {
            setFiles(data);
            setCurrentFile();
            setForm();
        }
    };

    const onCloseHandler = () => {
        setForm();
    };

    return (
        <form className="form" onSubmit={onSubmitHandler}>
            <h2 className="form--title">Are you sure you want to delete the file?</h2>
            <input type="submit" value="Yes" required />
            <button
                className="close"
                onClick={onCloseHandler}
                type="button"
                aria-label="Close"
            >
                <img src={img} alt="close" />
            </button>
            <div
                className="no"
                onClick={onCloseHandler}
                role="button"
                tabIndex={0}
            >
                No
            </div>
        </form>
    );
}

DeleteFileSubmitForm.propTypes = {
    currentFile: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
    setCurrentFile: PropTypes.func.isRequired,
};

export default DeleteFileSubmitForm;