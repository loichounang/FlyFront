import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import APIBaseURL from "../../../services/ApiServices";
import axios from "axios";
import { WarningRounded } from "@mui/icons-material";
import "./AlertSummary.css";

const AlertSummary = ({ contentURL }) => {
    const [alerts, setAlerts] = useState([
        { severity: "high", message: "Erreur critique dans le système" },
        { severity: "medium", message: "Problème de sécurité détecté" },
        { severity: "low", message: "Incohérence mineure dans les données" }
    ]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get(APIBaseURL + contentURL);
                if (response.data && response.data.length > 0) {
                    setAlerts(response.data);
                }
            } catch (error) {
                console.error("Error fetching alerts: ", error);
            }
        };

        fetchAlerts();
    }, [contentURL]);

    return (
        <Card className="alert-card" style={{border: "none"}}>
            <Card.Header className="alert-card-header">
                <WarningRounded /> Alertes Critiques
            </Card.Header>
            <ListGroup variant="flush">
                {alerts.map((alert, index) => (
                    <ListGroup.Item
                        key={index}
                        className={`alert-item alert-${alert.severity}`}
                    >
                        {alert.message}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default AlertSummary;
