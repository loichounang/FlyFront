import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Select, message } from 'antd';
import { ListUsersByID, ListUsersRoles, UpdateUser } from '../../../services/UsersServices/UsersServices';

const { Option } = Select;

const UserDetails = ({ isVisible, handleClose, id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [roles, setRoles] = useState([]);
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const userData = await ListUsersByID(id);
        setUser(userData);
        form.setFieldsValue(userData);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
        setErrorMessage('Erreur lors de la récupération des détails de l\'utilisateur');
      } finally {
        setLoading(false);
      }
    };

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

    if (id && isVisible) {
      fetchUserDetails();
      fetchRoles();
    }
  }, [id, isVisible]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    setErrorMessage("");
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const dataUpdate = {
        nom: values.nom,
        prénom: values.prénom,
        email: values.email,
        role: values.role,
        statut: values.statut,
        password: values.password // Inclure le champ password ici
      };
  
      await UpdateUser(id, dataUpdate);
      setUser(values);
      setIsEditing(false);
      message.success('Les détails de l\'utilisateur ont été mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des détails de l\'utilisateur :', error.response || error.message);
      message.error('Une erreur est survenue lors de la mise à jour des détails de l\'utilisateur.');
    }
  };

  if (loading) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <Modal
      visible={isVisible}
      title={isEditing ? "Modifier les détails de l'utilisateur" : "Détails de l'utilisateur"}
      onCancel={handleClose}
      footer={[
        !isEditing ? (
          <Button key="edit" onClick={handleEdit} type="primary">
            Modifier
          </Button>
        ) : (
          <Button key="save" type="primary" onClick={handleSave}>
            Sauvegarder
          </Button>
        ),
        <Button key="close" onClick={handleCancel}>
          {isEditing ? 'Annuler' : 'Fermer'}
        </Button>,
      ]}
    >
      <Card>
        {isEditing ? (
          <Form form={form} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card type="inner" title="Informations Générales">
                  <Form.Item name="nom" label="Nom" rules={[{ required: true, message: 'Le nom est requis' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="prénom" label="Prénom" rules={[{ required: true, message: 'Le prénom est requis' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, message: 'L’email est requis' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="password" label="Mot de passe" rules={[{ required: false, message: 'Le mot de passe est requis' }]}>
                    <Input.Password />
                  </Form.Item>
                </Card>
              </Col>
              <Col span={12}>
                <Card type="inner" title="Rôle et Statut">
                  <Form.Item name="role" label="Rôle" rules={[{ required: true, message: 'Le rôle est requis' }]}>
                    <Select>
                      {roles.map(role => (
                        <Option key={role.value} value={role.value}>
                          {role.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item name="statut" label="Statut" rules={[{ required: true, message: 'Le statut est requis' }]}>
                    <Select>
                      <Option value="active">Actif</Option>
                      <Option value="inactive">Inactif</Option>
                    </Select>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
          </Form>
        ) : user ? (
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card type="inner" title="Informations Générales" style={{ minHeight: "200px", textAlign: "left" }}>
                <p><strong>Nom : </strong>{user.nom}</p>
                <p><strong>Prénom : </strong>{user.prénom}</p>
                <p><strong>Email : </strong>{user.email}</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Rôle et Statut" style={{ minHeight: "200px", textAlign: "left" }}>
                <p><strong>Rôle : </strong>{user.role}</p>
                <p><strong>Statut : </strong>{user.statut}</p>
                <p><strong>Password : </strong>{user.password}</p>

              </Card>
            </Col>
          </Row>
        ) : (
          <div>Aucun détail disponible.</div>
        )}
      </Card>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </Modal>
  );
};

export default UserDetails;
