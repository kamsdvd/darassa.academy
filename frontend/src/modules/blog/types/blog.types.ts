export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: BlogCategory;
  tags: string[];
  status: BlogPostStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  comments: BlogComment[];
  likes: number;
  views: number;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  posts?: BlogPost[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  status: CommentStatus;
  createdAt: string;
  updatedAt: string;
  replies?: BlogComment[];
  likes: number;
}

export enum BlogPostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
  ARCHIVED = 'ARCHIVED'
}

export enum CommentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SPAM = 'SPAM'
}

export interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  categories: BlogCategory[];
  loading: boolean;
  error: string | null;
} 