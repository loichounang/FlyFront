import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CoursPage.css";
import { IconButton, Button } from "@mui/material";
import { Add, Delete, Edit, Info } from "@mui/icons-material";
import { CreateCourses } from "../../../components/admin/forms";
import { CoursesList } from "../../../components/admin/lists";

const CoursPage = () => {
    const [visible, setVisible] = useState(false);

    function showForm() {
        setVisible(true);
    }

    function hideForm() {
        setVisible(false);
    }

    const columns = [
        {title: "ID", dataIndex: "id", key: "id"},
        {title: "Titre", dataIndex: "titre", key: "titre"},
        {title: "Auteur", dataIndex: "auteur", key: "auteur"},
        {title: "Durée (heures)", dataIndex: "durée", key: "durée"},
        {title: "Catégorie", dataIndex: "category", key: "category"},
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => {/* Fonction d'édition */}}><Info style={{color: "slateblue"}}/></Button>
                    <Button onClick={() => {/* Fonction de suppression */}}><Delete style={{color: "crimson"}}/></Button>
                    <Button onClick={() => {/* Fonction de suppression */}}><Edit style={{color: "darkgreen"}}/></Button>
                </>
            ),
        },
    ]

    return (
        <div className="cours">
            <Helmet>
                <title>
                    Fly Academy: Administrator Dashboard (Courses Panel)
                </title>
            </Helmet>

            <div className="main">
                <h5 style={{color: "var(--content-title-text-color)", textAlign: "left", padding: "0.5em", marginBottom: "1em", fontSize: "1.5em"}}>
                    Gestion des cours <IconButton style={{background: "slateblue", color: "white", marginLeft: "1rem"}} onClick={() => showForm()}> <Add /> </IconButton>
                </h5>
                <CreateCourses 
                    visible={visible}
                    onCancel={() => hideForm()}
                />

                <div className="row">
                    <div className="col">
                        <CoursesList 
                            dataColumns={columns}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoursPage;