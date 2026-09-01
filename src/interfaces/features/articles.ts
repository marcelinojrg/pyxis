export interface ArticleCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  articleCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string | null;
  content: string;
  cover: string | null;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string | null;
  articleCategories: ArticleCategory[];
}

export interface ArticleResponse {
  success: boolean;
  data?: Article;
  message?: string;
  error?: string;
}

export interface ArticlePaginationResponse {
  success: boolean;
  data: Article[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
  error?: string;
}

export interface ArticleCategoryResponse {
  success: boolean;
  data?: ArticleCategory;
  message?: string;
  error?: string;
}

export interface ArticleCategoryListResponse {
  success: boolean;
  data: ArticleCategory[];
  error?: string;
}
