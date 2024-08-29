import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import APIBaseURL from "../../../services/ApiServices";
import axios from "axios";
import { Notifications } from "@mui/icons-material";
import "./NotificationList.css";

const NotificationList = ({ contentURL }) => {
    const [notifications, setNotifications] = useState([
        { message: "Nouvel utilisateur inscrit" },
        { message: "Nouveau message reçu" },
        { message: "Cours mis à jour" }
    ]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(APIBaseURL + contentURL);
                if (response.data && response.data.length > 0) {
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error("Error fetching notifications: ", error);
            }
        };

        fetchNotifications();
    }, [contentURL]);

    return (
        <Card className="notification-card" style={{border: "none"}}>
            <Card.Header className="notification-card-header">
                <Notifications /> Notifications Récentes
            </Card.Header>
            <ListGroup variant="flush">
                {notifications.map((notification, index) => (
                    <ListGroup.Item key={index} className="notification-item">
                        {notification.message}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Card>
    );
};

export default NotificationList;
