import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTraining } from '../hooks/useTraining';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Rating,
  TextField,
  Avatar
} from '@mui/material';
import {
  PlayCircleOutline,
  Description,
  Assignment,
  Quiz,
  Star
} from '@mui/icons-material';

export const CourseDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    currentCourse,
    reviews,
    isLoading,
    error,
    loadCourse,
    enrollInCourse,
    addReview
  } = useTraining();

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    if (id) {
      loadCourse(id as string);
    }
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollInCourse(id as string);
      // Vous pouvez ajouter une notification de succès ici
    } catch (error) {
      // Vous pouvez ajouter une notification d'erreur ici
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview(id as string, newReview);
      setNewReview({ rating: 0, comment: '' });
      // Vous pouvez ajouter une notification de succès ici
    } catch (error) {
      // Vous pouvez ajouter une notification d'erreur ici
      console.error('Erreur lors de l\'ajout de l\'avis:', error);
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

  if (!currentCourse) {
    return (
      <Box m={2}>
        <Alert severity="info">Cours non trouvé</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* En-tête du cours */}
      <Box py={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {currentCourse.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {currentCourse.description}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip
                label={currentCourse.level}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={currentCourse.category}
                color="secondary"
                variant="outlined"
              />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="h5" color="primary">
                {currentCourse.price} {currentCourse.currency}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleEnroll}
              >
                S'inscrire maintenant
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  Ce que vous allez apprendre
                </Typography>
                <List>
                  {currentCourse.modules.map((module) => (
                    <ListItem key={module.id}>
                      <ListItemIcon>
                        <Star color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={module.title} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Contenu du cours */}
      <Box py={4}>
        <Typography variant="h5" gutterBottom>
          Contenu du cours
        </Typography>
        <List>
          {currentCourse.modules.map((module) => (
            <Paper key={module.id} sx={{ mb: 2 }}>
              <Box p={2}>
                <Typography variant="h6" gutterBottom>
                  {module.title}
                </Typography>
                <List>
                  {module.lessons.map((lesson) => (
                    <ListItem key={lesson.id}>
                      <ListItemIcon>
                        {lesson.type === 'VIDEO' && <PlayCircleOutline />}
                        {lesson.type === 'DOCUMENT' && <Description />}
                        {lesson.type === 'ASSIGNMENT' && <Assignment />}
                        {lesson.type === 'QUIZ' && <Quiz />}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={`${lesson.duration} minutes`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Paper>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Avis */}
      <Box py={4}>
        <Typography variant="h5" gutterBottom>
          Avis des étudiants
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Ajouter un avis
              </Typography>
              <form onSubmit={handleReviewSubmit}>
                <Box mb={2}>
                  <Typography component="legend">Note</Typography>
                  <Rating
                    value={newReview.rating}
                    onChange={(_, value) =>
                      setNewReview(prev => ({ ...prev, rating: value || 0 }))
                    }
                  />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Votre commentaire"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview(prev => ({ ...prev, comment: e.target.value }))
                  }
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Publier
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {reviews.map((review) => (
              <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar src={review.user.avatar} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      {review.user.firstName} {review.user.lastName}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}; 