import { Card, CardBody, CardTitle } from "react-bootstrap";
import React, { useState } from "react";
import "./CardsStyles.css";
import { CreateCategories, CreateChapters, CreateLessons } from "../forms";
import { Button } from "@mui/material";

const ActionCard = () => {
    const [modals, setModals] = useState({ chapter: false, lesson: false, category: false });

function toggleModal(type) {
    setModals(prev => ({ ...prev, [type]: !prev[type] }));
}


    return (
        <div className="actions-card">
            <Card style={{background: "#333", color: "white", border: "0.5px solid gainsboro", textAlign: "left", padding: "10px"}}>
                <CardTitle>
                    Autres actions
                </CardTitle>
                <CardBody>
                    <ul style={{listStyleType: "none"}}>
                        <Button className="list-element">Voir les détails</Button>
                        <Button className="list-element">consulter les participants</Button>
                        <Button className="list-element">Afficher les leçons</Button>
                        <Button className="list-element">Voir l'auteur</Button>
                        <Button className="list-element" onClick={() => toggleModal('lesson')}><i className="bi bi-plus-circle" style={{marginRight: "10px"}}></i>Ajouter une leçon</Button>
                        <Button className="list-element" onClick={() => toggleModal('chapter')}><i className="bi bi-plus-circle" style={{marginRight: "10px"}}></i>Ajouter un chapitre</Button>
                        <Button className="list-element" onClick={() => toggleModal('category')}><i className="bi bi-plus-circle" style={{marginRight: "10px"}}></i>Ajouter une catégorie</Button>
                    </ul>
                </CardBody>
            </Card>
            <CreateChapters visible={modals.chapter} onCancel={() => toggleModal('chapter')}/>
            <CreateLessons visible={modals.lesson} onCancel={() => toggleModal('lesson')}/>
            <CreateCategories visible={modals.category} onCancel={() => toggleModal('category')} contentURL="api/cours/categories/" />
        </div> 
    );
};

export default ActionCard;