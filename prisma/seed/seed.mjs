import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@uoc.edu' },
        update: {},
        create: {
            email: 'alice@uoc.edu',
            phone: '0179408329048',
            firstName: 'Alice',
            lastName: 'Muller',
            role: 'CUSTOMER',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    const bob = await prisma.user.upsert({
        where: { email: 'bob@uoc.edu' },
        update: {},
        create: {
            email: 'bob@uoc.edu',
            phone: '0179408329048',
            firstName: 'Bob',
            lastName: 'Madok',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    const mainUser = await prisma.user.upsert({
        where: { email: 'raiesbo@uoc.edu' },
        update: {},
        create: {
            id: 804929,
            email: 'raiesbo@uoc.edu',
            phone: '0179408329048',
            firstName: 'Raimon',
            lastName: 'Espasa',
            role: 'SP',
            location: {
                create: {
                    country: '',
                    city: '',
                    zip: '',
                    streetName: '',
                    streetNumber: ''
                }
            }
        }
    });

    const categorySpanish = await prisma.category.upsert({
        where: { name: 'Spanish' },
        update: {},
        create: {
            name: 'Spanish',
            userId: bob.id
        }
    });

    const categoryThai = await prisma.category.upsert({
        where: { name: 'Thai' },
        update: {},
        create: {
            name: 'Thai',
            userId: alice.id
        }
    });

    const categoryJapanese = await prisma.category.upsert({
        where: { name: 'Japanese' },
        update: {},
        create: {
            name: 'Japanese',
            userId: mainUser.id
        }
    });

    const categoryMexican = await prisma.category.upsert({
        where: { name: 'Mexican' },
        update: {},
        create: {
            name: 'Mexican',
            userId: bob.id
        }
    });

    const categoryAmerican = await prisma.category.upsert({
        where: { name: 'American' },
        update: {},
        create: {
            name: 'American',
            userId: mainUser.id
        }
    });

    // BURGER RESTAURANT
    await prisma.restaurant.create({
        data: {
            name: 'Main Burger',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Beef burgers like in no other place',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: mainUser.id,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: categoryAmerican.id },
                    { id: categoryJapanese.id }
                ]
            },
            menu: {
                create: [
                    {
                        name: 'Cheese Burger',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 25.30,
                        ingredients: 'Meet;Bread;Ketchup;Fries;Letuce;Tomato'
                    },
                    {
                        name: 'Vegan Burger',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 10.50,
                        ingredients: 'Vegan Meet;Bread;Ketchup;Fries;Letuce;Tomato'
                    }
                ]
            },
            location: {
                create: {
                    country: "German",
                    city: 'Berlin',
                    streetName: 'Blücherstraße',
                    streetNumber: '61B'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: bob.id },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: alice.id
                    },
                    { rating: 2, userId: mainUser.id },
                    { rating: 4, userId: bob.id },
                    { comment: 'Good but expensive...', rating: 3, userId: alice.id }
                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'TUESDAY', openingHour: '10:30', closingHour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'FRIDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SATURDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SUNDAY', openingHour: '12:30', closingHour: '01:00' }
                ]
            }
        }
    });

    // SPANISH RESTAURANT
    await prisma.restaurant.create({
        data: {
            name: 'Paellaland',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'The original Paella Valenciana',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: alice.id,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: categorySpanish.id },
                    { id: categoryJapanese.id }
                ]
            },
            menu: {
                create: [
                    {
                        name: 'Paella Valenciana',
                        isGlutenFree: true,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 11.30,
                        ingredients: 'Rise;MeetOnion;Bell pepper;Garlic;Peas'
                    },
                    {
                        name: 'Paella de verduras',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        ingredients: 'Rise;Onion;Bell pepper;Garlic;Peas'
                    },
                    {
                        name: 'Arroz al horno',
                        isGlutenFree: true,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 9.99,
                        ingredients: 'Rise;Meet;Bell pepper;Garlic'
                    }
                ]
            },
            location: {
                create: {
                    country: "Spain",
                    city: 'Barcelona',
                    streetName: 'Travessera de Gràcia',
                    streetNumber: '289',
                    zip: '08025'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 5, userId: bob.id },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: alice.id
                    },
                    { rating: 2, userId: mainUser.id },
                    { rating: 3, userId: bob.id },
                    { comment: 'Good but expensive...', rating: 5, userId: mainUser.id }
                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'TUESDAY', openingHour: '10:30', closingHour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'FRIDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SATURDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SUNDAY', openingHour: '12:30', closingHour: '01:00' }
                ]
            }
        }
    });

    // TAPAS RESTAURANT
    await prisma.restaurant.create({
        data: {
            name: 'Tapas Bar',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Tapas for every moment',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: bob.id,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: categoryThai.id },
                    { id: categoryMexican.id }
                ]
            },
            menu: {
                create: [
                    {
                        name: 'Tortilla de patata',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Meet;Bread;Ketchup;Fries;Lettuce;Tomato'
                    },
                    {
                        name: 'Pimientos del padrón',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Vegan Meet;Bread;Ketchup;Fries;Lettuce;Tomato'
                    }
                ]
            },
            location: {
                create: {
                    country: "German",
                    city: 'Berlin',
                    streetName: 'Wassertorstraße',
                    streetNumber: '19',
                    zip: '10969'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: bob.id },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: alice.id
                    },
                    { comment: 'Better go somewhere else', rating: 1, userId: alice.id },
                    { comment: 'Really good, recommended!', rating: 1, userId: alice.id },
                    { comment: 'So so...', rating: 3, userId: mainUser.id }
                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'TUESDAY', openingHour: '10:30', closingHour: '12:00' },
                    { day: 'WEDNESDAY', isOpen: false },
                    { day: 'THURSDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'FRIDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SATURDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SUNDAY', openingHour: '12:30', closingHour: '01:00' }
                ]
            }
        }
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
