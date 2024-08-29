import { Modal, Form, Input } from "antd";
import React, { useState } from "react";
import axios from "axios";
import APIBaseURL from "../../../services/ApiServices";

const CreateCategoryForm = ({ visible, onCreate, onCancel, contentURL }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const handleFinish = async (values) => {
    try {
      // Appel API pour créer une nouvelle catégorie
      await axios.post("http://" + APIBaseURL + contentURL, values);
      onCreate(values);
      form.resetFields();
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la création de la catégorie.");
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
            name="libellé"
            label="Libellé de la Catégorie"
            rules={[{ required: true, message: "Veuillez donner un libellé à votre catégorie" }]}
          >
            <Input placeholder="Libellé de la catégorie" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea placeholder="Description de la catégorie" rows={4} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCategoryForm;
