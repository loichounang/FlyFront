import React from "react";
import { AdminCourseDetails } from "../../../components/admin/details";

const CoursDetailPage = () => {

    return (
        <div className="cours-details" style={{color: "white", minHeight: "100vh", marginBottom: "2rem", overflowY: "auto"}}>
            <AdminCourseDetails />
        </div>
    );
};

export default CoursDetailPage;