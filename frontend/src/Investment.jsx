import React from "react";
import { Link } from "react-router-dom";
import "./Investment.css";

const Investment = () => {
    const features = [
        {
            icon: "fa-chart-column",
            title: "Track Stocks",
            description: "Monitor your invested stocks and live performance.",
            color: "purple"
        },
        {
            icon: "fa-chart-pie",
            title: "Portfolio Overview",
            description: "Get a clear view of your total investment and returns.",
            color: "orange"
        },
        {
            icon: "fa-arrow-trend-up",
            title: "Performance Insights",
            description: "Analyze gains, losses and growth over time.",
            color: "green"
        },
        {
            icon: "fa-bell",
            title: "Price Alerts",
            description: "Set alerts and stay updated with market changes.",
            color: "red"
        }
    ];

    return (
        <div className="investmentLanding">

            {/* Navbar */}
            {/* <nav className="investmentNav">
                <Link to="/" className="investmentBrand">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>Super <strong>Finance</strong></span>
                </Link>

                <div className="investmentNavLinks">
                    <Link to="/">Home</Link>
                    <Link to="/expense">Expense</Link>
                    <Link to="/budgets/list">Budget</Link>
                    <Link to="/goals/list">Goal</Link>
                    <Link to="/investment" className="active">Investment</Link>
                </div>

                <Link to="/profile" className="investmentProfile" aria-label="Profile">
                    <i className="fa-solid fa-user"></i>
                </Link>
            </nav> */}

            {/* Hero */}
            <main>
                <section className="investmentHero">

                    <div className="investmentHeroContent">
                        <span className="investmentEyebrow">
                            INVESTMENT
                        </span>

                        <h1>
                            Grow Your Wealth
                            <br />
                            <span>with Smart Investments</span>
                        </h1>

                        <p className="investmentIntro">
                            Track your stock investments, monitor your portfolio,
                            analyze performance and make smarter financial decisions
                            — all in one place with Super Finance.
                        </p>

                        <div className="investmentNotice">
                            <div className="noticeRocket">
                                <i className="fa-solid fa-rocket"></i>
                            </div>

                            <div className="noticeText">
                                <h2>We are working on this feature!</h2>
                                <p>Stock investment tracking will be available soon.</p>
                            </div>

                            <span className="noticeBadge">
                                <i className="fa-regular fa-clock"></i>
                                Coming Soon
                            </span>
                        </div>
                    </div>

                    {/* Illustration */}
                    <div className="investmentArtwork">
                        <div className="artGlow"></div>

                        <img
                            src="/investment.jpg"
                            alt="Stock market dashboard with investment charts and coins"
                            className="investmentArtworkImage"
                        />
                    </div>

                </section>

                {/* Features */}
                <section className="investmentExpect">
                    <h2>
                        What <span>You Can Expect</span>
                    </h2>

                    <p className="expectSubtitle">
                        A simple and powerful way to manage your stock investments.
                    </p>

                    <div className="investmentFeatureGrid">
                        {features.map((feature) => (
                            <article
                                className="investmentFeatureCard"
                                key={feature.title}
                            >
                                <div className={`featureIcon ${feature.color}`}>
                                    <i className={`fa-solid ${feature.icon}`}></i>
                                </div>

                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            {/* <footer className="investmentFooter">
                <p>© {new Date().getFullYear()} Super Finance. All Rights Reserved.</p>
            </footer> */}

        </div>
    );


};

export default Investment;
