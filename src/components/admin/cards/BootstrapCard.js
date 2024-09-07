import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
//import CountUp from "react-countup";
import axios from "axios";
import "./CardsStyles.css";

const BootstrapCard = ({ title, icon, styles, contentURL }) => {
    const [cardContent, setCardContent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      const fetchContent = async () => {
        setLoading(true);
        try {
          // Récupération du token d'authentification de l'utilisateur connecté (depuis le localStorage par exemple)
          const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké au moment de la connexion

          // Configuration des en-têtes avec le token
          const config = {
            headers: {
              Authorization: `Token ${token}`, // Remplacez "Token" par "Bearer" si le backend attend un token de ce type
            },
          };

          const response = await axios.get(`http://127.0.0.1:8000/${contentURL}`, config);
          if (response.status >= 200 && response.status <= 300) {
            setCardContent(response.data);
          } else {
            alert("Nous n'avons pas pu récupérer les données");
          }
        } catch (error) {
          switch (error?.response.status) {
            case 500:
              setErrorMessage("Erreur interne du serveur");
              break;
            case 404:
              setErrorMessage("L'adresse spécifiée est introuvable");
              break;
            case 403:
              setErrorMessage("Vous n'avez pas l'autorisation pour accéder à ces données");
              break;
            default:
              setErrorMessage("Une erreur inattendue s'est produite");
              break;
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchContent();
    }, [contentURL]);
  
    return (
      <Card style={{ ...styles, border: "none", color: "white" }} className="bootstrap-cards">
        <Card.Header className="bootstrap-cards-headers">
          {title} 
          <span className="card-icon-right">
            {icon}
          </span>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            <div className="card-content">
              {cardContent.length}
            </div>
          )}
          <p>{errorMessage}</p>
        </Card.Body>
      </Card>
    );
  };
  
  export default BootstrapCard;  