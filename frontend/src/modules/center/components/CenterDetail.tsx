import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useCenter } from '../hooks/useCenter';
import { CenterStatus, FacilityType, FacilityStatus } from '../types/center.types';
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
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Edit,
  School,
  Computer,
  Science,
  MeetingRoom,
  SportsHandball,
  Restaurant,
  LocalParking,
  Wifi,
  Security
} from '@mui/icons-material';

export const CenterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    currentCenter: center,
    isLoading,
    error,
    loadCenter
  } = useCenter();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (id) {
      loadCenter(id as string);
    }
  }, [id]);

  const handleEditCenter = () => {
    router.push(`/centers/${id}/edit`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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

  if (!center) {
    return (
      <Box m={2}>
        <Alert severity="info">Centre non trouvé</Alert>
      </Box>
    );
  }

  const getFacilityIcon = (type: FacilityType) => {
    switch (type) {
      case FacilityType.CLASSROOM:
        return <School />;
      case FacilityType.LABORATORY:
        return <Science />;
      case FacilityType.COMPUTER_LAB:
        return <Computer />;
      case FacilityType.MEETING_ROOM:
        return <MeetingRoom />;
      case FacilityType.SPORTS_FACILITY:
        return <SportsHandball />;
      case FacilityType.CAFETERIA:
        return <Restaurant />;
      case FacilityType.PARKING:
        return <LocalParking />;
      default:
        return <School />;
    }
  };

  const getStatusColor = (status: FacilityStatus) => {
    switch (status) {
      case FacilityStatus.AVAILABLE:
        return 'success';
      case FacilityStatus.OCCUPIED:
        return 'warning';
      case FacilityStatus.MAINTENANCE:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {/* En-tête */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {center.name}
            </Typography>
            <Chip
              label={center.status}
              color={
                center.status === CenterStatus.ACTIVE
                  ? 'success'
                  : center.status === CenterStatus.MAINTENANCE
                  ? 'warning'
                  : 'default'
              }
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={handleEditCenter}
          >
            Modifier
          </Button>
        </Box>

        {/* Images */}
        <Box mb={4}>
          <Grid container spacing={2}>
            {center.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={`${center.name} - Image ${index + 1}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Informations" />
            <Tab label="Installations" />
            <Tab label="Équipements" />
            <Tab label="Personnel" />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        <Box mt={3}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {center.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Contact
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText
                        primary="Adresse"
                        secondary={`${center.address.street}, ${center.address.city}, ${center.address.country}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary="Téléphone"
                        secondary={center.contact.phone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={center.contact.email}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Horaires d'ouverture
                  </Typography>
                  <List>
                    {Object.entries(center.openingHours).map(([day, hours]) => (
                      <ListItem key={day}>
                        <ListItemIcon>
                          <AccessTime />
                        </ListItemIcon>
                        <ListItemText
                          primary={day.charAt(0).toUpperCase() + day.slice(1)}
                          secondary={
                            hours.isOpen
                              ? `${hours.open} - ${hours.close}`
                              : 'Fermé'
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Capacité
                  </Typography>
                  <Typography variant="body1">
                    Capacité totale : {center.capacity} personnes
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              {center.facilities.map((facility) => (
                <Grid item xs={12} sm={6} md={4} key={facility.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {getFacilityIcon(facility.type)}
                          <Typography variant="h6">
                            {facility.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={facility.status}
                          color={getStatusColor(facility.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {facility.description}
                      </Typography>
                      <Typography variant="body2">
                        Capacité : {facility.capacity} personnes
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              {center.facilities.map((facility) => (
                <Grid item xs={12} key={facility.id}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {facility.name}
                    </Typography>
                    <Grid container spacing={2}>
                      {facility.equipment.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                          <Card>
                            <CardContent>
                              <Typography variant="subtitle1">
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Type : {item.type}
                              </Typography>
                              <Typography variant="body2">
                                Quantité : {item.quantity}
                              </Typography>
                              <Chip
                                label={item.status}
                                color={
                                  item.status === 'OPERATIONAL'
                                    ? 'success'
                                    : 'warning'
                                }
                                size="small"
                                sx={{ mt: 1 }}
                              />
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={3}>
              {center.staff.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {member.firstName} {member.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                      <Typography variant="body2">
                        Département : {member.department}
                      </Typography>
                      <Typography variant="body2">
                        Email : {member.email}
                      </Typography>
                      <Typography variant="body2">
                        Téléphone : {member.phone}
                      </Typography>
                      <Chip
                        label={member.status}
                        color={
                          member.status === 'ACTIVE'
                            ? 'success'
                            : member.status === 'ON_LEAVE'
                            ? 'warning'
                            : 'default'
                        }
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
}; 