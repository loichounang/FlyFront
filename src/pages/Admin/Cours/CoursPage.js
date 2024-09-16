import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./CoursPage.css";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
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
                        <CoursesList />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CoursPage;