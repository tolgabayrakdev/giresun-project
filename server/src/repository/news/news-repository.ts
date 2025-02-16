import { PrismaClient, News } from '@prisma/client';

export class NewsRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createNews(newsData: Omit<News, 'id' | 'createdAt' | 'updatedAt'>): Promise<News> {
        return this.prisma.news.create({
            data: newsData,
        });
    }

    async getNews(): Promise<News[]> {
        return this.prisma.news.findMany({
            include: { user: true },
        });
    }

    async getNewsById(id: number): Promise<News | null> {
        return this.prisma.news.findUnique({
            where: { id },
            include: { user: true },
        });
    }

    async updateNews(id: number, newsData: Partial<News>): Promise<News> {
        return this.prisma.news.update({
            where: { id },
            data: newsData,
            include: { user: true },
        });
    }

    async deleteNews(id: number): Promise<News> {
        return this.prisma.news.delete({
            where: { id },
        });
    }
}