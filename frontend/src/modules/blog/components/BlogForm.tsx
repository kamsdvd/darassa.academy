import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useBlog } from '../hooks/useBlog';
import { BlogPost, BlogPostStatus, BlogCategory } from '../types/blog.types';
import ReactMarkdown from 'react-markdown';

interface BlogFormProps {
  postId?: string;
}

const BlogForm: React.FC<BlogFormProps> = ({ postId }) => {
  const router = useRouter();
  const {
    currentPost,
    categories,
    loading,
    error,
    loadPost,
    loadCategories,
    createPost,
    updatePost,
    uploadImage
  } = useBlog();

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: {} as BlogCategory,
    tags: [],
    status: BlogPostStatus.DRAFT,
    seo: {
      title: '',
      description: '',
      keywords: []
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    loadCategories();
    if (postId) {
      loadPost(postId);
    }
  }, [postId, loadPost, loadCategories]);

  useEffect(() => {
    if (currentPost) {
      setFormData(currentPost);
      setPreviewUrl(currentPost.featuredImage);
    }
  }, [currentPost]);

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const categoryId = event.target.value as string;
    const category = categories.find(c => c.id === categoryId);
    setFormData(prev => ({
      ...prev,
      category
    }));
  };

  const handleTagsChange = (event: React.SyntheticEvent, newValue: string[]) => {
    setFormData(prev => ({
      ...prev,
      tags: newValue
    }));
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const status = event.target.value as BlogPostStatus;
    setFormData(prev => ({
      ...prev,
      status
    }));
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      try {
        const { url } = await uploadImage(file);
        setFormData(prev => ({
          ...prev,
          featuredImage: url
        }));
      } catch (error) {
        console.error('Erreur lors de l\'upload de l\'image:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.content?.trim()) {
      newErrors.content = 'Le contenu est requis';
    }

    if (!formData.excerpt?.trim()) {
      newErrors.excerpt = 'L\'extrait est requis';
    }

    if (!formData.category?.id) {
      newErrors.category = 'La catégorie est requise';
    }

    if (!formData.featuredImage) {
      newErrors.featuredImage = 'L\'image principale est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (postId) {
        await updatePost(postId, formData);
      } else {
        await createPost(formData as Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>);
      }
      router.push('/blog');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
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
          {postId ? 'Modifier l\'article' : 'Nouvel article'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre"
                value={formData.title}
                onChange={handleInputChange('title')}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Extrait"
                value={formData.excerpt}
                onChange={handleInputChange('excerpt')}
                multiline
                rows={3}
                error={!!errors.excerpt}
                helperText={errors.excerpt}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contenu"
                value={formData.content}
                onChange={handleInputChange('content')}
                multiline
                rows={10}
                error={!!errors.content}
                helperText={errors.content}
              />
            </Grid>

            <Grid item xs={12}>
              <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                  Aperçu
                </Typography>
                <Paper sx={{ p: 2 }}>
                  <ReactMarkdown>{formData.content || ''}</ReactMarkdown>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={formData.category?.id || ''}
                  onChange={handleCategoryChange}
                  label="Catégorie"
                >
                  {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Statut</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleStatusChange}
                  label="Statut"
                >
                  {Object.values(BlogPostStatus).map(status => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.tags || []}
                onChange={handleTagsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Ajouter un tag"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center'
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  hidden
                  onChange={handleImageChange}
                />
                <label htmlFor="image-upload">
                  <Button
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    variant="outlined"
                  >
                    Choisir une image
                  </Button>
                </label>
                {previewUrl && (
                  <Box mt={2}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: 200,
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                )}
                {errors.featuredImage && (
                  <FormHelperText error>{errors.featuredImage}</FormHelperText>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                SEO
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Titre SEO"
                    value={formData.seo?.title}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value }
                    }))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description SEO"
                    value={formData.seo?.description}
                    onChange={e => setFormData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value }
                    }))}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={formData.seo?.keywords || []}
                    onChange={(_, newValue) => setFormData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, keywords: newValue }
                    }))}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Mots-clés SEO"
                        placeholder="Ajouter un mot-clé"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => router.push('/blog')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {postId ? 'Mettre à jour' : 'Publier'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogForm; 