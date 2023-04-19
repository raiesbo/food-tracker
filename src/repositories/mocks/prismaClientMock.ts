import { vi } from 'vitest';
import { IDBClient } from '../prismaClient';

const defaultFunctions = {
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
};

const prismaClientMock = {
    instance: {
        user: defaultFunctions,
        restaurant: defaultFunctions,
        dish: defaultFunctions,
        review: defaultFunctions,
        category: defaultFunctions,
        location: defaultFunctions,
        order: defaultFunctions,
        event: defaultFunctions
    }
} as unknown as IDBClient;

export default prismaClientMock;
