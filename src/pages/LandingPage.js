import React from "react";
import "../style/LandingPage.css"; 
const LandingPage = () => {

    const handleLogin = () => {
        window.location.href = "/login"; // adjust path if using React Router
    };

    const handleRegister = () => {
        window.location.href = "/register"; // adjust path if using React Router
    };

    return (
        <div className="landing-page">
            <header className="landing-header">
                <div className="logo">Sora Analytics</div>
                <nav>
                   
                </nav>
                <div className="auth-buttons">
                    <button className="signin" onClick={handleLogin}>Sign in</button>
                    <button className="get-started" onClick={handleRegister}>Get started</button>
                </div>
            </header>

            <main className="hero-section">
                <div className="hero-content">
                    <h1>
                        Turn Data into Insights,<br />
                        <span>Faster than You Think.</span>
                    </h1>
                    <p>
                        Build intelligent dashboards in minutes — no complex setup, no steep learning curve. Just smart, stunning visualizations.
                    </p>

                    <div className="hero-buttons">
                     
                        <button className="explore">Explore more</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img
                        src="https://via.placeholder.com/600x320.png?text=Dashboard+Preview"
                        alt="Dashboard Preview"
                    />
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
