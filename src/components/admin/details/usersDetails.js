import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Form, Input, Select, Modal } from 'antd';

const { Option } = Select;

const UserDetails = ({ isVisible, handleClose, userId }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simuler une requête API pour récupérer les détails de l'utilisateur
    const fetchUserDetails = async () => {
      const userData = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        status: 'active',
        teamName: "BOSTONS BOATS",
        teamMembers: 85,
      };
      setUser(userData);
      form.setFieldsValue(userData);
    };
    fetchUserDetails();
  }, [userId, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Simuler l'enregistrement des modifications via une requête API
      setUser(values);
      setIsEditing(false);
      // Appeler une API pour enregistrer les modifications...
    });
  };

  if (!user) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <Modal
      open={isVisible}
      title="Créer un nouveau cours"
      okText="Modifier"
      cancelText="Annuler"
    >
      <Card title="Détails de l'utilisateur" extra={<Button onClick={handleEdit}>Modifier</Button>}>
      {!isEditing ? (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Card type="inner" title="Informations Générales" style={{minHeight: "200px", textAlign: "left"}}>
                        <p><strong>Nom : </strong>{user.name}</p>
                        <p><strong>Email : </strong>{user.email}</p>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card type="inner" title="Rôle et Statut" style={{minHeight: "200px", textAlign: "left"}}>
                        <p><strong>Rôle : </strong>{user.role}</p>
                        <p><strong>Statut : </strong>{user.status}</p>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Card type="inner" title="Informations supplémantaires sur l'équipe" style={{minWidth: "100%", textAlign: "left"}}>
                        <p><strong>Nom de l'équipe : </strong>{user.teamName}</p>
                        <p><strong>Membres de l'équipe : </strong>{user.teamMembers}</p>
                    </Card>
                </Col>
            </Row>
        </div>
        
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card type="inner" title="Informations Générales">
                <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Le nom est requis' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'L’email est requis' }]}>
                  <Input />
                </Form.Item>
              </Card>
            </Col>
            <Col span={12}>
              <Card type="inner" title="Rôle et Statut">
                <Form.Item name="role" label="Rôle" rules={[{ required: true, message: 'Le rôle est requis' }]}>
                  <Select>
                    <Option value="admin">Administrateur</Option>
                    <Option value="ambassador">Ambassadeur</Option>
                    <Option value="team_leader">Leader d'équipe</Option>
                    <Option value="member">Membre</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="status" label="Statut" rules={[{ required: true, message: 'Le statut est requis' }]}>
                  <Select>
                    <Option value="active">Actif</Option>
                    <Option value="inactive">Inactif</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>

            <Col>
              <Card type="inner" title="Informations supplémentaires sur les équipes">
                <Form.Item name="teams" label="Liste des équipes" rules={[{ required: true, message: "Le choix de l'équipe est requis" }]}>
                  <Select>
                    <Option value="admin">BOSTONS BOATS</Option>
                    <Option value="ambassador">SNEAKERS </Option>
                    <Option value="team_leader">ANTANANARIVO DESTRUCTORS</Option>
                    <Option value="member">TEAM BANAL</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSave}>
              Sauvegarder
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Annuler
            </Button>
          </Row>
        </Form>
      )}
    </Card>
    </Modal>
  );
};

export default UserDetails;
