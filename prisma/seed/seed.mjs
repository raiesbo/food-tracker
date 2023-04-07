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
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Beef burgers like in no other place',
            userId: mainUser.id,
            categoryId: categoryAmerican.id,
            isCashOnly: true,
            menu: {
                create: [
                    {
                        name: 'Cheese Burguer',
                        isGlutenFree: false,
                        isVegan: false,
                        price: 25.30,
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
                        name: 'Vegan Burguer',
                        isGlutenFree: false,
                        isVegan: true,
                        price: 10.50,
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
                        streetName: 'Blücherstraße',
                        streetNumber: '61B'
                    },
                    {
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'Blücherstraße',
                        streetNumber: '61B'
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
            },
            schedules: {
                create: [
                    { day: 'MONDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'TUESDAY', opening_hour: '10:30', closing_hour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'FRIDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SATURDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SUNDAY', opening_hour: '12:30', closing_hour: '01:00' }
                ]
            }
        }
    })

    const restaurantSpanish = await prisma.restaurant.create({
        data: {
            name: 'Paellaland',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'The original Paella Valenciana',
            userId: alice.id,
            categoryId: categorySpanish.id,
            isCashOnly: false,
            menu: {
                create: [
                    {
                        name: 'Paella Valenciana',
                        isGlutenFree: true,
                        isVegan: false,
                        price: 11.30,
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
                        price: 9.99,
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
                        streetName: 'Oranienstraße',
                        streetNumber: '110',
                        zip: '10969'
                    },
                    {
                        isMainLocation: true,
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'Travessera de Gràcia',
                        streetNumber: '289',
                        zip: '08025'
                    }
                ]
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recomended!', rating: 5, userId: bob.id },
                    { comment: 'The food was good, but the service could improve quite a lot.', rating: 5, userId: alice.id },
                    { rating: 2 },
                    { rating: 3 },
                    { comment: 'Good but expensive...', rating: 5 }
                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'TUESDAY', opening_hour: '10:30', closing_hour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'FRIDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SATURDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SUNDAY', opening_hour: '12:30', closing_hour: '01:00' }
                ]
            }
        }
    })


    const restaurantTaps = await prisma.restaurant.create({
        data: {
            name: 'Tapas Bar',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Tapas for every moment',
            userId: bob.id,
            categoryId: categoryAmerican.id,
            isCashOnly: true,
            menu: {
                create: [
                    {
                        name: 'Tortilla patata',
                        isGlutenFree: false,
                        isVegan: false,
                        price: 13.30,
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
                        price: 11.30,
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
                        streetName: 'Wassertorstraße',
                        streetNumber: '19',
                        zip: '10969'
                    },
                    {
                        country: "Spain",
                        city: 'Barcelona',
                        streetName: 'Carrer de Pi i Margall',
                        streetNumber: '19',
                        zip: '08024'
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
            },
            schedules: {
                create: [
                    { day: 'MONDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'TUESDAY', opening_hour: '10:30', closing_hour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'FRIDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SATURDAY', opening_hour: '12:30', closing_hour: '01:00' },
                    { day: 'SUNDAY', opening_hour: '12:30', closing_hour: '01:00' }
                ]
            }
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