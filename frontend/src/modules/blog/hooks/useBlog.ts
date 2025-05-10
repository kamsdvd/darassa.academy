import { useState, useCallback } from 'react';
import { blogService } from '../services/blog.service';
import {
  BlogPost,
  BlogCategory,
  BlogComment,
  BlogPostStatus,
  CommentStatus,
  BlogState
} from '../types/blog.types';

export const useBlog = () => {
  const [state, setState] = useState<BlogState>({
    posts: [],
    currentPost: null,
    categories: [],
    loading: false,
    error: null
  });

  // Articles
  const loadPosts = useCallback(async (params?: {
    status?: BlogPostStatus;
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const posts = await blogService.getPosts(params);
      setState(prev => ({ ...prev, posts, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const loadPost = useCallback(async (slug: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const post = await blogService.getPostBySlug(slug);
      setState(prev => ({ ...prev, currentPost: post, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const createPost = useCallback(async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newPost = await blogService.createPost(post);
      setState(prev => ({
        ...prev,
        posts: [...prev.posts, newPost],
        loading: false
      }));
      return newPost;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (postId: string, post: Partial<BlogPost>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedPost = await blogService.updatePost(postId, post);
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p.id === postId ? updatedPost : p)),
        currentPost: prev.currentPost?.id === postId ? updatedPost : prev.currentPost,
        loading: false
      }));
      return updatedPost;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updatePostStatus = useCallback(async (postId: string, status: BlogPostStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedPost = await blogService.updatePostStatus(postId, status);
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p.id === postId ? updatedPost : p)),
        currentPost: prev.currentPost?.id === postId ? updatedPost : prev.currentPost,
        loading: false
      }));
      return updatedPost;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (postId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await blogService.deletePost(postId);
      setState(prev => ({
        ...prev,
        posts: prev.posts.filter(p => p.id !== postId),
        currentPost: prev.currentPost?.id === postId ? null : prev.currentPost,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Catégories
  const loadCategories = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const categories = await blogService.getCategories();
      setState(prev => ({ ...prev, categories, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const createCategory = useCallback(async (category: Omit<BlogCategory, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newCategory = await blogService.createCategory(category);
      setState(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory],
        loading: false
      }));
      return newCategory;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateCategory = useCallback(async (categoryId: string, category: Partial<BlogCategory>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedCategory = await blogService.updateCategory(categoryId, category);
      setState(prev => ({
        ...prev,
        categories: prev.categories.map(c => (c.id === categoryId ? updatedCategory : c)),
        loading: false
      }));
      return updatedCategory;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const deleteCategory = useCallback(async (categoryId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await blogService.deleteCategory(categoryId);
      setState(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c.id !== categoryId),
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Commentaires
  const loadComments = useCallback(async (postId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const comments = await blogService.getComments(postId);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? { ...prev.currentPost, comments }
          : null,
        loading: false
      }));
      return comments;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createComment = useCallback(async (postId: string, comment: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newComment = await blogService.createComment(postId, comment);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? {
              ...prev.currentPost,
              comments: [...(prev.currentPost.comments || []), newComment]
            }
          : null,
        loading: false
      }));
      return newComment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateComment = useCallback(async (postId: string, commentId: string, comment: Partial<BlogComment>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedComment = await blogService.updateComment(postId, commentId, comment);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? {
              ...prev.currentPost,
              comments: prev.currentPost.comments?.map(c =>
                c.id === commentId ? updatedComment : c
              )
            }
          : null,
        loading: false
      }));
      return updatedComment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateCommentStatus = useCallback(async (postId: string, commentId: string, status: CommentStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedComment = await blogService.updateCommentStatus(postId, commentId, status);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? {
              ...prev.currentPost,
              comments: prev.currentPost.comments?.map(c =>
                c.id === commentId ? updatedComment : c
              )
            }
          : null,
        loading: false
      }));
      return updatedComment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const deleteComment = useCallback(async (postId: string, commentId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await blogService.deleteComment(postId, commentId);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? {
              ...prev.currentPost,
              comments: prev.currentPost.comments?.filter(c => c.id !== commentId)
            }
          : null,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Interactions
  const likePost = useCallback(async (postId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { likes } = await blogService.likePost(postId);
      setState(prev => ({
        ...prev,
        posts: prev.posts.map(p => (p.id === postId ? { ...p, likes } : p)),
        currentPost: prev.currentPost?.id === postId
          ? { ...prev.currentPost, likes }
          : prev.currentPost,
        loading: false
      }));
      return likes;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const likeComment = useCallback(async (postId: string, commentId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const { likes } = await blogService.likeComment(postId, commentId);
      setState(prev => ({
        ...prev,
        currentPost: prev.currentPost
          ? {
              ...prev.currentPost,
              comments: prev.currentPost.comments?.map(c =>
                c.id === commentId ? { ...c, likes } : c
              )
            }
          : null,
        loading: false
      }));
      return likes;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Upload d'images
  const uploadImage = useCallback(async (file: File) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await blogService.uploadImage(file);
      setState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    loadPosts,
    loadPost,
    createPost,
    updatePost,
    updatePostStatus,
    deletePost,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loadComments,
    createComment,
    updateComment,
    updateCommentStatus,
    deleteComment,
    likePost,
    likeComment,
    uploadImage
  };
}; 