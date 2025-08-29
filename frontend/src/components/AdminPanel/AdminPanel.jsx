import React from 'react';
import { useSelector } from 'react-redux';
import UsersList from './UsersList';
import './AdminPanel.css';

function AdminPanel() {
    const isAdmin = useSelector((state) => state.admin.isAdmin); 

    if (!isAdmin) {
        return (
            <div className="admin-panel--access-denied">
                <span className="content">You do not have access to the administration panel</span>
            </div>
        );
    }
    return <UsersList />;
}

export default AdminPanel;