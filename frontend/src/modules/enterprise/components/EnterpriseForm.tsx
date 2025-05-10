import React, { useEffect, useState } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEnterprise } from '../hooks/useEnterprise';
import {
  Enterprise,
  EnterpriseStatus,
  EnterpriseType,
  Employee,
  Department,
  Project,
  Partnership
} from '../types/enterprise.types';

interface EnterpriseFormProps {
  enterpriseId?: string;
}

const steps = ['Informations générales', 'Contact', 'Employés', 'Départements', 'Projets', 'Partenariats'];

const EnterpriseForm: React.FC<EnterpriseFormProps> = ({ enterpriseId }) => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Enterprise>>({
    name: '',
    description: '',
    logo: '',
    industry: '',
    type: EnterpriseType.PRIVATE,
    status: EnterpriseStatus.PENDING,
    address: '',
    contact: {
      phone: '',
      email: '',
      website: ''
    },
    employees: [],
    departments: [],
    projects: [],
    partnerships: []
  });

  const {
    currentEnterprise: enterprise,
    loading,
    error,
    loadEnterprise,
    createEnterprise,
    updateEnterprise
  } = useEnterprise();

  useEffect(() => {
    if (enterpriseId) {
      loadEnterprise(enterpriseId);
    }
  }, [enterpriseId, loadEnterprise]);

  useEffect(() => {
    if (enterprise) {
      setFormData(enterprise);
    }
  }, [enterprise]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleContactChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: event.target.value
      }
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      if (enterpriseId) {
        await updateEnterprise(enterpriseId, formData);
      } else {
        await createEnterprise(formData as Omit<Enterprise, 'id' | 'createdAt' | 'updatedAt'>);
      }
      router.push('/enterprises');
    } catch (error) {
      console.error('Error submitting form:', error);
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {enterpriseId ? 'Modifier une entreprise' : 'Nouvelle entreprise'}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" noValidate>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nom"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Logo URL"
                  value={formData.logo}
                  onChange={handleInputChange('logo')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Industrie"
                  value={formData.industry}
                  onChange={handleInputChange('industry')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  value={formData.type}
                  onChange={handleInputChange('type')}
                  required
                >
                  {Object.values(EnterpriseType).map(type => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Statut"
                  value={formData.status}
                  onChange={handleInputChange('status')}
                  required
                >
                  {Object.values(EnterpriseStatus).map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresse"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  value={formData.contact?.phone}
                  onChange={handleContactChange('phone')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.contact?.email}
                  onChange={handleContactChange('email')}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Site web"
                  value={formData.contact?.website}
                  onChange={handleContactChange('website')}
                />
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Employés
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                La gestion des employés se fait dans la section détaillée de l'entreprise.
              </Typography>
            </Box>
          )}

          {activeStep === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Départements
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                La gestion des départements se fait dans la section détaillée de l'entreprise.
              </Typography>
            </Box>
          )}

          {activeStep === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Projets
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                La gestion des projets se fait dans la section détaillée de l'entreprise.
              </Typography>
            </Box>
          )}

          {activeStep === 5 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Partenariats
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                La gestion des partenariats se fait dans la section détaillée de l'entreprise.
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Retour
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {enterpriseId ? 'Mettre à jour' : 'Créer'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Suivant
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EnterpriseForm; 