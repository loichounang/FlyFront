// CreateChapterForm.js
import { Modal, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import APIBaseURL from "../../../services/ApiServices";

const CreateChapterForm = ({ visible, onCreate, onCancel, contentURL }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [coursesList, setCoursesList] = useState([]);

  const handleFinish = (values) => {
    // Appeler une API ou gérer la création du chapitre ici
    axios
      .post("http://" + APIBaseURL + contentURL, values)
      .then(() => {
        onCreate(values);
        form.resetFields();
      })
      .catch((error) => {
        setErrorMessage("Erreur lors de la création du chapitre");
      });
  };

  // Récupérer la liste des cours disponibles
  useEffect(() => {
    const coursesData = [
      { id: 1, titre: "Cours 1" },
      { id: 2, titre: "Cours 2" },
      { id: 3, titre: "Cours 3" },
    ];
    setCoursesList(coursesData);
  }, []);

  return (
    <Modal
      open={visible}
      title="Créer un nouveau chapitre"
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
      <Form form={form} layout="horizontal" name="create_chapter" onFinish={handleFinish}>
        {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}

        <Form.Item
          name="titre"
          label="Titre du chapitre"
          rules={[{ required: true, message: "Veuillez donner un titre au chapitre" }]}
        >
          <Input placeholder="Titre du chapitre" />
        </Form.Item>

        <Form.Item
          name="cours"
          label="Cours associé"
          rules={[{ required: true, message: "Sélectionnez un cours" }]}
        >
          <Select placeholder="Sélectionnez un cours">
            {coursesList.map((course) => (
              <Select.Option key={course.id} value={course.id}>
                {course.titre}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateChapterForm;
