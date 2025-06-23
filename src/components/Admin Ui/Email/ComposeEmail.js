import React, { useState } from 'react';
import axios from 'axios';
const ComposeEmail = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSend = async () => {
        try {
            const token = localStorage.getItem('token');
            const emailData = { to, subject, text: body, timestamp: new Date().toISOString() };

            await axios.post('http://localhost:5000/api/email/send', emailData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // ✅ Save to "sentEmails" in localStorage
            const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
            localStorage.setItem('sentEmails', JSON.stringify([...sentEmails, emailData]));

            // (Optional) simulate inbox for testing by storing the same message as received
            const inboxEmails = JSON.parse(localStorage.getItem('inboxEmails') || '[]');
            localStorage.setItem('inboxEmails', JSON.stringify([...inboxEmails, {
                from: 'admin@example.com', // static or dynamic
                subject,
                text: body,
                timestamp: new Date().toISOString()
            }]));

            alert('✅ Email sent successfully');
            setTo('');
            setSubject('');
            setBody('');
        } catch (err) {
            console.error('❌ Email send error:', err);
            alert('Error sending email');
        }
    };



    return (
        <div>
            <h2>Compose Email</h2>
            <input placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
            <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ComposeEmail;
