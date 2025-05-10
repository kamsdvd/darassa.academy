import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTraining } from '../hooks/useTraining';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';

export const MyCourses: React.FC = () => {
  const router = useRouter();
  const {
    enrollments,
    isLoading,
    error,
    loadEnrollments
  } = useTraining();

  useEffect(() => {
    loadEnrollments();
  }, []);

  const handleContinueLearning = (courseId: string) => {
    router.push(`/courses/${courseId}`);
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
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Mes cours
        </Typography>

        {enrollments.length === 0 ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Vous n'êtes inscrit à aucun cours pour le moment
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push('/courses')}
            >
              Découvrir les cours
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {enrollments.map((enrollment) => (
              <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={enrollment.course.thumbnail}
                    alt={enrollment.course.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {enrollment.course.title}
                    </Typography>
                    <Box mb={2}>
                      <Typography variant="body2" color="text.secondary">
                        Progression
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={enrollment.progress}
                        sx={{ mt: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="right"
                        sx={{ mt: 0.5 }}
                      >
                        {enrollment.progress}%
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Chip
                        label={enrollment.status}
                        color={
                          enrollment.status === 'COMPLETED'
                            ? 'success'
                            : enrollment.status === 'IN_PROGRESS'
                            ? 'primary'
                            : 'default'
                        }
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayCircleOutline />}
                        onClick={() => handleContinueLearning(enrollment.course.id)}
                      >
                        Continuer
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}; 