import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../../formStyle/Form.css';
import img from 'frontend/src/components/formStyle/icons8-close.svg';
import { patchFile } from '../../../api/requests';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'frontend/src/redux/slices/userSlice.js';

function FileRenameForm({ currentFile, setForm, setFiles }) {
    const newFileName = useRef();
    const currentStorageUser = useSelector(selectCurrentUser); 
    useEffect(() => {
        newFileName.current.value = currentFile.native_file_name;
    }, [currentFile.native_file_name]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const patchData = { ...currentFile, native_file_name: newFileName.current.value };

        let response;
        if (currentStorageUser) {
            response = await patchFile(patchData, currentStorageUser);
        } else {
            response = await patchFile(patchData);
        }

        const data = await response.json();
        if (response.ok) {
            setFiles(data);
            setForm();
        }
    };

    const onCloseHandler = () => {
        setForm();
    };

    return (
        <form className="form" onSubmit={onSubmitHandler}>
            <h2 className="form-title">Rename file</h2>
            <input type="text" placeholder="new name" ref={newFileName} required />
            <input type="submit" value="OK" />
            <button
                className="close"
                onClick={onCloseHandler}
                type="button"
                aria-label="Close"
            >
                <img
                    src={img}
                    alt="close"
                />
            </button>
        </form>
    );
}

FileRenameForm.propTypes = {
    currentFile: PropTypes.instanceOf(Object).isRequired,
    setForm: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
};

export default FileRenameForm;