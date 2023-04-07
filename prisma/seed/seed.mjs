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
            role: 'CUSTOMER'
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

    const mainUser = await prisma.user.upsert({
        where: { email: 'raiesbo@uoc.edu' },
        update: {},
        create: {
            id: '64255dfceba0b40cc84c7e9e',
            email: 'raiesbo@uoc.edu',
            firstName: 'Raimon',
            lastName: 'Espasa',
            role: 'SP'
        },
    })

    const categorySpanish = await prisma.category.upsert({
        where: { name: 'Spanish' },
        update: {},
        create: {
            name: 'Spanish',
            createdById: mainUser.id
        },
    })

    const categoryGerman = await prisma.category.upsert({
        where: { name: 'German' },
        update: {},
        create: {
            name: 'German',
            createdById: mainUser.id
        },
    })

    const categoryFrench = await prisma.category.upsert({
        where: { name: 'French' },
        update: {},
        create: {
            name: 'French',
            createdById: mainUser.id
        },
    })

    const categoryThai = await prisma.category.upsert({
        where: { name: 'Thai' },
        update: {},
        create: {
            name: 'Thai',
            createdById: mainUser.id
        },
    })

    const categoryJapanese = await prisma.category.upsert({
        where: { name: 'Japanese' },
        update: {},
        create: {
            name: 'Japanese',
            createdById: mainUser.id
        },
    })

    const categoryMexican = await prisma.category.upsert({
        where: { name: 'Mexican' },
        update: {},
        create: {
            name: 'Mexican',
            createdById: mainUser.id
        },
    })

    const categoryAmerican = await prisma.category.upsert({
        where: { name: 'American' },
        update: {},
        create: {
            name: 'American',
            createdById: mainUser.id
        },
    })


    const restaurantBurger = await prisma.restaurant.create({
        data: {
            name: 'Main Burguer',
            description: 'Top burger in town!',
            userId: mainUser.id,
            categoryId: categoryAmerican.id,
            isCashOnly: true,
            menu: {
                create: [
                    {
                        name: 'Cheese burguer',
                        isGlutenFree: false,
                        isVegan: false,
                        ingredients: {
                            create: [
                                { name: 'Meet' },
                                { name: 'Bread' },
                                { name: 'Ketchup' },
                                { name: 'Fries' },
                                { name: 'Letuce' },
                                { name: 'Tomato' }
                            ]
                        }
                    },
                    {
                        name: 'Cheese burguer',
                        isGlutenFree: false,
                        isVegan: true,
                        ingredients: {
                            create: [
                                { name: 'Vegan Meet' },
                                { name: 'Bread' },
                                { name: 'Ketchup' },
                                { name: 'Fries' },
                                { name: 'Letuce' },
                                { name: 'Tomato' }
                            ]
                        }
                    }
                ]
            },
            locations: {
                create: [
                    {
                        isMainLocation: true,
                        country: "German",
                        city: 'Berlin',
                        streetName: 'some street'
                    },
                    {
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'some other street'
                    }
                ]
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recomended!', rating: 1, userId: bob.id },
                    { comment: 'The food was good, but the service could improve quite a lot.', rating: 5, userId: alice.id },
                    { rating: 2 },
                    { rating: 4 },
                    { comment: 'Good but expensive...', rating: 3 }
                ]
            }
        }
    })

    const restaurantSpanish = await prisma.restaurant.create({
        data: {
            name: 'Paellaland',
            description: 'The best spanish food to be found in the German capital!',
            userId: mainUser.id,
            categoryId: categorySpanish.id,
            isCashOnly: false,
            menu: {
                create: [
                    {
                        name: 'Paella Valenciana',
                        isGlutenFree: true,
                        isVegan: false,
                        ingredients: {
                            create: [
                                { name: 'Rise' },
                                { name: 'Meet' },
                                { name: 'Onion' },
                                { name: 'Bell pepper' },
                                { name: 'Garlic' },
                                { name: 'Peas' }
                            ]
                        }
                    },
                    {
                        name: 'Paella de verduras',
                        isGlutenFree: false,
                        isVegan: true,
                        ingredients: {
                            create: [
                                { name: 'Rise' },
                                { name: 'Onion' },
                                { name: 'Bell pepper' },
                                { name: 'Garlic' },
                                { name: 'Peas' }
                            ]
                        }
                    },
                    {
                        name: 'Arroz al horno',
                        isGlutenFree: true,
                        isVegan: false,
                        ingredients: {
                            create: [
                                { name: 'Rise' },
                                { name: 'Meet' },
                                { name: 'Bell pepper' },
                                { name: 'Garlic' }
                            ]
                        }
                    }
                ]
            },
            locations: {
                create: [
                    {
                        country: "German",
                        city: 'Berlin',
                        streetName: 'some street'
                    },
                    {
                        isMainLocation: true,
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'some other street'
                    }
                ]
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recomended!', rating: 1, userId: bob.id },
                    { comment: 'The food was good, but the service could improve quite a lot.', rating: 5, userId: alice.id },
                    { rating: 2 },
                    { rating: 4 },
                    { comment: 'Good but expensive...', rating: 3 }
                ]
            }
        }
    })


    const restaurantTaps = await prisma.restaurant.create({
        data: {
            name: 'Tapas Bar',
            description: 'The classic tapas as never experienced before!',
            userId: mainUser.id,
            categoryId: categoryAmerican.id,
            isCashOnly: true,
            menu: {
                create: [
                    {
                        name: 'Tortilla patata',
                        isGlutenFree: false,
                        isVegan: false,
                        ingredients: {
                            create: [
                                { name: 'Meet' },
                                { name: 'Bread' },
                                { name: 'Ketchup' },
                                { name: 'Fries' },
                                { name: 'Letuce' },
                                { name: 'Tomato' }
                            ]
                        }
                    },
                    {
                        name: 'Pimientos del padrón',
                        isGlutenFree: false,
                        isVegan: true,
                        ingredients: {
                            create: [
                                { name: 'Vegan Meet' },
                                { name: 'Bread' },
                                { name: 'Ketchup' },
                                { name: 'Fries' },
                                { name: 'Letuce' },
                                { name: 'Tomato' }
                            ]
                        }
                    }
                ]
            },
            locations: {
                create: [
                    {
                        isMainLocation: true,
                        country: "German",
                        city: 'Berlin',
                        streetName: 'some street'
                    },
                    {
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'some other street'
                    }
                ]
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recomended!', rating: 1, userId: bob.id },
                    { comment: 'The food was good, but the service could improve quite a lot.', rating: 5, userId: alice.id },
                    { rating: 1, userId: alice.id },
                    { rating: 1, userId: alice.id },
                    { comment: 'So so...', rating: 3 }
                ]
            }
        }
    })


    const restaurantBurger4 = await prisma.restaurant.create({
        data: {
            name: 'Main Burguer',
            description: 'Top burger in town!',
            userId: mainUser.id,
            categoryId: categorySpanish.id
        }
    })

    const restaurantBurger5 = await prisma.restaurant.create({
        data: {
            name: 'Second Sushi',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            userId: mainUser.id,
            categoryId: categoryGerman.id
        }
    })

    const restaurantBurger6 = await prisma.restaurant.create({
        data: {
            name: 'Main Burguer',
            description: 'Top burger in town!',
            userId: mainUser.id,
            categoryId: categorySpanish.id
        }
    })

    const restaurantBurger7 = await prisma.restaurant.create({
        data: {
            name: 'Main Burguer',
            description: 'Top burger in town!',
            userId: mainUser.id,
            categoryId: categorySpanish.id
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
            restaurantId: restaurantBurger5.id
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