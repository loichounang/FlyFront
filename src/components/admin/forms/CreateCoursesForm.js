import { Modal, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { CreateCours } from "../../../services/CoursServices/CoursServices";
import { Spinner } from "react-bootstrap";
import { ListAllCategories } from "../../../services/CategoriesServices/CategoriesServices";
import { ListAllAdministrators } from "../../../services/UsersServices/UsersServices";
import useNotification from "../../common/UseNotification";

const CreateCoursesForm = ({ visible, onCancel }) => {
    const notify = useNotification();
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const [adminList, setAdminList] = useState([]);
    const [coursesCategories, setCoursesCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("Fichier sélectionné:", file);
        setSelectedFile(file);
    };

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            
            // Ajouter les autres données du formulaire à FormData
            formData.append('titre', values.titre);
            formData.append('description', values.description);
            formData.append('auteur', values.auteur);
            formData.append('objectifs', values.objectifs);
            formData.append('categorie', values.categorie);
            
            // Ajouter l'image sélectionnée (si présente)
            if (selectedFile) {
                console.log("Image ajoutée à FormData:", selectedFile);
                formData.append('image', selectedFile);  // Envoi du fichier image
            }
        
            // Ajouter lien_video seulement si une URL est fournie
            if (values.lien_video) {
                formData.append('lien_video', values.lien_video);
            }

             // Log pour voir ce qui est ajouté à formData
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        
            const response = await CreateCours(formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });  // Envoi via Axios
        
            if (response >= 200 && response <= 300) {
                notify("Le nouveau cours a été ajouté avec succès", "success", 5000);
            } else {
                notify("Une erreur inattendue s'est produite lors de la création du cours !", "error", 5000);
            }
        } catch (error) {
            notify("Une erreur s'est produite : " + error.message, "error");
        } finally {
            form.resetFields();
            setLoading(false);
        }
    };

    const fetchAdministrators = async () => {
        try {
            const response = await ListAllAdministrators(localStorage.getItem("uid"));
            setAdminList(Array.isArray(response) ? response : []);
        } catch (error) {
            notify("Une erreur est survenue lors de la récupération des administrateurs", "error", 3000);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await ListAllCategories();
            setCoursesCategories(Array.isArray(response) ? response : []);
        } catch (error) {
            notify("Une erreur est survenue lors de la récupération des catégories", "error", 3000);
        }
    };

    return (
        <Modal
            open={visible}
            title="Créer un nouveau cours"
            okText={loading ? <Spinner /> : "Créer"}
            loading={loading}
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
                    })
                    .catch((info) => {
                        console.log("Validation Failed:", info);
                    });
            }}
            centered
        >
            <div>
                <Form
                    form={form}
                    layout="horizontal"
                    name="create_course"
                    onFinish={handleFinish}
                    encType="multipart/form-data"
                >
                    {errorMessage && <span style={{color: "red"}}>{errorMessage}</span>}
                    
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
                        <Input.TextArea placeholder="Description" rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="auteur"
                        label="Auteur du cours"
                        rules={[{ required: true, message: 'Sélectionnez un utilisateur' }]}
                    >
                        <Select onClick={fetchAdministrators}>
                            {adminList.map((user, index) => (
                                <Select.Option key={index} value={user.id}>{user.nom} {user.prénom}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="objectifs"
                        label="Objectifs"
                        rules={[{ required: true, message: 'Veuillez lister les objectifs du cours' }]}
                    >
                        <Input placeholder="Entrez les objectifs séparés par une virgule" />
                    </Form.Item>

                    <Form.Item
                        name="lien_video"
                        label="Lien Vidéo"
                        rules={[{ required: false }]}
                    >
                        <Input placeholder="Lien vers le cours vidéo" />
                    </Form.Item>

                    <Form.Item
                        name="categorie"
                        label="Catégorie"
                        rules={[{ required: true, message: 'Veuillez sélectionner une catégorie pour ce cours' }]}
                    >
                        <Select placeholder="Sélectionnez une catégorie" onClick={fetchCategories}>
                            {coursesCategories.map((category, index) => (
                                <Select.Option key={index} value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image du cours"
                        rules={[{ required: false }]}
                    >
                        <Input type="file" onChange={handleFileChange} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default CreateCoursesForm;
