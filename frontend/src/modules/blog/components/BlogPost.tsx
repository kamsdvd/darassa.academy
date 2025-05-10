import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Avatar,
  Divider,
  TextField,
  CircularProgress,
  Alert,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  RemoveRedEye as ViewIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useBlog } from '../hooks/useBlog';
import { BlogPost as BlogPostType, BlogComment, CommentStatus } from '../types/blog.types';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    currentPost,
    loading,
    error,
    loadPost,
    likePost,
    createComment,
    updateCommentStatus,
    deleteComment,
    likeComment
  } = useBlog();

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadPost(slug as string);
    }
  }, [slug, loadPost]);

  const handleEdit = () => {
    if (currentPost) {
      router.push(`/blog/${currentPost.slug}/edit`);
    }
  };

  const handleLike = async () => {
    if (currentPost) {
      try {
        await likePost(currentPost.id);
      } catch (error) {
        console.error('Erreur lors du like:', error);
      }
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (currentPost) {
      try {
        await likeComment(currentPost.id, commentId);
      } catch (error) {
        console.error('Erreur lors du like du commentaire:', error);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPost && newComment.trim()) {
      try {
        await createComment(currentPost.id, {
          content: newComment,
          postId: currentPost.id,
          author: {
            id: 'current-user-id', // À remplacer par l'ID de l'utilisateur connecté
            name: 'Utilisateur' // À remplacer par le nom de l'utilisateur connecté
          },
          status: CommentStatus.PENDING
        });
        setNewComment('');
        setReplyTo(null);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire:', error);
      }
    }
  };

  const handleCommentStatusChange = async (commentId: string, status: CommentStatus) => {
    if (currentPost) {
      try {
        await updateCommentStatus(currentPost.id, commentId, status);
      } catch (error) {
        console.error('Erreur lors du changement de statut:', error);
      }
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    if (currentPost) {
      try {
        await deleteComment(currentPost.id, commentId);
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
      }
    }
  };

  const renderComment = (comment: BlogComment, level = 0) => (
    <ListItem
      key={comment.id}
      alignItems="flex-start"
      sx={{ pl: level * 4 }}
    >
      <ListItemAvatar>
        <Avatar src={comment.author.avatar} alt={comment.author.name} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle2">{comment.author.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: fr
              })}
            </Typography>
          </Box>
        }
        secondary={
          <>
            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
              {comment.content}
            </Typography>
            <Box display="flex" gap={1} mt={1}>
              <Button
                size="small"
                startIcon={<FavoriteIcon />}
                onClick={() => handleCommentLike(comment.id)}
              >
                {comment.likes}
              </Button>
              <Button
                size="small"
                startIcon={<ReplyIcon />}
                onClick={() => setReplyTo(comment.id)}
              >
                Répondre
              </Button>
            </Box>
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          size="small"
          onClick={() => handleCommentDelete(comment.id)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

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

  if (!currentPost) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Article non trouvé</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {currentPost.title}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={currentPost.author.avatar}
                alt={currentPost.author.name}
              />
              <Typography variant="subtitle1">
                {currentPost.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDistanceToNow(new Date(currentPost.createdAt), {
                  addSuffix: true,
                  locale: fr
                })}
              </Typography>
            </Stack>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Modifier
          </Button>
        </Box>

        <Box
          component="img"
          src={currentPost.featuredImage}
          alt={currentPost.title}
          sx={{
            width: '100%',
            height: 400,
            objectFit: 'cover',
            borderRadius: 1,
            mb: 4
          }}
        />

        <Box mb={4}>
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
        </Box>

        <Box display="flex" gap={1} flexWrap="wrap" mb={4}>
          {currentPost.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" gap={2}>
            <Button
              startIcon={<FavoriteIcon />}
              onClick={handleLike}
            >
              {currentPost.likes} J'aime
            </Button>
            <Button startIcon={<CommentIcon />}>
              {currentPost.comments.length} Commentaires
            </Button>
            <Button startIcon={<ViewIcon />}>
              {currentPost.views} Vues
            </Button>
          </Box>
        </Box>

        <Box component="form" onSubmit={handleCommentSubmit} mb={4}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ajouter un commentaire"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={!newComment.trim()}
            >
              Publier
            </Button>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom>
          Commentaires ({currentPost.comments.length})
        </Typography>

        <List>
          {currentPost.comments.map(comment => (
            <React.Fragment key={comment.id}>
              {renderComment(comment)}
              {comment.replies?.map(reply => renderComment(reply, 1))}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BlogPost; 