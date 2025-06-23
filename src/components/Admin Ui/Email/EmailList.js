import React from 'react';

const EmailList = ({ type }) => {
    const emails = JSON.parse(localStorage.getItem(`${type}Emails`) || '[]');

    // Only show emails from users in inbox (exclude admin-sent)
    const filteredEmails = type === 'inbox'
        ? emails.filter(email => email.from && email.from !== 'admin@example.com')
        : emails;

    return (
        <div>
            <h2>{type === 'inbox' ? 'Inbox (User Messages)' : 'Sent Emails'}</h2>

            {filteredEmails.length === 0 ? (
                <p>No emails</p>
            ) : (
                <ul>
                    {filteredEmails.map((email, index) => (
                        <li key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}className="email-item">
>
                            {type === 'inbox' ? (
                                <>
                                    <strong>From:</strong> {email.from || 'unknown'}<br />
                                    {email.name && <><strong>Name:</strong> {email.name}<br /></>}
                                    {email.phone && <><strong>Phone:</strong> {email.phone}<br /></>}
                                </>
                            ) : (
                                <>
                                    <strong>To:</strong> {email.to}<br />
                                </>
                            )}
                            <strong>Subject:</strong> {email.subject}<br />
                            <strong>Message:</strong> {email.text}<br />
                            <small>{new Date(email.timestamp).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmailList;
