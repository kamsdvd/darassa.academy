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
  Alert,
  Divider,
  Avatar,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  RemoveRedEye as ViewIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useBlog } from '../hooks/useBlog';
import { BlogPost, BlogPostStatus } from '../types/blog.types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const BlogList: React.FC = () => {
  const router = useRouter();
  const {
    posts,
    loading,
    error,
    loadPosts,
    likePost
  } = useBlog();

  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: ''
  });

  useEffect(() => {
    loadPosts(filters);
  }, [filters, loadPosts]);

  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleView = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const handleCreate = () => {
    router.push('/blog/create');
  };

  const handleEdit = (slug: string) => {
    router.push(`/blog/${slug}/edit`);
  };

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    }
  };

  const getStatusColor = (status: BlogPostStatus) => {
    switch (status) {
      case BlogPostStatus.PUBLISHED:
        return 'success';
      case BlogPostStatus.DRAFT:
        return 'default';
      case BlogPostStatus.SCHEDULED:
        return 'warning';
      case BlogPostStatus.ARCHIVED:
        return 'error';
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
          Blog
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Nouvel article
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            select
            label="Statut"
            value={filters.status}
            onChange={handleFilterChange('status')}
          >
            <MenuItem value="">Tous</MenuItem>
            {Object.values(BlogPostStatus).map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {posts.map((post: BlogPost) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={post.featuredImage}
                alt={post.title}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {post.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                      <Avatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        sx={{ width: 24, height: 24 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {post.author.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        •
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                          locale: fr
                        })}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box>
                    <Chip
                      label={post.status}
                      color={getStatusColor(post.status)}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleView(post.slug)}
                      sx={{ mr: 1 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(post.slug)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body1" color="text.secondary" paragraph>
                  {post.excerpt}
                </Typography>

                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                  {post.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" gap={2}>
                    <Button
                      size="small"
                      startIcon={<FavoriteIcon />}
                      onClick={() => handleLike(post.id)}
                    >
                      {post.likes}
                    </Button>
                    <Button
                      size="small"
                      startIcon={<CommentIcon />}
                    >
                      {post.comments.length}
                    </Button>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                    >
                      {post.views}
                    </Button>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleView(post.slug)}
                  >
                    Lire la suite
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogList; 