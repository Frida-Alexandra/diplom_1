import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileInput from './FileEditPanel/FileInput';
import FileList from './FileList/FileList';
import FileEditPanel from './FileEditPanel/FileEditPanel';
import { postFile, getFiles, getUserFiles } from '../../api/requests';
import { selectCurrentUser } from 'frontend/src/redux/slices/userSlice.js';
import { setFiles, addFile, selectFiles } from 'frontend/src/redux/slices/fileSlice.js';

function FileStorage() {
    const dispatch = useDispatch();
    const [currentFile, setCurrentFile] = useState();
    const currentStorageUserId = useSelector(selectCurrentUser);
    const files = useSelector(selectFiles);

    useEffect(() => {
        const fetchData = async () => {
            let response;

            if (currentStorageUserId) {
                response = await getUserFiles(currentStorageUserId);
            } else {
                response = await getFiles();
            }

            const data = await response.json();
            dispatch(setFiles(data));
        };

        fetchData();
    }, [currentStorageUserId, dispatch]);

    const sendFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', '');
        const response = await postFile(formData);
        const data = await response.json();

        dispatch(addFile(data));
    };

    return (
        <>
            <FileList
                fileList={files}
                setCurrentFile={setCurrentFile}
                currentFile={currentFile}
            />
            <FileInput sendFile={sendFile} />
            {currentFile && (
                <FileEditPanel
                    currentFile={currentFile}
                    setFiles={dispatch(setFiles)}
                    setCurrentFile={setCurrentFile}
                />
            )}
        </>
    );
}

export default FileStorage;