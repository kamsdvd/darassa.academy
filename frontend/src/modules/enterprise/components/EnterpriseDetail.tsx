import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Handshake as HandshakeIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEnterprise } from '../hooks/useEnterprise';
import { Enterprise, EnterpriseStatus } from '../types/enterprise.types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const EnterpriseDetail: React.FC = () => {
  const router = useRouter();
  const { enterpriseId } = router.query;
  const [activeTab, setActiveTab] = useState(0);

  const {
    currentEnterprise: enterprise,
    loading,
    error,
    loadEnterprise,
    loadEmployees,
    loadDepartments,
    loadProjects,
    loadPartnerships
  } = useEnterprise();

  useEffect(() => {
    if (enterpriseId) {
      loadEnterprise(enterpriseId as string);
    }
  }, [enterpriseId, loadEnterprise]);

  useEffect(() => {
    if (enterprise) {
      loadEmployees(enterprise.id);
      loadDepartments(enterprise.id);
      loadProjects(enterprise.id);
      loadPartnerships(enterprise.id);
    }
  }, [enterprise, loadEmployees, loadDepartments, loadProjects, loadPartnerships]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    router.push(`/enterprises/${enterpriseId}/edit`);
  };

  const getStatusColor = (status: EnterpriseStatus) => {
    switch (status) {
      case EnterpriseStatus.ACTIVE:
        return 'success';
      case EnterpriseStatus.INACTIVE:
        return 'error';
      case EnterpriseStatus.PENDING:
        return 'warning';
      default:
        return 'default';
    }
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

  if (!enterprise) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Entreprise non trouvée</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {enterprise.name}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              label={enterprise.status}
              color={getStatusColor(enterprise.status)}
            />
            <Chip
              icon={<BusinessIcon />}
              label={enterprise.type}
            />
            <Chip
              label={enterprise.industry}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Modifier
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={enterprise.logo || '/images/enterprise-placeholder.jpg'}
              alt={enterprise.name}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informations de contact
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Adresse"
                    secondary={enterprise.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Téléphone"
                    secondary={enterprise.contact.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={enterprise.contact.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Site web"
                    secondary={enterprise.contact.website}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab icon={<BusinessIcon />} label="Description" />
              <Tab icon={<PeopleIcon />} label="Employés" />
              <Tab icon={<WorkIcon />} label="Départements" />
              <Tab icon={<AssignmentIcon />} label="Projets" />
              <Tab icon={<HandshakeIcon />} label="Partenariats" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="body1" paragraph>
                {enterprise.description}
              </Typography>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <List>
                {enterprise.employees?.map(employee => (
                  <React.Fragment key={employee.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${employee.firstName} ${employee.lastName}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {employee.role}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              {employee.department}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <List>
                {enterprise.departments?.map(department => (
                  <React.Fragment key={department.id}>
                    <ListItem>
                      <ListItemText
                        primary={department.name}
                        secondary={department.description}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <List>
                {enterprise.projects?.map(project => (
                  <React.Fragment key={project.id}>
                    <ListItem>
                      <ListItemText
                        primary={project.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {project.description}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Statut: {project.status}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <List>
                {enterprise.partnerships?.map(partnership => (
                  <React.Fragment key={partnership.id}>
                    <ListItem>
                      <ListItemText
                        primary={partnership.name}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {partnership.description}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Type: {partnership.type}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2">
                              Statut: {partnership.status}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EnterpriseDetail; 