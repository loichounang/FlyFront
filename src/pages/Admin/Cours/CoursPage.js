import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CoursPage.css";
import { IconButton, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { CreateCourses } from "../../../components/admin/forms";
import { CoursesList } from "../../../components/admin/lists";
import { ActionCard } from "../../../components/admin/cards";

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
        {title: "Durée", dataIndex: "durée", key: "durée"},
        {title: "Catégorie", dataIndex: "category", key: "category"},
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => {/* Fonction d'édition */}}>Modifier</Button>
                    <Button onClick={() => {/* Fonction de suppression */}} danger>Supprimer</Button>
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
                    contentURL="api/cours/cours/"
                    contentURL1="api/cours/categories/"
                    contentURL2={`api/utilisateurs/utilisateurs/${localStorage.getItem("uid")}/get_admins`}
                />

                <div className="row">
                    <div className="col-9">
                        <CoursesList 
                            dataColumns={columns}
                        />
                    </div>

                    <div className="col-3">
                        <ActionCard />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoursPage;