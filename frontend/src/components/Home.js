import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to Rico Antojo</h1>
                <p>Fulfill your cravings...</p>

                <div className="cloud-container">
                    <div className="cloud">Delicious Treats</div>
                    <div className="cloud">Snacks on the Go</div>
                    <div className="cloud">Satisfy those taste buds</div>
                </div>

                <button className="menu-btn">
                    <Link to={"/menu"}>View Menu </Link>
                </button>
            </div>
        </div>
    );
};

export default Home;
