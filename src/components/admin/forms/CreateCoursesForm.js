import { Modal, Form, Input, Select, InputNumber } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import APIBaseURL from "../../../services/ApiServices";

const CreateCoursesForm = ({visible, onCreate, onCancel, contentURL, contentURL1, contentURL2}) => {

    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [adminList, setAdminList] = useState([]);
    const [coursesCategories, setCoursesCategories] = useState([]);

    const handleFinish = (values) => {
        // Appeler une API ou gérer la création des cours ici
        const post = axios.post("http://" + APIBaseURL + contentURL)
        onCreate(values);
        form.resetFields();
    };

    //Récupérer la liste des utilisateurs
    useEffect(() => {
        const data = [
            {id: 1, first_name: "Akim", last_name: "Julien"},
            {id: 2, first_name: "Hounang", last_name: "Loïc"},
            {id: 3, first_name: "Maeva", last_name: "BS"},
        ]
        setAdminList(data);
    }, []);

    //Récupérer la liste des catégories de cours
    useEffect(() => {
        const coursesData = [
            {id: 1, name: "Bases de données"},
            {id: 2, name: "Analyse"},
            {id: 3, name: "Developpement Web"},
            {id: 4, name: "Data Science"},
            {id: 5, name: "Conception graphique"},
            {id: 6, name: "Web Thinking"},
            {id: 7, name: "Web Design"},
            {id: 8, name: "Prototypage"},
            {id: 9, name: "Secrétariat"},
        ]
        setCoursesCategories(coursesData);
    }, []);

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
            <div style={{ background: "linear-gradient(135deg, #eabeac 45%, #fceabb 75%)", animation: "gradient 5s ease infinite", padding: "15px"}}>
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
                                    <option key={index} value={user.id}>{user.first_name} {user.last_name}</option>
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