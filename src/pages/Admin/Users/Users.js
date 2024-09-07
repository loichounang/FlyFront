import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Users.css";
import { UsersList } from "../../../components/admin/lists";
import { UserDetails } from "../../../components/admin/details";
import { IconButton } from "@mui/material";
import { Button } from "react-bootstrap";
import { Add, } from "@mui/icons-material";
import { CreateUser } from "../../../components/admin/forms";
import { DeleteFilled, InfoCircleFilled } from "@ant-design/icons";

const UsersAdminPage = () => {
    const [visible, setVisible] = useState(false);
    
    function openModal() {
        setVisible(true);
    };

    function hideModal() {
        setVisible(false);
    };

    function showDetailsModal() {
        setVisible(true);
    };

    function hideDetailsModal() {
        setVisible(false);
    }

    const columns = [
        { title: 'id', dataIndex: 'id', key: 'id' },
        { title: 'Nom', dataIndex: 'nom', key: 'nom' },
        { title: 'Prénom', dataIndex: 'prénom', key: 'prénom' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Rôle', dataIndex: 'role', key: 'role' },
        { title: 'Statut', dataIndex: 'statut', key: 'statut' },
        { title: 'Dernière connexion', dataIndex: 'dernier_accès', key: 'dernier_accès' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <>
                    <Button onClick={() => showDetailsModal()} variant="success" size="sm" style={{ margin: "2px"}}><InfoCircleFilled /></Button>
                    <Button onClick={() => hideDetailsModal()} variant="danger" size="sm" style={{ margin: "2px"}}><DeleteFilled /></Button>
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
                    <div className="col">
                        <UsersList 
                            dataColumns={columns}
                        />
                    </div>
                    <UserDetails 
                        isVisible={visible}
                        handleClose={() => hideDetailsModal()}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersAdminPage;