import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import axios from 'axios';
import APIBaseURL from '../../../services/ApiServices';

const { Option } = Select;

const CreateUserModal = ({ visible, onCreate, onCancel, theme, contentURL }) => {
  const [form] = Form.useForm();
  const [teamsList, setTeamList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFinish = (values) => {
    // Appeler une API ou gérer la création d'utilisateur ici
    onCreate(values);
    form.resetFields();
  };

  useEffect(() => {
    const FetchTeams = async() => {
      try {
        const teamsResponse = await axios.get("http://" + APIBaseURL + contentURL);
        if(teamsResponse.status >= 200 && teamsResponse.status <= 300) {
          setTeamList(teamsResponse.data);
        }
      } catch (error) {
        switch (error.response?.status) {
          case 500:
            setErrorMessage("Erreur interne du serveur lors de la récupération de la liste des équipes");
            break;
          case 404:
            setErrorMessage("Nous ne parvenons pas à trouver la liste des équipes à cette adresse. Veuillez consulter un administrateur pour en obtenir une nouvelle");
            break;
          case 403:
            setErrorMessage("Vous ne pouvez pas accéder à la liste des équipes car vous n'avez pas les droits suffisants");
            break;
        
          default:
            break;
        }
      }
    }

    FetchTeams();
  }, [contentURL]);

  return (
    <Modal
      open={visible}
      title="Créer un utilisateur"
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
            console.log('Validation Failed:', info);
          });
      }}
      styles={{ padding: '0' }}
      centered
    >
      <div>
        <Form
          form={form}
          layout="vertical"
          name="create_user"
          initialValues={{ role: 'user', status: 'active' }}
          onFinish={handleFinish}
        >
          {errorMessage !== "" ? (
            <span style={{color: "red"}}>{errorMessage}</span>
          ) : (
            <p >
              
            </p>
          )}
          <Form.Item
            name="name"
            label="Nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l’utilisateur' }]}
          >
            <Input placeholder="Nom de l'utilisateur" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Veuillez entrer l’email de l’utilisateur' }]}
          >
            <Input placeholder="Email de l'utilisateur" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rôle"
            rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}
          >
            <Select>
              <Option value="admin">Administrateur</Option>
              <Option value="user">Ambassadeur</Option>
              <Option value="user">Team Leader</Option>
              <Option value="user">Membre</Option>

            </Select>
          </Form.Item>
          <Form.Item
            name="teams"
            label="Equipe"
            rules={[{ required: true, message: 'Veuillez sélectionner une équipe' }]}
          >
            <Select>
              {teamsList.map((team, index) => {
                return (
                  <option key={index} value={team.id}>{team.team_name}</option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Statut"
            rules={[{ required: true, message: 'Veuillez sélectionner un statut' }]}
          >
            <Select>
              <Option value="active">Actif</Option>
              <Option value="inactive">Inactif</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
