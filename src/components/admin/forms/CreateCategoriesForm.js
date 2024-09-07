import { Modal, Form, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
//import APIBaseURL from "../../../services/ApiServices";

const CreateCategoryForm = ({ visible, onCreate, onCancel, contentURL }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleFinish = async (values) => {
    try {
      // Récupération du token d'authentification de l'utilisateur connecté
      const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké lors de la connexion
  
      // Configuration des en-têtes avec le token
      const config = {
        headers: {
          Authorization: `Token ${token}`, // Assurez-vous que le backend attend un token de ce type
        },
      };
      // Appel API pour créer une nouvelle catégorie
      const response = await axios.post(`http://127.0.0.1:8000/${contentURL}`, values, config);
      if(response.status >= 200 && response.status <= 300){
        enqueueSnackbar(response.data.message, {
          autoHideDuration: 3000,
          variant: "success",
        });
      }
      onCreate(values);
      form.resetFields();
    } catch (error) {
      switch (error.response?.status) {
        case 500:
          enqueueSnackbar(error.response?.data.detail || "Erreur interne du serveur!", {
            autoHideDuration: 5000,
            variant: "error",
          });
          break;
        case 401:
          enqueueSnackbar(error.response?.data.detail || "Vous ne pouvez pas accéder à cette ressource!", {
            autoHideDuration: 5000,
            variant: "error",
          });
          break;
        case 404:
          enqueueSnackbar(error.response?.data.detail || "Chemin Incorrect ou manquant!", {
            autoHideDuration: 5000,
            variant: "error",
          });
          break;
        case 403:
          enqueueSnackbar(error.response?.data.detail || "Oups! Vous n'y avez pas droit!", {
            autoHideDuration: 5000,
            variant: "error",
          });
          break;
        case 301:
          enqueueSnackbar(error.response?.data.detail || "La ressource a été définitivement déplacée!", {
            autoHideDuration: 5000,
            variant: "info",
          });
          break;
      
        default:
          enqueueSnackbar(error.response?.data.detail || "Une erreur inattendue empêche la création de la catégorie!", {
            autoHideDuration: 5000,
            variant: "info",
          });
          break;
      }
    }
  };

  return (
    <Modal
      open={visible}
      title="Créer une nouvelle catégorie"
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
          })
          .catch((info) => {
            console.log("Validation Failed:", info);
          });
      }}
      centered
      style={{ padding: 0 }}
    >
      <div style={{ background: "linear-gradient(135deg, #eabeea 45%, #fceabb 75%)", animation: "gradient 5s ease infinite" }}>
        <Form
          form={form}
          layout="vertical"
          name="create_category"
          onFinish={handleFinish}
          style={{ padding: 20 }}
        >
          {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
          <Form.Item
            name="name"
            label="Libellé de la Catégorie"
            rules={[{ required: true, message: "Veuillez donner un nom à cette catégorie" }]}
          >
            <Input placeholder="Libellé de la catégorie" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Description de la catégorie" rows={4} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCategoryForm;
