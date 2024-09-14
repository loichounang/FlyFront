// CreateLessonForm.js
import { Modal, Form, Input, Upload, Select, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import axios from "axios";
import React, { useEffect, useState } from "react";
//import APIBaseURL from "../../../services/ApiServices";

const CreateLessonForm = ({ visible, onCreate, onCancel, contentURL }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [chaptersList, setChaptersList] = useState([]);

  const handleFinish = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value.originFileObj);
      } else {
        formData.append(key, value);
      }
    });

    // Appeler une API ou gérer la création de la leçon ici
    /*axios
      .post("http://" + APIBaseURL + contentURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        onCreate(values);
        form.resetFields();
      })
      .catch((error) => {
        setErrorMessage("Erreur lors de la création de la leçon");
      });*/
  };

  // Récupérer la liste des chapitres disponibles
  useEffect(() => {
    const chaptersData = [
      { id: 1, titre: "Chapitre 1" },
      { id: 2, titre: "Chapitre 2" },
      { id: 3, titre: "Chapitre 3" },
    ];
    setChaptersList(chaptersData);
  }, []);

  return (
    <Modal
      open={visible}
      title="Créer une nouvelle leçon"
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
    >
      <Form form={form} layout="vertical" name="create_lesson" onFinish={handleFinish}>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

        <Form.Item
          name="titre"
          label="Titre de la leçon"
          rules={[{ required: true, message: "Veuillez donner un titre à la leçon" }]}
        >
          <Input placeholder="Titre de la leçon" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Veuillez fournir une description de la leçon" }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e[0] : e?.file)}
        >
          <Upload
            maxCount={1}
            listType="picture"
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Télécharger une image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="lien_video"
          label="Lien Vidéo"
          rules={[{ required: false }]}
        >
          <Input placeholder="Lien vers la vidéo de la leçon" />
        </Form.Item>

        <Form.Item
          name="fichier_détails"
          label="Fichier Détails"
          valuePropName="file"
          getValueFromEvent={(e) => (Array.isArray(e) ? e[0] : e?.file)}
        >
          <Upload
            maxCount={1}
            beforeUpload={() => false}
            accept=".pdf,.docx,.pptx"
          >
            <Button icon={<UploadOutlined />}>Télécharger un fichier</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="chapitre"
          label="Chapitre associé"
          rules={[{ required: true, message: "Sélectionnez un chapitre" }]}
        >
          <Select placeholder="Sélectionnez un chapitre">
            {chaptersList.map((chapter) => (
              <Select.Option key={chapter.id} value={chapter.id}>
                {chapter.titre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateLessonForm;
