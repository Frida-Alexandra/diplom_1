import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { patchFile } from '../../../api/requests';
import { selectCurrentUser } from 'frontend/src/redux/slices/userSlice.js';
import '../../formStyle/Form.css';
import img from 'frontend/src/components/formStyle/icons8-close.svg';

function ChangeCommentForm({ currentFile, setForm, setFiles }) {
    const newComment = useRef();
    const dispatch = useDispatch();
    const currentStorageUser = useSelector(selectCurrentUser);

    useEffect(() => {
        newComment.current.value = currentFile.comment;
    }, [currentFile]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const patchData = { ...currentFile, comment: newComment.current.value };
        let response = await patchFile(patchData, currentStorageUser);

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
            <h2 className="form-title">Change comment</h2>
            <textarea type="text" placeholder="New comment" ref={newComment} />
            <input type="submit" value="OK" required />
            <button
                className="close"
                onClick={onCloseHandler}
                type="button"
                aria-label="Close"
            >
                <img src={img} alt="Close" />
            </button>
        </form>
    );
}

ChangeCommentForm.propTypes = {
    currentFile: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
};

export default ChangeCommentForm;