/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);