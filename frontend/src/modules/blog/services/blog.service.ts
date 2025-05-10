import axios from 'axios';
import {
  BlogPost,
  BlogCategory,
  BlogComment,
  BlogPostStatus,
  CommentStatus
} from '../types/blog.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class BlogService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Articles
  async getPosts(params?: {
    status?: BlogPostStatus;
    category?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${API_URL}/blog/posts`, {
      params,
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await axios.get(`${API_URL}/blog/posts/${slug}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const response = await axios.post(`${API_URL}/blog/posts`, post, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updatePost(postId: string, post: Partial<BlogPost>): Promise<BlogPost> {
    const response = await axios.patch(`${API_URL}/blog/posts/${postId}`, post, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updatePostStatus(postId: string, status: BlogPostStatus): Promise<BlogPost> {
    const response = await axios.patch(
      `${API_URL}/blog/posts/${postId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async deletePost(postId: string): Promise<void> {
    await axios.delete(`${API_URL}/blog/posts/${postId}`, {
      headers: this.getAuthHeader()
    });
  }

  // Catégories
  async getCategories(): Promise<BlogCategory[]> {
    const response = await axios.get(`${API_URL}/blog/categories`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory> {
    const response = await axios.get(`${API_URL}/blog/categories/${slug}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createCategory(category: Omit<BlogCategory, 'id'>): Promise<BlogCategory> {
    const response = await axios.post(`${API_URL}/blog/categories`, category, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateCategory(categoryId: string, category: Partial<BlogCategory>): Promise<BlogCategory> {
    const response = await axios.patch(
      `${API_URL}/blog/categories/${categoryId}`,
      category,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await axios.delete(`${API_URL}/blog/categories/${categoryId}`, {
      headers: this.getAuthHeader()
    });
  }

  // Commentaires
  async getComments(postId: string): Promise<BlogComment[]> {
    const response = await axios.get(`${API_URL}/blog/posts/${postId}/comments`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createComment(postId: string, comment: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogComment> {
    const response = await axios.post(
      `${API_URL}/blog/posts/${postId}/comments`,
      comment,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateComment(postId: string, commentId: string, comment: Partial<BlogComment>): Promise<BlogComment> {
    const response = await axios.patch(
      `${API_URL}/blog/posts/${postId}/comments/${commentId}`,
      comment,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateCommentStatus(postId: string, commentId: string, status: CommentStatus): Promise<BlogComment> {
    const response = await axios.patch(
      `${API_URL}/blog/posts/${postId}/comments/${commentId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async deleteComment(postId: string, commentId: string): Promise<void> {
    await axios.delete(
      `${API_URL}/blog/posts/${postId}/comments/${commentId}`,
      {
        headers: this.getAuthHeader()
      }
    );
  }

  // Interactions
  async likePost(postId: string): Promise<{ likes: number }> {
    const response = await axios.post(
      `${API_URL}/blog/posts/${postId}/like`,
      {},
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async likeComment(postId: string, commentId: string): Promise<{ likes: number }> {
    const response = await axios.post(
      `${API_URL}/blog/posts/${postId}/comments/${commentId}/like`,
      {},
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Upload d'images
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${API_URL}/blog/upload`,
      formData,
      {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }
}

export const blogService = new BlogService(); 