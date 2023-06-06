import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function companiesSeedData() {
    // BURGER RESTAURANT
    await prisma.restaurant.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Main Burger',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Beef burgers like in no other place',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804929,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: 5 },
                    { id: 3 }
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
                    streetNumber: '61B',
                    lat: '52.494750',
                    lon: '13.399350'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931
                    },
                    { rating: 2, userId: 804929 },
                    { rating: 4, userId: 804934 },
                    { comment: 'Good but expensive...', rating: 3, userId: 804933 }
                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'TUESDAY', openingHour: '10:30', closingHour: '12:00' },
                    { day: 'WEDNESDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'THURSDAY', isOpen: false },
                    { day: 'FRIDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SATURDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SUNDAY', openingHour: '12:30', closingHour: '01:00' }
                ]
            }
        }
    });

    // SPANISH RESTAURANT
    await prisma.restaurant.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'Paellaland',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'The original Paella Valenciana',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804931,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: 1 },
                    { id: 3 }
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
                        price: 8.50,
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
                    zip: '08025',
                    lat: '41.4057983',
                    lon: '2.1647421'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 5, userId: 804933 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931
                    },
                    { rating: 2, userId: 804934 },
                    { rating: 3, userId: 804930 },
                    { comment: 'Good but expensive...', rating: 5, userId: 804929 }
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
    await prisma.restaurant.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'Tapas Bar',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            slogan: 'Tapas for every moment',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804930,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [
                    { id: 1 },
                    { id: 2 },
                    { id: 4 }
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
                    streetName: 'Karl-Marx-Allee',
                    streetNumber: '62',
                    zip: '10243',
                    lat: '52.482560',
                    lon: '13.432160'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931
                    },
                    { comment: 'Better go somewhere else', rating: 1, userId: 804933 },
                    { comment: 'Really good, recommended!', rating: 1, userId: 804934 },
                    { comment: 'So so...', rating: 3, userId: 804929 }
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

    // KOREAN
    await prisma.restaurant.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'Maru Restaurant',
            description: 'Small restaurant prepping Korean dishes like hot pot, kimchi & bibimbap, plus homemade rice wine.',
            slogan: 'Tapas for every moment',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804930,
            isCashOnly: false,
            isVisible: true,
            categories: {
                connect: [{ id: 6 }]
            },
            menu: {
                create: [
                    {
                        name: 'SONG-I SALA',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Smoked salmon;Pickled radish'
                    },
                    {
                        name: 'KIMCHI-JEON',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 9.50,
                        ingredients: 'kimchi pancake;Vegetables;Seafood'
                    },
                    {
                        name: 'BUL-GO-GI',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 15.90,
                        ingredients: 'Grilled marinated beef'
                    },
                    {
                        name: 'KIMCHI-JEON',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 9.50,
                        ingredients: 'kimchi pancake;Vegetables;Seafood.'
                    }
                ]
            },
            location: {
                create: {
                    country: "German",
                    city: 'Berlin',
                    streetName: 'Wassertorstraße',
                    streetNumber: '19',
                    zip: '10969',
                    lat: '52.500120',
                    lon: '13.407610'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931
                    },
                    { comment: 'Better go somewhere else', rating: 1, userId: 804933 },
                    { comment: 'Really good, recommended!', rating: 1, userId: 804934 },
                    { comment: 'So so...', rating: 3, userId: 804929 }
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

    // KOREAN 2
    await prisma.restaurant.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            name: 'Crazy Kims',
            description: 'Relaxed, Korean-focused restaurant turning out noodle bowls, dumplings & mains in a colorful space.',
            slogan: 'Pure traditional korean style',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804933,
            isCashOnly: true,
            isVisible: true,
            categories: {
                connect: [{ id: 6 }]
            },
            menu: {
                create: [
                    {
                        name: 'Red rice cakes',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Soy Bean;Chili paste;Cabbage;Fries;Rice;Onion'
                    },
                    {
                        name: 'Fried chicken',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Rice;Soy Bean;Ketchup;Onion;Cabbage;Chili paste'
                    },
                    {
                        name: 'Samgyeopsal',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Cabbage;Bread;Soy Bean;Fries;Lettuce;Onion'
                    },
                    {
                        name: 'Jajangmyeon',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Soy Bean;Chili paste;Rice;Fries;Lettuce;Cabbage'
                    },
                    {
                        name: 'Bulgogi',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Chili paste;Bread;Cabbage;Onion;Soy Bean;Rice'
                    }
                ]
            },
            location: {
                create: {
                    country: "German",
                    city: 'Berlin',
                    streetName: 'Wrangelstraße',
                    streetNumber: '42',
                    zip: '10997',
                    lat: '52.499690',
                    lon: '13.438910'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931
                    },
                    { comment: 'Better go somewhere else', rating: 1, userId: 804933 },
                    { comment: 'Really good, recommended!', rating: 1, userId: 804934 },
                    { comment: 'So so...', rating: 3, userId: 804929 }
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

    // GERMAN
    await prisma.restaurant.upsert({
        where: { id: 6 },
        update: {},
        create: {
            id: 6,
            name: 'Hofbräu Wirtshaus',
            description: 'Bar-restaurant with wooden benches, Bavarian-style food & beer, show band & staff in regional dress.',
            slogan: 'The original experience',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
            userId: 804934,
            isCashOnly: false,
            isVisible: true,
            categories: {
                connect: [{ id: 6 }]
            },
            menu: {
                create: [
                    {
                        name: 'Pretzel',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 2.90,
                        ingredients: 'Pretzel;Butten'
                    },
                    {
                        name: 'Curried sausage',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 11.90,
                        ingredients: 'Sausage;Curry;French fries'
                    }
                ]
            },
            location: {
                create: {
                    country: "German",
                    city: 'Berlin',
                    streetName: 'Wassertorstraße',
                    streetNumber: '19',
                    zip: '10969',
                    lat: '52.500118',
                    lon: '13.407610'
                }
            },
            reviews: {
                create: [
                    { comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930 },
                    { comment: 'So so...', rating: 3, userId: 804929 },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 3,
                        userId: 804931
                    },
                    { comment: 'Better go somewhere else', rating: 2, userId: 804933 },
                    { comment: 'Really good, recommended!', rating: 3, userId: 804934 }

                ]
            },
            schedules: {
                create: [
                    { day: 'MONDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'TUESDAY', openingHour: '10:30', closingHour: '12:00' },
                    { day: 'WEDNESDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'THURSDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'FRIDAY', openingHour: '12:30', closingHour: '01:00' },
                    { day: 'SATURDAY', isOpen: false },
                    { day: 'SUNDAY', openingHour: '12:30', closingHour: '01:00' }
                ]
            }
        }
    });
}
