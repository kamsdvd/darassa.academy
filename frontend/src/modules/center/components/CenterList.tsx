import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCenter } from '../hooks/useCenter';
import { CenterStatus } from '../types/center.types';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Edit,
  Add
} from '@mui/icons-material';

export const CenterList: React.FC = () => {
  const router = useRouter();
  const {
    centers,
    isLoading,
    error,
    loadCenters
  } = useCenter();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    city: ''
  });

  useEffect(() => {
    loadCenters(filters);
  }, [filters]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleViewCenter = (centerId: string) => {
    router.push(`/centers/${centerId}`);
  };

  const handleCreateCenter = () => {
    router.push('/centers/new');
  };

  const handleEditCenter = (centerId: string) => {
    router.push(`/centers/${centerId}/edit`);
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Centres de formation</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleCreateCenter}
          >
            Nouveau centre
          </Button>
        </Box>

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
            label="Statut"
            variant="outlined"
            size="small"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{ minWidth: 150 }}
          >
            <MenuItem value="">Tous</MenuItem>
            <MenuItem value={CenterStatus.ACTIVE}>Actif</MenuItem>
            <MenuItem value={CenterStatus.INACTIVE}>Inactif</MenuItem>
            <MenuItem value={CenterStatus.MAINTENANCE}>En maintenance</MenuItem>
            <MenuItem value={CenterStatus.CLOSED}>Fermé</MenuItem>
          </TextField>
          <TextField
            label="Ville"
            variant="outlined"
            size="small"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          />
        </Box>

        {/* Liste des centres */}
        <Grid container spacing={3}>
          {centers.map((center) => (
            <Grid item xs={12} sm={6} md={4} key={center.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={center.images[0] || '/images/center-placeholder.jpg'}
                  alt={center.name}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography gutterBottom variant="h6" component="div">
                      {center.name}
                    </Typography>
                    <Tooltip title="Modifier">
                      <IconButton
                        size="small"
                        onClick={() => handleEditCenter(center.id)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {center.description}
                  </Typography>
                  <Box display="flex" flexDirection="column" gap={1} mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">
                        {center.address.city}, {center.address.country}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Phone fontSize="small" color="action" />
                      <Typography variant="body2">{center.contact.phone}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Email fontSize="small" color="action" />
                      <Typography variant="body2">{center.contact.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2">
                        {center.openingHours.monday.isOpen
                          ? 'Ouvert aujourd\'hui'
                          : 'Fermé aujourd\'hui'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={center.status}
                      color={
                        center.status === CenterStatus.ACTIVE
                          ? 'success'
                          : center.status === CenterStatus.MAINTENANCE
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewCenter(center.id)}
                    >
                      Voir détails
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}; 