import { Modal, Form, Input, Row, Col, Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { Error } from "@mui/icons-material";

const LoginModal = ({ show, handleClose }) => {

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function hideErrorMessage(){
        setErrorMessage("");
    };

    const handleFinish = async (values) => {
        // Gérer la connexion ici
        setLoading(true);
        console.log('Form Values:', values);
        // Appel API pour la connexion ou autre action
        try {
            const loginResponse = await axios.post("http://127.0.0.1:8000/api/utilisateurs/api-token-auth/", values);
            if(loginResponse.status >= 200 && loginResponse.status <= 300){
                localStorage.setItem("uid", loginResponse.data.user_id);
                localStorage.setItem("role", loginResponse.data.role);
                localStorage.setItem("email", loginResponse.data.email);
                localStorage.setItem("token", loginResponse.data.token);
                switch (loginResponse.data.role) {
                    case "administrateur":
                        setTimeout(() => {
                            enqueueSnackbar(loginResponse.data.message, {
                                autoHideDuration: 5000,
                                variant: "success",
                            });
                        }, 1000);
                        setTimeout(() => {
                            navigate('/admin/dashboard');
                        }, 3000);
                        break;
                    case "ambassadeur":
                        setTimeout(() => {
                            navigate('/ambassador/dashboard'); 
                        }, 3000);
                        break;
                    case "team_leader":
                        setTimeout(() => {
                            navigate('/leader/dashboard');
                        }, 3000);
                        break;
                
                    default:
                        setTimeout(() => {
                            navigate('/profil/dashboard');
                        }, 3000);
                        break;
                }
            }

        } catch (error) {
            switch (error.response?.status) {
                case 500:
                    setErrorMessage("Erreur interne du serveur");
                    break;
                case 401:
                    setErrorMessage("Adresse Email ou Mot de passe incorrect");
                    break;
                case 404:
                    setErrorMessage("URL introuvable");
                    break;
                case 400:
                    setErrorMessage(error.response?.data.non_field_errors);
                    break;
            
                default:
                    setErrorMessage("Une erreur inconnue s'est produite");
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <Modal
                open={show}
                footer={null}
                onCancel={() => {
                    handleClose();
                    form.resetFields();
                }}
                centered
                className="login-modal"
            >
                <div className="row" id="modal-content" style={{}}>
                        <div className="row" >
                            <div className="col" id="left-side" style={{background: "linear-gradient(135deg, slateblue 25%, darkslateblue 75%)", color: "white", padding: "10px"}}>
                                <h3>Connexion</h3>
                            </div>
                            <div className="col" id="right-side">
                            {errorMessage !== "" ? ( setTimeout(() => {
                        hideErrorMessage();
                    }, 5000),
                        <div className="alert alert-danger bg-danger" style={{ fontSize: "1.5em", color: "whiteSmoke", transition: "ease-in-out 0.3s"}}>{errorMessage}<Error /> </div>
                    ) : <p></p>}
                            <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            onReset={() => setErrorMessage("")}
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
                        >
                            <Input type="email" placeholder="Votre email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mot de passe"
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
                        >
                            <Input.Password placeholder="Votre mot de passe" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {loading ? (<Spinner />) : "Se connecter"}
                                
                            </Button>
                        </Form.Item>
                        <Divider>Ou connectez-vous avec</Divider>
                        
                        <Row gutter={16}>
                            <Col span={8}>
                                <Button
                                    icon={<GoogleOutlined />}
                                    size="small"
                                    block
                                    className="social-button"
                                >
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button
                                    icon={<FacebookOutlined />}
                                    size="small"
                                    block
                                    className="social-button"
                                >
                                </Button>
                            </Col>
                            <Col span={8}>
                                <Button
                                    icon={<TwitterOutlined />}
                                    size="small"
                                    block
                                    className="social-button"
                                >
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                            </div>
                        </div>
                </div>
            </Modal>
        </div>
    );
};

export default LoginModal;