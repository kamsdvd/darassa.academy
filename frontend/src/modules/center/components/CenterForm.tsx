import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCenter } from '../hooks/useCenter';
import { Center, CenterStatus, FacilityType, FacilityStatus } from '../types/center.types';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete, Add } from '@mui/icons-material';

interface CenterFormProps {
  centerId?: string;
}

export const CenterForm: React.FC<CenterFormProps> = ({ centerId }) => {
  const router = useRouter();
  const {
    currentCenter: center,
    isLoading,
    error,
    loadCenter,
    createCenter,
    updateCenter
  } = useCenter();

  const [formData, setFormData] = useState<Partial<Center>>({
    name: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    },
    contact: {
      phone: '',
      email: ''
    },
    status: CenterStatus.ACTIVE,
    capacity: 0,
    openingHours: {
      monday: { isOpen: true, open: '09:00', close: '18:00' },
      tuesday: { isOpen: true, open: '09:00', close: '18:00' },
      wednesday: { isOpen: true, open: '09:00', close: '18:00' },
      thursday: { isOpen: true, open: '09:00', close: '18:00' },
      friday: { isOpen: true, open: '09:00', close: '18:00' },
      saturday: { isOpen: false, open: '', close: '' },
      sunday: { isOpen: false, open: '', close: '' }
    },
    facilities: [],
    staff: [],
    images: []
  });

  const [newFacility, setNewFacility] = useState({
    name: '',
    description: '',
    type: FacilityType.CLASSROOM,
    capacity: 0,
    status: FacilityStatus.AVAILABLE
  });

  useEffect(() => {
    if (centerId) {
      loadCenter(centerId);
    }
  }, [centerId]);

  useEffect(() => {
    if (center) {
      setFormData(center);
    }
  }, [center]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address!,
        [field]: value
      }
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact!,
        [field]: value
      }
    }));
  };

  const handleOpeningHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours!,
        [day]: {
          ...prev.openingHours![day as keyof typeof prev.openingHours],
          [field]: value
        }
      }
    }));
  };

  const handleAddFacility = () => {
    if (newFacility.name && newFacility.description) {
      setFormData(prev => ({
        ...prev,
        facilities: [
          ...(prev.facilities || []),
          {
            id: Date.now().toString(),
            ...newFacility
          }
        ]
      }));
      setNewFacility({
        name: '',
        description: '',
        type: FacilityType.CLASSROOM,
        capacity: 0,
        status: FacilityStatus.AVAILABLE
      });
    }
  };

  const handleRemoveFacility = (facilityId: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities?.filter(f => f.id !== facilityId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (centerId) {
        await updateCenter(centerId, formData);
      } else {
        await createCenter(formData);
      }
      router.push('/centers');
    } catch (error) {
      console.error('Error saving center:', error);
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
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          {centerId ? 'Modifier le centre' : 'Nouveau centre'}
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Informations de base */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Informations de base
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nom"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Statut"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  required
                >
                  {Object.values(CenterStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Capacité"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                  required
                />
              </Grid>

              {/* Adresse */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Adresse
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Rue"
                  value={formData.address?.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ville"
                  value={formData.address?.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="État/Région"
                  value={formData.address?.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pays"
                  value={formData.address?.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Code postal"
                  value={formData.address?.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  required
                />
              </Grid>

              {/* Contact */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Contact
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={formData.contact?.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.contact?.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  required
                />
              </Grid>

              {/* Horaires d'ouverture */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Horaires d'ouverture
                </Typography>
              </Grid>
              {Object.entries(formData.openingHours || {}).map(([day, hours]) => (
                <Grid item xs={12} md={6} key={day}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                      select
                      label="Jour"
                      value={day}
                      disabled
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </MenuItem>
                    </TextField>
                    <TextField
                      type="time"
                      label="Ouverture"
                      value={hours.open}
                      onChange={(e) => handleOpeningHoursChange(day, 'open', e.target.value)}
                      disabled={!hours.isOpen}
                      sx={{ minWidth: 120 }}
                    />
                    <TextField
                      type="time"
                      label="Fermeture"
                      value={hours.close}
                      onChange={(e) => handleOpeningHoursChange(day, 'close', e.target.value)}
                      disabled={!hours.isOpen}
                      sx={{ minWidth: 120 }}
                    />
                  </Box>
                </Grid>
              ))}

              {/* Installations */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Installations
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    label="Nom"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <TextField
                    label="Description"
                    value={newFacility.description}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <TextField
                    select
                    label="Type"
                    value={newFacility.type}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, type: e.target.value as FacilityType }))}
                    sx={{ minWidth: 150 }}
                  >
                    {Object.values(FacilityType).map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="number"
                    label="Capacité"
                    value={newFacility.capacity}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  />
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAddFacility}
                  >
                    Ajouter
                  </Button>
                </Box>
                <List>
                  {formData.facilities?.map((facility) => (
                    <ListItem key={facility.id}>
                      <ListItemText
                        primary={facility.name}
                        secondary={`${facility.type} - Capacité: ${facility.capacity}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleRemoveFacility(facility.id)}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Boutons d'action */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="outlined"
                    onClick={() => router.push('/centers')}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {centerId ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}; 