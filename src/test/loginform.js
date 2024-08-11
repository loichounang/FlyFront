import React, { useState } from "react";
import {Form, Card, Button, CardTitle, CardBody, FormControl, FormLabel} from "react-bootstrap";
import axios from "axios";

const LoginForm = () => {

    const [userInfos, setUserInfos] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserInfos((prevData) => {
            const updatedData = {
                ...prevData,
                [e.target.name]:e.target.value,
            };
            return updatedData;
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/accounts/api-token-auth/", userInfos);
            if(response.status >= 200 && response.status <= 300){
                alert("Connexion réussie");
            }
        } catch (error) {
            switch (error?.response.status) {
                case 500:
                    alert("Erreur interne du serveur");
                    break;
                case 400:
                    alert("Mauvaise requête. Les données fournies ne sont pas celles attendues");
                    break;
                case 401:
                    alert("Nom d'utilisateur ou mot de passe incorrect");
                    break;
            
                default:
                    break;
            }
        }
    }


    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
                    <Card style={{width: "500px", textAlign: "left", background: "linear-gradient(to left, mediumspringgreen, darkgreen)", color: "#fff"}}>
                        <div className="row">
                            <CardTitle>
                                <h3 style={{textAlign: "center"}}>
                                    Connexion
                                </h3>
                            </CardTitle>
                        </div>
                        <CardBody>
                            <div className="row mt-4">
                                <div className="col">
                                    <FormLabel htmlFor="username">
                                        Nom d'utilisateur
                                    </FormLabel>
                                    <FormControl 
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        required
                                        value={userInfos.username}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <FormLabel htmlFor="password">
                                        Mot de passe
                                    </FormLabel>
                                    <FormControl 
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={userInfos.password}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>

                            <div className="row mt-4">

                                <div className="col">
                                    <Button style={{textAlign: "right", float: "right"}} variant="success" type="submit" size="sm">
                                        Se connecter
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;