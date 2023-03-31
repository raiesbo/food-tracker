import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
            email: 'alice@prisma.io',
            firstName: 'Alice',
            lastName: 'Muller',
            role: 'CUSTOMER',
            resturants: {
                create: [
                    { name: 'Alices Burguer', description: 'Best burger in town!' },
                    { name: 'Alices Sushi', description: 'Best Sushi in town!' }
                ]
            }
        },
    })

    const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            firstName: 'Bob',
            lastName: 'Madok',
            role: 'SP'
        },
    })

    const mainUser = await prisma.user.findUnique({ where: { email: 'raiesbo8@gmail.com' } });

    const categorySpanish = await prisma.category.create({ data: { name: 'Spanish', createdById: mainUser.id } });
    const categoryGerman = await prisma.category.create({ data: { name: 'German', createdById: mainUser.id } });

    const restaurantBurger = await prisma.restaurant.create({
        data: {
            name: 'Main Burguer',
            description: 'Top burger in town!',
            userId: mainUser.id,
            categoryId: categorySpanish.id
        }
    })

    const restaurantSushi = await prisma.restaurant.create({
        data: {
            name: 'Second Sushi',
            description: 'Second best Sushi in town!',
            userId: mainUser.id,
            categoryId: categoryGerman.id
        }
    })

    const locationBerlin = await prisma.location.create({
        data: {
            country: "German",
            city: 'Berlin',
            streetName: 'some street',
            restaurantId: restaurantBurger.id
        }
    })

    const locationMunich = await prisma.location.create({
        data: {
            country: "German",
            city: 'Munich',
            streetName: 'some other street',
            restaurantId: restaurantSushi.id
        }
    })
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