import React from "react";
import { Helmet } from "react-helmet-async";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Helmet>
                <title>
                    Fly Academy: Learn everything with ease
                </title>
            </Helmet>

            <div className="main">
                Vous êtes sur le dashboard
            </div>
        </div>
    );
};

export default Dashboard;