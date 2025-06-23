import React, { useState } from 'react';
import ComposeEmail from './ComposeEmail';
import EmailList from './EmailList';
import '../../../style/AdminPanel/Email.css';

const Email = () => {
    const [view, setView] = useState('inbox'); // inbox | sent | compose

    return (
        <div className="email-container">
            <div className="email-sidebar">
                <button onClick={() => setView('compose')}>📧 Compose</button>
                <button onClick={() => setView('inbox')}>📥 Inbox</button>
                <button onClick={() => setView('sent')}>📤 Sent</button>
            </div>
            <div className="email-content">
                {view === 'compose' && <ComposeEmail />}
                {view === 'inbox' && <EmailList type="inbox" />}
                {view === 'sent' && <EmailList type="sent" />}
            </div>
        </div>
    );
};

export default Email;
