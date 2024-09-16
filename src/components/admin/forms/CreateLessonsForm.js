import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { CreateLessonsAPI } from "../../../services/LessonsServices/LessonsServices";
import useNotification from "../../common/UseNotification";

const CreateLessonForm = ({ visible, onCancel, chapterId, chapterTitle }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const notify = useNotification();

  const handleFinish = async (values) => {
    setLoading(true);
    setErrorMessage("");

    const formData = new FormData();

    // Append form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value && value.file) {
        // For file inputs
        formData.append(key, value.file.originFileObj);
      } else {
        // For other inputs
        formData.append(key, value);
      }
    });

    // Append chapterId to FormData
    formData.append("chapitre", chapterId);

    // Append lien_video only if a URL is provided
    if (values.lien_video) {
      formData.append('lien_video', values.lien_video);
    }

    try {
      const createLessons = await CreateLessonsAPI(formData);
      if (createLessons >= 200 && createLessons < 300) {
        notify("Nouvelle leçon ajoutée", "success", 3000);
        form.resetFields();
        onCancel(); // Close the modal after successful creation
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la création de la leçon");
      console.error("Error creating lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      title="Créer une nouvelle leçon"
      okText="Créer"
      cancelText="Annuler"
      confirmLoading={loading}
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
      <Form form={form} layout="vertical" name="create_lesson" onFinish={handleFinish} encType="multipart/form-data">
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
          name="duree"
          label="Durée (HH:MM:SS)"
          rules={[
            { required: true, message: "Veuillez indiquer la durée de la leçon au format HH:MM:SS" },
            {
              pattern: /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/,
              message: "Le format doit être HH:MM:SS"
            }
          ]}
        >
          <Input placeholder="Durée de la leçon (ex: 01:30:00)" />
        </Form.Item>

        <Form.Item
          name="fichier_details"
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
          label="Chapitre associé"
          rules={[{ required: true, message: "Sélectionnez un chapitre" }]}
        >
          <Input disabled value={chapterTitle} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateLessonForm;