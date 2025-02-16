import { PrismaClient, Post } from '@prisma/client';

export class PostRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> {
        return this.prisma.post.create({
            data: postData,
        });
    }

    async getPosts(): Promise<Post[]> {
        return this.prisma.post.findMany({
            include: { user: true, comments: true },
        });
    }

    async getPostById(id: number): Promise<Post | null> {
        return this.prisma.post.findUnique({
            where: { id },
            include: { user: true, comments: true },
        });
    }

    async updatePost(id: number, postData: Partial<Post>): Promise<Post> {
        return this.prisma.post.update({
            where: { id },
            data: postData,
            include: { user: true, comments: true },
        });
    }

    async deletePost(id: number): Promise<Post> {
        return this.prisma.post.delete({
            where: { id },
        });
    }
}