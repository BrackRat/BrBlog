import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma
vi.mock('./index', () => ({
  prisma: {
    article: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    }
  }
}));

import { prisma } from './index';
import { createArticle, getArticle, deleteArticle } from './article';

describe('Article DB Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create an article', async () => {
    const mockArticle = { title: 'Test', content: 'Content' };
    (prisma.article.create as any).mockResolvedValue({ id: 1, ...mockArticle });
    
    const result = await createArticle(mockArticle as any);
    expect(result.id).toBe(1);
    expect(prisma.article.create).toHaveBeenCalledWith({ data: mockArticle });
  });

  it('should get articles with pagination', async () => {
    (prisma.article.findMany as any).mockResolvedValue([{ id: 1, title: 'Test' }]);
    
    const result = await getArticle(1);
    expect(result).toHaveLength(1);
    expect(prisma.article.findMany).toHaveBeenCalled();
  });

  it('should delete an article', async () => {
    (prisma.article.delete as any).mockResolvedValue({ id: 1 });
    
    const result = await deleteArticle(1);
    expect(result.id).toBe(1);
    expect(prisma.article.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
