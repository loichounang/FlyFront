import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Users.css";
import { UsersList } from "../../../components/admin/lists";
import { UserDetails } from "../../../components/admin/details";
import { IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import { Add } from "@mui/icons-material";
import { CreateUser } from "../../../components/admin/forms";

const UsersAdminPage = () => {
    const [visible, setVisible] = useState(false);
    
    function openModal() {
        setVisible(true);
    };

    function hideModal() {
        setVisible(false);
    };

    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: 'Nom', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Prénom', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Rôle', dataIndex: 'role', key: 'role' },
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
    ];

    return (
        <div className="users">
            <Helmet>
                <title>
                    Fly Academy: Administrator Dashboard (Users Panel)
                </title>
            </Helmet>

            <div className="main">
                <h5 style={{color: "var(--content-title-text-color)", textAlign: "left", padding: "0.5em", marginBottom: "1em", fontSize: "1.5em"}}>
                    Gestion des utilisateurs 
                    <IconButton style={{ background: "dodgerblue", marginLeft: "1rem"}} onClick={() => openModal()}>
                        <Add style={{color: "white "}}/>
                        <CreateUser 
                            visible={visible}
                            onCancel={() => hideModal()}
                        />
                    </IconButton>
                </h5>

                <div className="row">
                    <div className="col-7">
                        <UsersList 
                            dataColumns={columns}
                        />
                    </div>

                    <div className="col-5">
                        <UserDetails />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersAdminPage;