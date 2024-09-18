import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Spin, Button } from 'antd';
import { ListUsersRoles, CreateUser } from '../../../services/UsersServices/UsersServices';
import UseNotification from '../../common/UseNotification'; // Assurez-vous que cette importation est correcte

const { Option } = Select;

const CreateUserModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const notify = UseNotification(); // Déplacez cette ligne après l'importation

  const handleFinish = async (values) => {
    try {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('nom', values.nom);
      formData.append('prénom', values.prénom);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('role', values.role);
      formData.append('statut', values.status);
      
      const postResponse = await CreateUser(formData);
  
      console.log("Response Status:", postResponse.status); // Debug
      if (postResponse >= 200 && postResponse <= 300) {
        console.log("Notification Called"); // Debug
        notify("Utilisateur créé avec succès", "success", 3000);
        setSuccessMessage("Utilisateur créé avec succès!");
        onCreate(values);
        form.resetFields();
      } else {
        notify("Échec de la création de l'utilisateur", "error", 3000);
        throw new Error("Échec de la création de l'utilisateur");
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de la création de l'utilisateur", error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const rolesResponse = await ListUsersRoles();
        const RolesList = Object.entries(rolesResponse).map(([key, value]) => ({ value: key, label: value }));
        setRoles(RolesList);
      } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des rôles", error);
        setErrorMessage("Une erreur est survenue lors de la récupération des rôles");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleCancel = () => {
    setErrorMessage("");
    setSuccessMessage("");
    onCancel();
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        handleFinish(values);
      })
      .catch(info => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Modal
      open={visible}
      title="Créer un utilisateur"
      okText="Créer"
      cancelText="Annuler"
      onCancel={handleCancel}
      onOk={handleOk}
      centered
      footer={[
        <Button key="cancel" onClick={handleCancel}>Annuler</Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {loading ? <Spin /> : 'Créer'}
        </Button>
      ]}
    >
      {loading ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          name="create_user"
          initialValues={{ role: 'user', status: 'active' }}
        >
          {errorMessage && (
            <span style={{ color: "red", marginBottom: "15px" }}>{errorMessage}</span>
          )}
          {successMessage && (
            <span style={{ color: "green", marginBottom: "15px" }}>{successMessage}</span>
          )}
          <Form.Item
            name="nom"
            label="Nom"
            rules={[{ required: true, message: 'Veuillez entrer le nom de l’utilisateur' }]}
          >
            <Input placeholder="Nom de l'utilisateur" />
          </Form.Item>
          <Form.Item
            name="prénom"
            label="Prénom"
            rules={[{ required: true, message: 'Veuillez entrer le prénom de l’utilisateur' }]}
          >
            <Input placeholder="Prénom de l'utilisateur" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Veuillez entrer l’email de l’utilisateur' }]}
          >
            <Input placeholder="Email de l'utilisateur" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mot de passe"
            rules={[{ required: true, message: 'Veuillez entrer le mot de passe' }]}
          >
            <Input.Password placeholder="Mot de passe" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rôle"
            rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}
          >
            <Select placeholder="Sélectionner un rôle">
              {roles.map((role) => (
                <Option key={role.value} value={role.value}>
                  {role.label}
                </Option>
              ))}
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
      )}
    </Modal>
  );
};

export default CreateUserModal;
