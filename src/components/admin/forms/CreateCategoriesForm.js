import { Modal, Form, Input, Button, Upload } from "antd";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { CreateCategoriesAPI } from "../../../services/CategoriesServices/CategoriesServices";
import useNotification from "../../common/UseNotification";
import { UploadOutlined } from "@ant-design/icons";

const CreateCategoryForm = ({ visible, onCreate, onCancel, contentURL }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const notify = useNotification();

  const handleFileChange = ({ fileList }) => {
    // fileList contient les fichiers sélectionnés
    // Assurez-vous de mettre à jour l'état ou le formulaire en conséquence
    // Ici, on suppose que vous voulez gérer le premier fichier de la liste
    const file = fileList[0]?.originFileObj;
    setSelectedFile(file);
  };
  
  // Optionnel : pour extraire le fichier depuis l'événement
  const getFileFromEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('description', values.description);

      if(selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await CreateCategoriesAPI(formData);
      if (response) {
        switch (response) {
          case 200:
            notify("Catégorie Crée avec succèss", "success", 5000);
            break;
          case 201:
            notify("Catégorie Crée avec succèss", "success", 5000);
            break;

          default:
            notify("Catégorie Crée avec succèss", "success", 5000);
            break;
        }
      }

      } catch (error){
        const status = error.response?.status;
        const integrityConstraint = error.response?.name
        switch (status) {
          case 400:
            notify(integrityConstraint ||  "Une catégorie avec ce nom existe déjà", "error", 5000);
            break;
        
          default:
            break;
        }
      } finally {
        form.resetFields();
        setLoading(false);
      }
  };

  return (
    <Modal
      open={visible}
      title="Créer une nouvelle catégorie"
      okText={loading ? <Spinner /> : "Créer"}
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
          encType="multipart/form-data"
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

          <Form.Item
            name="image"
            label="Image"
            valuePropName="file"
            getValueFromEvent={getFileFromEvent}
          >
            <Upload
              maxCount={1}
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              accept="image/*"
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Télécharger une image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateCategoryForm;
