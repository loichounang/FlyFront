import { Card, CardBody, CardTitle } from "react-bootstrap";
import React, { useState } from "react";
import "./CardsStyles.css";
import { CreateCategories, CreateChapters, CreateLessons } from "../forms";

const ActionCard = () => {
    const [chapterOpen, setChapterOpen] = useState(false);
    const [lessonOpen, setLessonOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    // Show Modal
    function showChapterModal() {
        setChapterOpen(true);
    }
    // Hide Modal
    function hideChapterModal() {
        setChapterOpen(false);
    }

    // Show Lessons Modal
    // Show Modal
    function showLessonModal() {
        setLessonOpen(true);
    }
    // Hide Modal
    function hideLessonModal() {
        setLessonOpen(false);
    }

    // Show Categories Modal
    // Show Modal
    function showCategoryModal() {
        setCategoryOpen(true);
    }
    // Hide Modal
    function hideCategoryModal() {
        setCategoryOpen(false);
    }

    return (
        <div className="actions-card">
            <Card style={{background: "#333", color: "white", border: "0.5px solid gainsboro", textAlign: "left", padding: "10px"}}>
                <CardTitle>
                    Autres actions
                </CardTitle>
                <CardBody>
                    <ul style={{listStyleType: "none"}}>
                        <li className="list-element">Voir les détails</li>
                        <li className="list-element">consulter les participants</li>
                        <li className="list-element">Afficher les leçons</li>
                        <li className="list-element">Voir l'auteur</li>
                        <li className="list-element" onClick={() => showLessonModal()}>Ajouter une leçon</li>
                        <li className="list-element" onClick={() => showChapterModal()}>Ajouter un chapitre</li>
                        <li className="list-element" onClick={() => showCategoryModal()}>Ajouter une catégorie</li>
                    </ul>
                </CardBody>
            </Card>
            <CreateChapters visible={chapterOpen} onCancel={() => hideChapterModal()}/>
            <CreateLessons visible={lessonOpen} onCancel={() => hideLessonModal()}/>
            <CreateCategories visible={categoryOpen} onCancel={() => hideCategoryModal()}/>
        </div> 
    );
};

export default ActionCard;