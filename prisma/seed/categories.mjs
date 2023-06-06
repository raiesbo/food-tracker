import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function categoriesSeedData() {
    await prisma.category.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Spanish',
            userId: 804930
        }
    });

    await prisma.category.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'Thai',
            userId: 804931
        }
    });

    await prisma.category.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'Japanese',
            userId: 804929
        }
    });

    await prisma.category.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'Mexican',
            userId: 804930
        }
    });

    await prisma.category.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            name: 'American',
            userId: 804929
        }
    });

    await prisma.category.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            name: 'Korean',
            userId: 804929
        }
    });
}
