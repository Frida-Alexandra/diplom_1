import React from 'react';
import preloader from 'frontend/src/components/Preloader/preloader.gif';
import './Preloader.css';

function Preloader() {
    return (
        <img src={preloader} className="preloader" alt="preloader" />
    );
}

export default Preloader;
