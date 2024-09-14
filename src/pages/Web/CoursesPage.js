import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// import courseImage1 from '../../assets/images/courseImage1.png'; // Example image
// import courseImage2 from '../../assets/images/courseImage2.png'; // Example image
import courImage from '../../assets/images/cour.png'; // Import the image
// import flypoolLogo from '../../assets/images/flypoolLogo.png'; // Import Flypool logo
import { ListAllCours } from '../../services/CoursServices/CoursServices';
import { Spinner } from 'react-bootstrap';
import { submitRating } from '../../services/RatingServices/RatingServices';
import useNotification from '../../components/common/UseNotification';
import "../../assets/styles/CoursesCard.css";


const CoursesPage = () => {
  const notify = useNotification();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [rating, setRating] = useState(0);
  const courseCount = courses.length;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await ListAllCours();
        console.log('Courses Response:', response);
        setCourses(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
    // Le tableau de dépendances doit être vide si vous souhaitez exécuter l'effet une seule fois
  }, []); 

  const handleRatingChange = async (value, courseId) => {
    try {
      const response = await submitRating(courseId, value); // Appel à l'API pour soumettre la note
      if (response.status >= 200 && response.status <= 300) {
        notify("Rating updated successfully", "info", 3000);
      }
    } catch (error) {
      notify("Error submitting rating: " + error, "error", 3000);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9' }}>
      <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
  <Box
    component="img"
    src={courImage}
    alt="Courses Banner"
    sx={{
      width: '100%',
      height: '400px', // Set the image height to 400px
      objectFit: 'cover',
    }}
  />
  <Box
    sx={{
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%',
      transform: 'translate(-50%, -50%)', // Center horizontally and vertically
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      padding: { xs: '5px 10px', md: '10px 20px' },
      borderRadius: '8px',
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: '18px', md: '24px' },
        color: '#0a0d6c',
        fontWeight: 'bold',
      }}
    >
      Tous les Cours ({courseCount})
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontSize: { xs: '14px', md: '18px' },
        color: '#0a0d6c',
        fontWeight: 'normal',
        marginTop: '10px',
      }}
    >
      Découvrez nos meilleures catégories de cours
    </Typography>
  </Box>
</Box>

      <Box sx={{ padding: { xs: '20px', md: '40px' }, backgroundColor: '#f9f9f9', marginTop: '10px' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', marginBottom: '20px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Rechercher un cours"
            inputProps={{ 'aria-label': 'rechercher un cours' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Grid container spacing={4}>
          {loading ? <Spinner /> : (
            courses.map((course) => {
              console.log(course.cours_image); // Vérifie si l'URL est bien définie
              return (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} className='coursesCard'>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image ? course.image : 'https://via.placeholder.com/150'}
                    alt={course.titre}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }} style={{textAlign: "left"}}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}
                    >
                      {course.titre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                      <span style={{fontWeight: "bold", fontSize: "1.1em"}}>Durée:</span>  {course.durée} heure (s)
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                      <span style={{fontWeight: "bold", fontSize: "1.1em"}}>Auteur:</span>  {course.auteur}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                      <span style={{fontWeight: "bold", fontSize: "1.1em"}}>Catégorie:</span>  {course.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                      Nombre de leçons: {course.lessons}
                    </Typography>
                    <Rating
                      name="course-rating"
                      value={course.rating}
                      precision={0.5}
                      size="small"
                      onChange={(event, newValue) => setRating(newValue)}
                      onClick={() => handleRatingChange(rating,course.id)}
                    />
                  </CardContent>
                </Card>
              </Grid>
              )
            }
          )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CoursesPage;
