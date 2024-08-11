import React from "react";
import { Helmet } from "react-helmet-async";
import "./Settings.css";

const Settings = () => {
    return (
        <div className="settings">
            <Helmet>
                <title>
                    Fly Academy: Learn everything with ease - Paramètres
                </title>
            </Helmet>

            <div>
                Vous êtes sur les settings
            </div>
        </div>
    );
};

export default Settings;