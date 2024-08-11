import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, Button } from '@mui/material';
import courseImage1 from '../../assets/images/courseImage1.png'; // Example image
import courseImage2 from '../../assets/images/courseImage2.png'; // Example image
import flypoolLogo from '../../assets/images/flypoolLogo.png'; // Import Flypool logo

const recommendedCourses = [
  {
    id: 1,
    image: courseImage1,
    title: 'Introduction au Développement Web',
    duration: '3 heures',
    rating: 4.5,
    lessons: 12,
  },
  {
    id: 2,
    image: courseImage2,
    title: 'Maîtriser JavaScript pour Développeurs',
    duration: '5 heures',
    rating: 5,
    lessons: 15,
  },
  {
    id: 3,
    image: courseImage2,
    title: 'Développement Backend avec Node.js',
    duration: '6 heures',
    rating: 5,
    lessons: 17,
  },
  {
    id: 4,
    image: courseImage1,
    title: 'Développement Frontend avec React',
    duration: '5 heures',
    rating: 5,
    lessons: 15,
  },
  // Add more courses as needed
];

const RecommendedCourses = () => {
  return (
    <Box sx={{ padding: '40px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Cours Recommandés
      </Typography>
      <Grid container spacing={4}>
        {recommendedCourses.map((course) => (
          <Grid item xs={12} sm={6} md={3} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}
                >
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                  Durée: {course.duration}
                </Typography>
                <Box display="flex" alignItems="center" gap="10px" marginBottom="10px">
                  <Box
                    component="img"
                    src={flypoolLogo}
                    alt="Flypool Logo"
                    sx={{ height: '24px', width: '24px', borderRadius: '50%' }}
                  />
                  <Typography variant="body2" sx={{ fontSize: '12px' }}>
                    Flypool
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px', marginBottom: '10px' }}>
                  Nombre de leçons: {course.lessons}
                </Typography>
                <Rating
                  name="course-rating"
                  value={course.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" sx={{ fontSize: '16px', fontWeight: 'bold', backgroundColor: '#0a0d6c', '&:hover': { backgroundColor: '#0a0d6c' } }}>
          Voir plus
        </Button>
      </Box>
    </Box>
  );
};

export default RecommendedCourses;
