import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  Work as WorkIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useJob } from '../hooks/useJob';
import { Job, JobStatus, JobType, ExperienceLevel } from '../types/job.types';

const JobList: React.FC = () => {
  const router = useRouter();
  const {
    jobs,
    loading,
    error,
    loadJobs
  } = useJob();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    location: '',
    experience: ''
  });

  useEffect(() => {
    loadJobs(filters);
  }, [filters, loadJobs]);

  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleView = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const handleCreate = () => {
    router.push('/jobs/create');
  };

  const handleEdit = (jobId: string) => {
    router.push(`/jobs/${jobId}/edit`);
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.PUBLISHED:
        return 'success';
      case JobStatus.CLOSED:
        return 'error';
      case JobStatus.DRAFT:
        return 'default';
      case JobStatus.ON_HOLD:
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Offres d'emploi
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nouvelle offre
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Rechercher"
            value={filters.search}
            onChange={handleFilterChange('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Statut"
            value={filters.status}
            onChange={handleFilterChange('status')}
          >
            <MenuItem value="">Tous</MenuItem>
            {Object.values(JobStatus).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Type"
            value={filters.type}
            onChange={handleFilterChange('type')}
          >
            <MenuItem value="">Tous</MenuItem>
            {Object.values(JobType).map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            select
            label="Expérience"
            value={filters.experience}
            onChange={handleFilterChange('experience')}
          >
            <MenuItem value="">Tous</MenuItem>
            {Object.values(ExperienceLevel).map(level => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {jobs.map((job: Job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {job.title}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Chip
                        icon={<WorkIcon />}
                        label={job.type}
                        size="small"
                      />
                      <Chip
                        icon={<LocationIcon />}
                        label={job.location}
                        size="small"
                      />
                      <Chip
                        icon={<MoneyIcon />}
                        label={formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                        size="small"
                      />
                      <Chip
                        icon={<ScheduleIcon />}
                        label={`Date limite: ${new Date(job.deadline).toLocaleDateString()}`}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Chip
                      label={job.status}
                      color={getStatusColor(job.status)}
                      sx={{ mr: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleView(job.id)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(job.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" paragraph>
                  {job.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" gap={1} flexWrap="wrap">
                  {job.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobList; 