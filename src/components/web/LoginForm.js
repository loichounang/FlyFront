import { Modal, Form, Input, Row, Col, Button, Divider, Typography } from "antd";
import { GoogleOutlined, TwitterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Facebook } from "@mui/icons-material";

const { Title, Text } = Typography;

const LoginModal = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const loginResponse = await axios.post("http://127.0.0.1:8000/api/utilisateurs/token/", values);
            if(loginResponse.status >= 200 && loginResponse.status <= 300) {
                localStorage.setItem("token", loginResponse.data.access);
                localStorage.setItem("refresh", loginResponse.data.refresh);
            }
            const retrieveUserData = await axios.get("http://127.0.0.1:8000/api/utilisateurs/user", {
                headers: {
                    Authorization: `Bearer ${loginResponse.data.access}`
                }
            });
            if(retrieveUserData.status >= 200 && retrieveUserData.status <= 300){
                // Stocke les informations utilisateur dans le local storage
                localStorage.setItem("user_id", retrieveUserData.data.id);
                localStorage.setItem("email", retrieveUserData.data.email);
                localStorage.setItem("role", retrieveUserData.data.role);
            }
    
            // Navigation basée sur le rôle de l'utilisateur
            switch (retrieveUserData.data.role) {
                case "administrateur":
                    setTimeout(() => {
                        enqueueSnackbar(retrieveUserData.data.message || "Connexion réussie", { autoHideDuration: 5000, variant: "success" });
                        navigate('/admin/dashboard');
                    }, 1000);
                    break;
                case "team_leader":
                    navigate('/leader/dashboard');
                    break;
                default:
                    navigate('/profil/dashboard');
                    break;
            }
        } catch (error) {
            const errorMessages = {
                500: "Erreur interne du serveur",
                401: "Adresse Email ou Mot de passe incorrect",
                404: "URL introuvable",
                400: error.response?.data.non_field_errors || "Erreur de validation",
            };
            setErrorMessage(errorMessages[error.response?.status] || "Une erreur inconnue s'est produite");
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    return (
        <Modal
            open={show}
            footer={null}
            onCancel={() => {
                handleClose();
                form.resetFields();
            }}
            centered
            width={400}
            className="login-modal"
        >
            <Row>
                <Col span={24}>
                    <div style={{ textAlign: "center", padding: "20px", background: "linear-gradient(135deg, #1e3c72, #2a5298)", color: "white", borderRadius: "10px 10px 0 0" }}>
                        <Title level={3} style={{ color: "white" }}>Connexion</Title>
                    </div>
                </Col>
                <Col span={24} style={{ padding: "20px" }}>
                    {errorMessage && (
                        <div className="alert alert-danger" style={{ marginBottom: "20px", fontSize: "1em", color: "#d9534f" }}>
                            {errorMessage}
                        </div>
                    )}
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        hideRequiredMark
                    >
                        <Form.Item
                            name="email"
                            label={<Text strong>Email</Text>}
                            rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
                        >
                            <Input type="email" placeholder="Votre email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label={<Text strong>Mot de passe</Text>}
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
                        >
                            <Input.Password placeholder="Votre mot de passe" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Se connecter
                            </Button>
                        </Form.Item>
                        <Divider>Ou connectez-vous avec</Divider>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Button
                                    icon={<GoogleOutlined />}
                                    size="large"
                                    block
                                    className="social-button"
                                    style={{ backgroundColor: "white", color: "crimson" }}
                                >
                                    Google
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button
                                    icon={<Facebook />}
                                    size="large"
                                    block
                                    className="social-button"
                                    style={{ backgroundColor: "white", color: "darkblue" }}
                                >
                                    Facebook
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button
                                    icon={<TwitterOutlined />}
                                    size="large"
                                    block
                                    className="social-button"
                                    style={{ backgroundColor: "white", color: "#ace" }}
                                >
                                    Twitter
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default LoginModal;
