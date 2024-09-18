import React, { useEffect, useState } from "react";
import { ListCategoriesByID, ListCoursesByCategoryId } from "../../../services/CategoriesServices/CategoriesServices"; // Assure-toi que ce service est correctement configuré
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Button, Container } from '@mui/material';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import LoginModal from "../../web/LoginForm";

const CategoryDetail = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState(null);
    const [categoryCourses, setCategoryCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);

    const isAdminRoute = location.pathname.startsWith("/admin");

    const fetchCategoryDetails = async () => {
        setLoading(true);
        try {
            const categoryDetailsResponse = await ListCategoriesByID(categoryId);
            setCategoryData(categoryDetailsResponse);

            const coursesResponse = await ListCoursesByCategoryId(categoryId);
            setCategoryCourses(coursesResponse || []);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails de la catégorie:", error);
            setErrorMessage("Erreur lors de la récupération des détails de la catégorie.");
        } finally {
            setLoading(false);
        }
    };

    const handleCourseClick = (courseUrl) => {
        
            navigate(courseUrl);
        
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, [categoryId]);

    if (loading) {
        return <CircularProgress style={{ margin: "20rem", fontSize: "5.5em", width: "50px" }} />;
    }

    return (
        <Box sx={{ padding: 3 }}>
            {categoryData && (
                isAdminRoute ? (
                    <div style={{ marginBottom: "2rem", overflowY: "auto" }}>
                        <Typography variant="h2" gutterBottom style={{ textAlign: "left" }}>
                            {categoryData.titre}
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Card sx={{ height: '100%', background: "lightgray", color: "black", padding: "1rem", textAlign: "left" }}>
                                    <img
                                        src={categoryData.image}
                                        alt={categoryData.titre}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px" }} gutterBottom>
                                            Description
                                        </Typography>
                                        <Typography variant="body1">
                                            {categoryData.description}
                                        </Typography>
                                        <hr />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Card style={{ textAlign: "left", background: "lightgray", color: "black" }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            Cours dans cette catégorie
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {categoryCourses.length > 0 ? (
                                                categoryCourses.map(course => (
                                                    <Grid item xs={12} key={course.id}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="h6" gutterBottom>
                                                                    {course.titre}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    Description : {course.description}
                                                                </Typography>
                                                                <Button onClick={() => handleCourseClick(`/cours/${course.id}`)} variant="contained">
                                                                    Voir les détails
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            ) : (
                                                <Typography variant="body1" style={{ color: "red", margin: "15px" }}>Aucun cours disponible.</Typography>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div style={{ marginTop: "5rem", overflowY: "auto", overflowX: "hidden", padding: "1rem" }}>
                        <div className="container-fluid" style={{ padding: "0", margin: "0", background: "midnightblue", width: "100%" }}>
                            <Container style={{ padding: "2rem 0", textAlign: "left" }}>
                                <div className="row">
                                    <div className="col">
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", fontSize: "2.5em", color: "white" }}>
                                            {categoryData.titre}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom style={{ fontWeight: "light", fontSize: "1.3em", color: "white" }}>
                                            {categoryData.description}
                                        </Typography>
                                    </div>
                                    <div className="col">
                                        <img
                                            src={categoryData.image}
                                            alt={categoryData.titre}
                                            style={{ width: '300px', height: '300px', float: "right" }}
                                        />
                                    </div>
                                </div>
                            </Container>
                        </div>

                        <div className="container" style={{ marginTop: "3rem", textAlign: "left", color: "black" }}>
                            {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
                            <div className="row">
                                <div className="col">
                                    <div className="card" style={{ padding: "1rem" }}>
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "black", fontSize: "1.5em" }}>
                                            Cours dans cette catégorie
                                        </Typography>
                                    </div>
                                </div>
                            </div>

                            <div className="row" style={{ padding: "1rem", marginTop: "3rem" }}>
                                <div className="col-7">
                                    <div style={{ backgroundColor: "transparent", borderRadius: "10px" }}>
                                        <Card>
                                            <Accordion defaultActiveKey="0">
                                                {categoryCourses.length > 0 ? (
                                                    categoryCourses.map(course => (
                                                        <Accordion.Item key={course.id} eventKey={course.id} style={{ fontWeight: "bold" }}>
                                                            <Accordion.Header>
                                                                <div className="d-flex justify-content-between w-100">
                                                                    <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>{course.titre}</span>
                                                                    <span style={{ fontSize: "0.8em" }}>{course.description}</span>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <Button onClick={() => handleCourseClick(`/mes-cours/${course.id}/details`)} variant="contained">
                                                                    Voir les détails
                                                                </Button>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    ))
                                                ) : (
                                                    <Typography variant="body1" style={{ color: "red", margin: "15px" }}>Aucun cours disponible.</Typography>
                                                )}
                                            </Accordion>
                                        </Card>
                                    </div>
                                </div>

                                <div className="col">
                                    <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </Box>
    );
};

export default CategoryDetail;
