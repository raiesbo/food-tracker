import { vi } from 'vitest';
import { IDBClient } from '../prismaClient';

const prismaClientMock = {
    instance: {
        user: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        },
        restaurant: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        },
        dish: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        },
        review: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        },
        category: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        }
        ,
        location: {
            create: vi.fn(),
            createMany: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
            findMany: vi.fn(),
            update: vi.fn(),
            upsert: vi.fn(),
            delete: vi.fn(),
            deleteMany: vi.fn(),
            count: vi.fn()
        }
    }
} as unknown as IDBClient;

export default prismaClientMock;
