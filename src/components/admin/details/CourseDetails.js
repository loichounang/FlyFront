import React, { useEffect, useState } from "react";
import { ListCoursByID } from "../../../services/CoursServices/CoursServices";
import { ListChaptersByCourseID } from "../../../services/ChapitresServices/ChapitresServices";
import { ListLessonsByChapterID } from "../../../services/LessonsServices/LessonsServices";
import { Box, Typography, Grid, Card, CardContent, List, ListItem, ListItemText, CircularProgress, IconButton } from '@mui/material';
import { Add, ChevronRight, RefreshOutlined } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import CreateLessonForm from "../forms/CreateLessonsForm";
import { Button } from "antd";

const CourseDetail = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [courseChapters, setCourseChapters] = useState([]);
    const [chaptersLessons, setChaptersLessons] = useState({});
    const [loading, setLoading] = useState(true);
    const [showed, setShowed] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null); // État pour stocker le chapitre sélectionné

    function showHideModal(chapter = null) {
        setSelectedChapter(chapter); // Met à jour le chapitre sélectionné
        setShowed(!showed);
    }

    const fetchCoursesDetails = async () => {
        setLoading(true);
        try {
            const courseDetailsResponse = await ListCoursByID(courseId);
            setCourseData(courseDetailsResponse);
    
            // Récupérer les chapitres du cours
            const chaptersResponse = await ListChaptersByCourseID(courseId);
            const chaptersInCourse = chaptersResponse.chapitres || []; // Adaptez ici si la réponse contient directement les chapitres
            console.log('chaptersInCourse:', chaptersInCourse);
    
            // Vérifier si chaptersInCourse est un tableau avant de mapper
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
            } else {
                console.error('chaptersInCourse n\'est pas un tableau:', chaptersInCourse);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du cours:", error);
        } finally {
            setLoading(false);
        }
    };
    
    // Fonction appelée lors du rafraîchissement
    const handleRefresh = () => {
        fetchCoursesDetails();
    };
    
    // Utilisation dans useEffect pour le chargement initial
    useEffect(() => {
        fetchCoursesDetails();
    }, [courseId]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ padding: 3 }}>
            {courseData && (
                <div style={{ marginBottom: "2rem", overflowY: "auto" }}>
                    <Typography variant="h2" gutterBottom style={{ textAlign: "left" }}>
                        {courseData.titre}
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{ height: '100%', background: "transparent", color: "whitesmoke", padding: "1rem", textAlign: "left" }}>
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
                            <Button onClick={() => handleRefresh()}>
                                <RefreshOutlined />
                            </Button>
                            <Card style={{ textAlign: "left", background: "transparent", color: "whitesmoke" }}>
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
                                                                onClick={() => showHideModal(chapter)} // Passe le chapitre sélectionné à la fonction
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
            )}
        </Box>
    );
};

export default CourseDetail;