import React, { useEffect, useState } from "react";
import { ListCoursByID } from "../../../services/CoursServices/CoursServices";
import { ListChaptersByCourseID } from "../../../services/ChapitresServices/ChapitresServices";
import { ListLessonsByChapterID } from "../../../services/LessonsServices/LessonsServices";
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, CircularProgress, IconButton, Container, Rating, Button } from '@mui/material';
import { Add, ChevronRight, RefreshOutlined, VideocamSharp } from '@mui/icons-material';
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import CreateLessonForm from "../forms/CreateLessonsForm";
import { Accordion } from "react-bootstrap";
//import { LoginForm } from "../..";
import axios from "axios";
import { BASE_URL, COURS_API } from "../../../services/ApiServices";
import LoginModal from "../../web/LoginForm";

const CourseDetail = () => {
    const { courseId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [totalLessons, setTotalLessons] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [courseChapters, setCourseChapters] = useState([]);
    const [chaptersLessons, setChaptersLessons] = useState({});
    const [loading, setLoading] = useState(true);
    const [showed, setShowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);

    const isAdminRoute = location.pathname.startsWith("/admin");

    function showHideModal(chapter = null) {
        setSelectedChapter(chapter);
        setShowed(!showed);
    }

    const fetchCoursesDetails = async () => {
        setLoading(true);
        try {
            const courseDetailsResponse = await ListCoursByID(courseId);
            setCourseData(courseDetailsResponse);
    
            const chaptersResponse = await ListChaptersByCourseID(courseId);
            const chaptersInCourse = chaptersResponse.chapitres || [];
    
            if (Array.isArray(chaptersInCourse)) {
                setCourseChapters(chaptersInCourse);
    
                const lessonsPromises = chaptersInCourse.map(chapter =>
                    ListLessonsByChapterID(chapter.id).then(lessonsResponse => ({
                        chapterId: chapter.id,
                        lessons: Array.isArray(lessonsResponse) ? lessonsResponse : [],
                    }))
                );
    
                const lessonsResponses = await Promise.all(lessonsPromises);
                const lessonsByChapter = lessonsResponses.reduce((acc, { chapterId, lessons }) => {
                    acc[chapterId] = lessons;
                    return acc;
                }, {});
                setChaptersLessons(lessonsByChapter);

                // Calcul du nombre total de leçons
            const totalLessons = lessonsResponses.reduce((acc, { lessons }) => acc + lessons.length, 0);
            setTotalLessons(totalLessons);  // Mettre à jour la variable totalLessons avec le nombre total  
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du cours:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchCoursesDetails();
    };

    const handleLessonClick = (lessonUrl) => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate(lessonUrl);
        } else {
            setShowLoginModal(true);
        }
    };

    function handleCloseLoginModal() {
        setShowLoginModal(false);
    }

    
    const startCourse = () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          // If no token, user is not logged in
          setShowLoginModal(true); // Open the login modal
        } else {
          // User is logged in, proceed with course registration
          registerForCourse(); // Your function to handle course registration
        }
      };
    
      const registerForCourse = async () => {
        try {
          const token = localStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          // Make API request to register for the course
          // Replace `COURSE_ID` with the actual course ID
          await axios.post(`${BASE_URL}/${COURS_API}/cours-utilisateur/`, { cours_id: courseId }, config);
          alert('Inscription réussie!');
        } catch (error) {
            const status = error.response?.status;
          switch (status) {
            case 500:
                setErrorMessage(error.response?.data.detail ? error.response?.data.detail : "Erreur interne du serveur", error);
                break;
                case 400:
                setErrorMessage(error.response?.data.detail, error);
                break;
                case 404:
                setErrorMessage(error.response?.data.detail ? error.response?.data.detail : "Cours introuvable");
                break;
          
            default:
                break;
          }
        }
      };
    


    useEffect(() => {
        setErrorMessage("");
        fetchCoursesDetails();
    }, [courseId]);

    if (loading) {
        return <CircularProgress style={{margin: "20rem", fontSize: "5.5em", width: "50px"}}/>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            {courseData && (
                isAdminRoute === true ?  (
                    <div style={{marginBottom: "2rem", overflowY: "auto"}}>
                        <Typography variant="h2" gutterBottom style={{ textAlign: "left" }}>
                            {courseData.titre}
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Card sx={{ height: '100%', background: "lightgray", color: "black", padding: "1rem", textAlign: "left" }}>
                                    <img
                                        src={courseData.image}
                                        alt={courseData.titre}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px" }} gutterBottom>
                                            Catégorie
                                        </Typography>
                                        <Typography variant="body1">
                                            {courseData.category}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px" }} gutterBottom>
                                            Description
                                        </Typography>
                                        <Typography variant="body1">
                                            {courseData.description}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px" }} gutterBottom>
                                            Par
                                        </Typography>
                                        <Typography variant="body1">
                                            {courseData.auteur}
                                        </Typography>
                                        <hr />
                                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px" }} gutterBottom>
                                            Durée
                                        </Typography>
                                        <Typography variant="body1">
                                            {courseData.durée + " heure(s)"}
                                        </Typography>
                                        <hr />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <Button onClick={handleRefresh}>
                                    <RefreshOutlined />
                                </Button>

                                <Card style={{ textAlign: "left", background: "lightgray", color: "black" }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            Chapitres
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {Array.isArray(courseChapters) && courseChapters.length > 0 ? (
                                                courseChapters.map(chapter => (
                                                    <Grid item xs={12} key={chapter.id}>
                                                        <Card>
                                                            <CardContent>
                                                                <Typography variant="h6" gutterBottom>
                                                                    {chapter.titre}
                                                                </Typography>
                                                                <p>Durée : {chapter.duree}</p>
                                                                <List>
                                                                    {Array.isArray(chaptersLessons[chapter.id]) && chaptersLessons[chapter.id].length > 0 ? (
                                                                        chaptersLessons[chapter.id].map(lesson => (
                                                                            <ListItem key={lesson.id}>
                                                                                <ListItemText primary={"- " + lesson.titre} />
                                                                                <IconButton edge="end" aria-label="expand">
                                                                                    <ChevronRight />
                                                                                </IconButton>
                                                                            </ListItem>
                                                                        ))
                                                                    ) : (
                                                                        <Typography variant="body2" style={{ color: "red" }}>Aucune leçon disponible</Typography>
                                                                    )}
                                                                </List>
                                                                <button
                                                                    onClick={() => showHideModal(chapter)}
                                                                    className="btn btn-outline-primary"
                                                                    style={{ float: "right", marginBottom: "15px" }}
                                                                >
                                                                    <Add />
                                                                </button>
                                                                {selectedChapter && selectedChapter.id === chapter.id && (
                                                                    <CreateLessonForm
                                                                        chapterTitle={selectedChapter.titre}
                                                                        chapterId={selectedChapter.id}
                                                                        visible={showed}
                                                                        onCancel={() => showHideModal()}
                                                                    />
                                                                )}
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            ) : (
                                                <Typography variant="body1" style={{ color: "red", margin: "15px" }}>Aucun chapitre disponible.</Typography>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div style={{marginTop: "5rem", overflowY: "auto", overflowX: "hidden", padding: "1rem"}}>
                        <div className="container-fluid" style={{padding: "0", margin: "0", background: "midnightblue", width: "100%"}}>
                            <Container style={{ padding: "2rem 0", textAlign: "left"}}>
                                <div className="row">
                                    <div className="col">
                                    <Typography variant="h4" gutterBottom style={{fontWeight: "bold", fontSize: "2.5em"}}>
                                    {courseData.titre}
                                </Typography>
                                <Typography variant="body1" gutterBottom style={{fontWeight: "light", fontSize: "1.3em"}}>
                                    {courseData.description}
                                </Typography>
                                <Typography variant="body1">
                                    Créé par <a href="/profile/author/:authorId/profil" style={{color: "lightblue"}}>{courseData.auteur}</a>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
  <Rating
    name="average_rating"
    value={courseData.average_rating}
    precision={0.5}
    size="small"
    readOnly
    style={{color: "#ffb400"}} // Change la couleur si nécessaire
  />
  <span style={{fontWeight: "bold", marginLeft: "5px"}}>
    ({courseData.rating_count > 0 ? courseData.rating_count : 0} notations)
  </span>
  <span style={{fontWeight: "bold", marginLeft: "5px"}}>
    {courseData.participants > 0 ? courseData.participants : 0} participants
  </span>
</Typography>

                                
                                <br />
                                <br />
                                <Button onClick={() => startCourse()} variant="contained">
                                    Je me lance
                                </Button>
                                <br />
                                <Typography variant="body1" style={{position: "relative"}}>
                                Vous terminerez ce cours en {courseData.durée + " heure(s)"}
                                </Typography>
                                    </div>

                                    <div className="col">
                                    <img
                                        src={courseData.image}
                                        alt={courseData.titre}
                                        style={{ width: '300px', height: '300px', float: "right" }}
                                    />
                                    </div>
                                </div>
                            </Container>
                        </div>

                        <div className="container" style={{marginTop: "3rem", textAlign: "left", color: "black"}}>
                            {errorMessage !== "" ? <span style={{color:"red"}}>{errorMessage}</span> : ""}
                            <div className="row">
                                <div className="col">
                                    <div className="card" style={{ padding: "1rem"}}>
                                        <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "black", fontSize: "1.5em"}}>
                                            Les objectifs de ce cours
                                        </Typography>
                                        <br />
                                    </div>
                                </div>

                                <div className="col">
                                    
                                </div>
                            </div>

                            <div className="row" style={{ padding: "1rem", marginTop: "3rem"}}>
                                <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "black", fontSize: "1.5em"}}>
                                    Découvrir les sujets associés
                                </Typography>
                                <br />
                            </div>

                            <div className="row" style={{ padding: "1rem", marginTop: "3rem"}}>
                                <div className="col-7">
                                <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "black", fontSize: "1.5em"}}>
                                    Contenu du cours
                                </Typography>
                                <br />
                                <p>{courseChapters.length} <strong>Chapitres</strong> ~ {totalLessons > 0 ? totalLessons : 0} <strong>Leçons</strong> ~ <strong> Durée totale</strong>: {courseData.durée}</p>
                                <div style={{ backgroundColor: "transparent", borderRadius: "10px"}}>
                                    <Card>
                                        <Accordion defaultActiveKey="0">
                                            {Array.isArray(courseChapters) && courseChapters.length > 0 ? (
                                                courseChapters.map(chapter => {
                                                    const lessons = chaptersLessons[chapter.id] || [];
                                                    const totalDuration = lessons.reduce((acc, lesson) => acc + lesson.duree, 0); // Assure-toi que la durée est en minutes

                                                    return (
                                                        <Accordion.Item key={chapter.id} eventKey={chapter.id} style={{fontWeight: "bold"}}>
                                                            <Accordion.Header>
                                                                <div className="d-flex justify-content-between w-100">
                                                                    <span style={{fontWeight: "bold", textTransform: "uppercase"}}>{chapter.titre}</span>
                                                                    <span style={{fontSize: "0.8em"}}>{lessons.length} leçons | {totalDuration} min</span>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                {lessons.map((lesson) => (
                                                                    <div key={lesson.id} className="d-flex justify-content-between align-items-center mb-2">
                                                                        <div className="d-flex align-items-center">
                                                                            <VideocamSharp className="mr-2" style={{marginRight: "10px"}}/>
                                                                            <Link onClick={() => handleLessonClick(`/mes-cours/${courseData.id}/leçons/${lesson.id}/view-content`)} style={{fontSize: "0.9em"}}>{lesson.titre}</Link>
                                                                        </div>
                                                                        <span style={{fontSize: "0.8em"}}>{lesson.duree}</span>
                                                                    </div>
                                                                ))}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    );
                                                })
                                            ) : (
                                                <Typography variant="body1" style={{ color: "red", margin: "15px" }}>Aucun chapitre disponible.</Typography>
                                            )}
                                        </Accordion>
                                    </Card>
                                </div>
                                </div>

                                <div className="col">
                                    <LoginModal show={showLoginModal} handleClose={() => handleCloseLoginModal()} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </Box>
    );
};

export default CourseDetail;
