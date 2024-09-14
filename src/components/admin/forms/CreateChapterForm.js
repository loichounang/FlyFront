// CreateChapterForm.js
import { Modal, Form, Input } from "antd";
//import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListCoursByID } from "../../../services/CoursServices/CoursServices";
import { Spinner } from "react-bootstrap";
import { CreateChapterAPI } from "../../../services/ChapitresServices/ChapitresServices";
import useNotification from "../../common/UseNotification";
//import APIBaseURL from "../../../services/ApiServices";

const CreateChapterForm = ({ visible, onCancel, courseID }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  const notify = useNotification();


  const handleFinish = async (values) => {
    // Appeler une API ou gérer la création du chapitre ici
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('titre', values.titre);
      formData.append('cours', courseData.id);

      const response = await CreateChapterAPI(formData);

      if (response >= 200 && response <= 300) {
        notify("Le nouveau chapitre a été ajouté avec succès", "success", 5000);
      } else {
        notify("Erreur lors de l'ajout du chapitre !", "error", 5000);
      }
    } catch (error) {
      notify("Une erreur s'est produite : " + error.message, "error");
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  // Récupérer les informations du cours 
  useEffect(() => {
    // Récupérer les informations sur le cours sélectionné
    const fetchCourseData = async () => {

      try {
        const response = await ListCoursByID(courseID);
        console.log(response);
        setCourseData(response);
      } catch (error) {
        setErrorMessage("Nous avons rencontré une erreur en récupérant les informations du cours", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseID]);

  return (
    <Modal
      open={visible}
      title="Créer un nouveau chapitre"
      okText={loading ? <Spinner /> : "Créer"}
      loading={loading}
      cancelText="Annuler"
      onCancel={() => {
        onCancel();
        setErrorMessage("");
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleFinish(values);
            setErrorMessage("");
          })
          .catch((info) => {
            console.log("Validation Failed:", info);
          });
      }}
      centered
    >
      <Form form={form} layout="horizontal" name="create_chapter" onFinish={handleFinish}>
        {errorMessage !== "" ? <span style={{color: "red"}}>{errorMessage}</span> : ""}

        <Form.Item
          name="titre"
          label="Titre du chapitre"
          rules={[{ required: true, message: "Veuillez donner un titre au chapitre" }]}
          style={{fontWeight: "bold"}}
        >
          <Input placeholder="Titre du chapitre" />
        </Form.Item>

        <Form.Item
          label="Cours associé"
          rules={[{ required: true, message: "Sélectionnez un cours" }]}
          style={{fontWeight: "bold"}}
        >
          <Input disabled value={courseData.titre} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateChapterForm;
