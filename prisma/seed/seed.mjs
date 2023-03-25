import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where: { id: '8GieRd' },
        update: {},
        create: {
            id: '8GieRd',
            email: 'alice@prisma.io',
            name: 'Alice',
            type: 'CLIENT'
        },
    })

    const bob = await prisma.user.upsert({
        where: { id: '8GieRf' },
        update: {},
        create: {
            id: '8GieRf',
            email: 'bob@prisma.io',
            name: 'Bob',
            type: 'SP'
        },
    })

    console.log({ alice, bob })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })