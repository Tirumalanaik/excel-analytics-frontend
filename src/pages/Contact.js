import React, { useState } from "react";
import axios from "axios";
import "../style/contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send email via backend
            await axios.post('http://localhost:5000/api/email/send', {
                from: formData.email, //
                to: "tirukush2000@gmail.com", // Admin email
                subject: `Contact: ${formData.subject}`,
                text: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
                `.trim()
            });

            // Save to inboxEmails for Admin Panel UI
            const inboxEmails = JSON.parse(localStorage.getItem('inboxEmails') || '[]');
            const newEmail = {
                from: formData.email,
                subject: formData.subject,
                text: formData.message,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('inboxEmails', JSON.stringify([...inboxEmails, newEmail]));

            alert("✅ Message sent successfully!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });

        } catch (err) {
            console.error("❌ Failed to send:", err);
            alert("❌ Failed to send message. Try again.");
        }
    };

    return (
        <div className="contact-container">
            <h1><span className="highlight">Contact</span> Me</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="left">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>
                <div className="right">
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={10}
                        required
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="button-container">
                    <button type="submit">Send Message</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;
