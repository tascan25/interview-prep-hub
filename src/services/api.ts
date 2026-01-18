import { blogs, companies, topics, Blog, Company, Topic } from '@/data/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogFilters {
  search?: string;
  tags?: string[];
  difficulty?: string;
  company?: string;
  category?: string;
}

// Blog API
export const blogApi = {
  async getAll(
    page: number = 1,
    pageSize: number = 10,
    filters: BlogFilters = {}
  ): Promise<PaginatedResponse<Blog>> {
    await delay(300);
    
    let filtered = [...blogs];
    
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        blog =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(blog =>
        filters.tags!.some(tag => blog.tags.includes(tag))
      );
    }
    
    if (filters.difficulty) {
      filtered = filtered.filter(blog => blog.difficulty === filters.difficulty);
    }
    
    if (filters.company) {
      filtered = filtered.filter(blog => blog.company === filters.company);
    }
    
    if (filters.category) {
      filtered = filtered.filter(blog => blog.category === filters.category);
    }
    
    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);
    
    return { data, total, page, pageSize, totalPages };
  },
  
  async getBySlug(slug: string): Promise<Blog | null> {
    await delay(200);
    return blogs.find(blog => blog.slug === slug) || null;
  },
  
  async getById(id: string): Promise<Blog | null> {
    await delay(200);
    return blogs.find(blog => blog.id === id) || null;
  },
  
  async getFeatured(): Promise<Blog[]> {
    await delay(200);
    return blogs.slice(0, 3);
  },
  
  async getRelated(blogId: string): Promise<Blog[]> {
    await delay(200);
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return [];
    
    return blogs
      .filter(b => b.id !== blogId && b.tags.some(tag => blog.tags.includes(tag)))
      .slice(0, 3);
  },
  
  async getByCompany(company: string): Promise<Blog[]> {
    await delay(200);
    return blogs.filter(blog => blog.company === company);
  },
  
  async getByCategory(category: string): Promise<Blog[]> {
    await delay(200);
    return blogs.filter(blog => blog.category === category);
  }
};

// Company API
export const companyApi = {
  async getAll(): Promise<Company[]> {
    await delay(200);
    return companies;
  },
  
  async getById(id: string): Promise<Company | null> {
    await delay(200);
    return companies.find(company => company.id === id) || null;
  },
  
  async getByName(name: string): Promise<Company | null> {
    await delay(200);
    return companies.find(company => company.name.toLowerCase() === name.toLowerCase()) || null;
  }
};

// Topic API
export const topicApi = {
  async getAll(): Promise<Topic[]> {
    await delay(200);
    return topics;
  },
  
  async getBySlug(slug: string): Promise<Topic | null> {
    await delay(200);
    return topics.find(topic => topic.slug === slug) || null;
  }
};
