import { Modal, Form, Input, Select, InputNumber } from "antd";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
//import APIBaseURL from "../../../services/ApiServices";

const CreateCoursesForm = ({visible, onCreate, onCancel, contentURL, contentURL1, contentURL2}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [adminList, setAdminList] = useState([]);
    const [coursesCategories, setCoursesCategories] = useState([]);

    const handleFinish = async (values) => {
        // Appeler une API ou gérer la création des cours ici
        try {
            const response = await axios.post(`http://127.0.0.1:8000/${contentURL}`);
            if(response.status >= 200 && response.status <= 300){
                enqueueSnackbar(response.data.message, {
                    autoHideDuration: 4000,
                    variant: "success",
                });
            }
        } catch (error) {
            switch (error.response?.status) {
                case 500:
                    enqueueSnackbar(error.response?.data.detail, {
                        autoHideDuration: 4000,
                        variant: "success",
                    });
                    break;
                case 404:
                    enqueueSnackbar(error.response?.data.detail, {
                        autoHideDuration: 4000,
                        variant: "success",
                    });
                    break;
                case 403:
                    enqueueSnackbar(error.response?.data.detail, {
                        autoHideDuration: 4000,
                        variant: "success",
                    });
                    break;
                case 401:
                    enqueueSnackbar(error.response?.data.detail, {
                        autoHideDuration: 4000,
                        variant: "success",
                    });
                    break;
            
                default:
                    enqueueSnackbar(error.response?.data.detail || " Une erreur innatendue s'est produite lors de la création du cours", {
                        autoHideDuration: 4000,
                        variant: "success",
                    });
                    break;
            }
        }
        form.resetFields();
    };

    //Récupérer la liste des utilisateurs
    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${contentURL2}`);
                setAdminList(response.data);
            } catch (error) {
                switch (error.response?.status) {
                    case 500:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 404:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 403:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 401:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                
                    default:
                        enqueueSnackbar(error.response?.data.detail || " Une erreur innatendue s'est produite lors de la récupération de la liste des utilisateurs", {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    }
                }
        };

        fetchUsers();
    }, [contentURL2, enqueueSnackbar]);

    //Récupérer la liste des catégories de cours
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/${contentURL1}`);
                setCoursesCategories(response.data);
            } catch (error) {
                switch (error.response?.status) {
                    case 500:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 404:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 403:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                    case 401:
                        enqueueSnackbar(error.response?.data.detail, {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                
                    default:
                        enqueueSnackbar(error.response?.data.detail || " Une erreur innatendue s'est produite lors de la récupération des catégories", {
                            autoHideDuration: 4000,
                            variant: "error",
                        });
                        break;
                }
            }
        }

        fetchCategories();
    }, [contentURL1, enqueueSnackbar]);

    return (
        <Modal
            open={visible}
            title="Créer un nouveau cours"
            okText="Créer"
            cancelText="Annuler"
            onCancel={() => {
                onCancel();
                form.resetFields();
                setErrorMessage("");
            }}
            onOk={() => {
                form
                .validateFields()
                .then((values) => {
                    handleFinish(values);
                }).catch((info) => {
                    console.log('Validation Failed:', info);
                });
            }}
            styles={{ padding: '0' }}
            centered
        >
            <div style={{ animation: "gradient 5s ease infinite", padding: "15px", color: "var(--courses-form-color)"}}>
                <Form
                    form={form}
                    layout="horizontal"
                    name="create_course"
                    onFinish={handleFinish}
                >
                    {errorMessage !== "" ? (
                        <span style={{color: "red"}}>{errorMessage}</span>
                    ) : (
                        <p >
                        </p>
                    )}
                    <Form.Item
                        name="titre"
                        label="Titre du cours"
                        rules={[{ required: true, message: 'Veuillez donner un titre à votre cours' }]}
                    >
                        <Input placeholder="Titre du cours" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Veuillez fournir une description du contenu du cours' }]}
                    >
                        <Input placeholder="Description" aria-multiline="true" />
                    </Form.Item>

                    <Form.Item
                        name="auteur"
                        label="Auteur du cours"
                        rules={[{ required: true, message: 'Selectionnez un utilisateur' }]}
                    >
                        <Select>
                            {adminList.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>{user.nom} {user.prénom}</option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="fichier"
                        label="Pièce Jointe"
                        rules={[{ required: false }]}
                    >
                        <Input type="file" placeholder="Ajoutez une pièce jointe à votre cours" />
                    </Form.Item>

                    <Form.Item
                        name="objectifs"
                        label="Objectifs"
                        rules={[{ required: true, message: 'Veuillez lister les objectifs du cours' }]}
                    >
                        <Input placeholder="Entrez les objectifs séparés par une virgule" aria-multiline="true" />
                    </Form.Item>

                    <Form.Item
                        name="duree"
                        label="Durée du cours"
                        rules={[{ required: true }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        name="lien_video"
                        label="Lien Vidéo"
                        rules={[{ required: false}]}
                    >
                        <Input placeholder="Lien vers le cours vidéo"/>
                    </Form.Item>

                    <Form.Item
                        name="categorie"
                        label="Catégorie"
                        rules={[{ required: true, message: "Vous devez selectionner une catégorie d'appartenance pour ce cours"}]}
                    >
                        <Select placeholder="Selectionnez une catégorie pour le cours">
                            {coursesCategories.map((category, index) => {
                                return (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CreateCoursesForm;