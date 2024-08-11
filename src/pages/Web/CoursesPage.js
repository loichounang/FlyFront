import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, InputBase, Paper, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import courseImage1 from '../../assets/images/courseImage1.png'; // Example image
import courseImage2 from '../../assets/images/courseImage2.png'; // Example image
import courImage from '../../assets/images/cour.png'; // Import the image
import flypoolLogo from '../../assets/images/flypoolLogo.png'; // Import Flypool logo

const courses = [
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
  {
    id: 6,
    image: courseImage1,
    title: 'Introduction au Développement Web',
    duration: '3 heures',
    rating: 4.5,
    lessons: 12,
  },
  {
    id: 7,
    image: courseImage2,
    title: 'Maîtriser JavaScript pour Développeurs',
    duration: '5 heures',
    rating: 5,
    lessons: 15,
  },
  {
    id: 8,
    image: courseImage2,
    title: 'Développement Backend avec Node.js',
    duration: '6 heures',
    rating: 5,
    lessons: 17,
  },
  {
    id: 9,
    image: courseImage1,
    title: 'Développement Frontend avec React',
    duration: '5 heures',
    rating: 5,
    lessons: 15,
  },
  // Add more courses as needed
];

const CoursesPage = () => {
  const courseCount = courses.length;

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
          {courses.map((course) => (
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
      </Box>
    </Box>
  );
};

export default CoursesPage;
