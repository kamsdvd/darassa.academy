import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Business as BusinessIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEnterprise } from '../hooks/useEnterprise';
import { Enterprise, EnterpriseStatus, EnterpriseType } from '../types/enterprise.types';

const EnterpriseList: React.FC = () => {
  const router = useRouter();
  const {
    enterprises,
    loading,
    error,
    loadEnterprises
  } = useEnterprise();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    industry: ''
  });

  useEffect(() => {
    loadEnterprises(filters);
  }, [filters, loadEnterprises]);

  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleView = (enterpriseId: string) => {
    router.push(`/enterprises/${enterpriseId}`);
  };

  const handleCreate = () => {
    router.push('/enterprises/create');
  };

  const handleEdit = (enterpriseId: string) => {
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Entreprises
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nouvelle entreprise
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
            {Object.values(EnterpriseStatus).map(status => (
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
            {Object.values(EnterpriseType).map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Industrie"
            value={filters.industry}
            onChange={handleFilterChange('industry')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {enterprises.map((enterprise: Enterprise) => (
          <Grid item xs={12} sm={6} md={4} key={enterprise.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={enterprise.logo || '/images/enterprise-placeholder.jpg'}
                alt={enterprise.name}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {enterprise.name}
                  </Typography>
                  <Chip
                    label={enterprise.status}
                    color={getStatusColor(enterprise.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {enterprise.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Box>
                    <Chip
                      icon={<BusinessIcon />}
                      label={enterprise.type}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={enterprise.industry}
                      size="small"
                    />
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleView(enterprise.id)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(enterprise.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EnterpriseList; 