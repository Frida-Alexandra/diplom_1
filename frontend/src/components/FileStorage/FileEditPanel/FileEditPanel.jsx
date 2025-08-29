import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FileRenameForm from './FileRenameForm';
import DeleteFileSubmitForm from './DeleteFileSubmitForm';
import GetLinkForm from './GetLinkForm';
import ChangeCommentForm from './ChangeCommentForm';
import { downloadFile, getDownloadLink, BASE_URL } from '../../../api/requests';
import { setCurrentFile, selectCurrentFile, setDownloadLink, clearDownloadLink } from 'frontend/src/redux/slices/fileSlice.js';
import './FileEditPanel.css';

function FileEditPanel() {
    const dispatch = useDispatch();
    const currentFile = useSelector(selectCurrentFile);
    const [patchForm, setPatchForm] = useState();
    const downloadLink = useSelector(selectDownloadLink);

    const onClickHandler = (action) => {
        if (action === 'download') {
            const downloadFileHandler = async () => {
                const response = await getDownloadLink(currentFile.id);
                const data = await response.json();

                const downloadResponse = await downloadFile(data.link);
                const downloadData = await downloadResponse.blob();

                const fileURL = window.URL.createObjectURL(downloadData);
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = currentFile.native_file_name;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // После успешной загрузки сбрасываем текущий файл
                dispatch(clearCurrentFile());
            };

            downloadFileHandler();
        }

        if (action === 'getLink') {
            const getLink = async () => {
                const response = await getDownloadLink(currentFile.id);
                const data = await response.json();

                const link = `${BASE_URL}link/${data.link}/`;
                dispatch(setDownloadLink(link));
            };

            getLink();
        }

        setPatchForm(action);
    };

    return (
        <>
            <div className="file-edit-panel">
                <div className="file-edit-panel--item" onClick={() => onClickHandler('rename')} onKeyDown={() => onClickHandler('rename')} role="button" tabIndex={0}>Rename</div>
                <div className="file-edit-panel--item" onClick={() => onClickHandler('changeComment')} onKeyDown={() => onClickHandler('changeComment')} role="button" tabIndex={0}>Change comment</div>
                <div className="file-edit-panel--item" onClick={() => onClickHandler('download')} onKeyDown={() => onClickHandler('download')} role="button" tabIndex={0}>Download</div>
                <div className="file-edit-panel--item" onClick={() => onClickHandler('getLink')} onKeyDown={() => onClickHandler('getLink')} role="button" tabIndex={0}>Get download link</div>
                <div className="file-edit-panel--item" onClick={() => onClickHandler('delete')} onKeyDown={() => onClickHandler('delete')} role="button" tabIndex={0}>Delete</div>
            </div>
            {patchForm === 'rename' && (
                <FileRenameForm
                    currentFile={currentFile}
                    setForm={setPatchForm}
                />
            )}
            {patchForm === 'changeComment' && (
                <ChangeCommentForm
                    currentFile={currentFile}
                    setForm={setPatchForm}
                />
            )}
            {patchForm === 'delete' && (
                <DeleteFileSubmitForm
                    currentFile={currentFile}
                    setForm={setPatchForm}
                />
            )}
            {patchForm === 'getLink' && downloadLink && (
                <GetLinkForm
                    link={downloadLink}
                    setForm={setPatchForm}
                />
            )}
        </>
    );
}

FileEditPanel.propTypes = {
    setCurrentFile: PropTypes.func.isRequired,
    setFiles: PropTypes.func.isRequired,
};

export default FileEditPanel;