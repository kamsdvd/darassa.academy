import React, { useEffect, useState } from 'react';
import { useTraining } from '../hooks/useTraining';
import { Course, CourseLevel } from '../types/training.types';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';

export const CourseList: React.FC = () => {
  const {
    courses,
    isLoading,
    error,
    loadCourses,
    enrollInCourse
  } = useTraining();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    level: ''
  });

  useEffect(() => {
    loadCourses(filters);
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      // Vous pouvez ajouter une notification de succès ici
    } catch (error) {
      // Vous pouvez ajouter une notification d'erreur ici
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Filtres */}
      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <TextField
          select
          label="Catégorie"
          variant="outlined"
          size="small"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="">Toutes</MenuItem>
          <MenuItem value="programming">Programmation</MenuItem>
          <MenuItem value="design">Design</MenuItem>
          <MenuItem value="business">Business</MenuItem>
        </TextField>
        <TextField
          select
          label="Niveau"
          variant="outlined"
          size="small"
          value={filters.level}
          onChange={(e) => handleFilterChange('level', e.target.value)}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="">Tous</MenuItem>
          <MenuItem value={CourseLevel.BEGINNER}>Débutant</MenuItem>
          <MenuItem value={CourseLevel.INTERMEDIATE}>Intermédiaire</MenuItem>
          <MenuItem value={CourseLevel.ADVANCED}>Avancé</MenuItem>
        </TextField>
      </Box>

      {/* Liste des cours */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {course.description}
                </Typography>
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={course.level}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={course.category}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    {course.price} {course.currency}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEnroll(course.id)}
                  >
                    S'inscrire
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}; 