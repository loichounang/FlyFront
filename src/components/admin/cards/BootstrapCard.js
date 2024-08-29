import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
//import CountUp from "react-countup";
import APIBaseURL from "../../../services/ApiServices";
import axios from "axios";
import "./CardsStyles.css";

const BootstrapCard = ({ title, content, icon, styles, contentURL }) => {
    const [cardContent, setCardContent] = useState(content);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      const fetchContent = async () => {
        setLoading(true);
        try {
          const response = await axios.get(APIBaseURL + contentURL);
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
              {cardContent}
            </div>
          )}
          <p>{errorMessage}</p>
        </Card.Body>
      </Card>
    );
  };
  
  export default BootstrapCard;  