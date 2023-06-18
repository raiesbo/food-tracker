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
            description: 'Savor the ultimate blend of flavor and quality with our mouthwatering gourmet burgers, crafted with love to satisfy your taste buds and create an unforgettable dining experience.',
            slogan: 'Beef burgers like in no other place',
            imageUrl: 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                    {
                        comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804930 }
                            ]
                        }
                    },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804931 }, { userId: 804930 }
                            ]
                        }
                    },
                    { rating: 2, userId: 804929 },
                    {
                        rating: 4, userId: 804934,
                        likes: {
                            create: [
                                { userId: 804931 }, { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Good but expensive...', rating: 3, userId: 804933,
                        likes: {
                            create: [
                                { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    }
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
            description: 'Embark on a culinary journey to Spain with our authentic flavors, where traditional recipes and warm hospitality come together to transport you to the vibrant streets of España.',
            slogan: 'The original Paella Valenciana',
            imageUrl: 'https://images.unsplash.com/photo-1563861019306-9cccb83bdf0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1623961990059-28356e226a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 11.30,
                        ingredients: 'Rise;MeetOnion;Bell pepper;Garlic;Peas'
                    },
                    {
                        name: 'Paella de verduras',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1512058466835-da4d54fb0ee8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 8.50,
                        ingredients: 'Rise;Onion;Bell pepper;Garlic;Peas'
                    },
                    {
                        name: 'Arroz al horno',
                        isGlutenFree: true,
                        imageUrl: 'https://images.unsplash.com/photo-1540100716001-4b432820e37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                    {
                        comment: 'Really delicious, 100% recommended!', rating: 5, userId: 804933,
                        likes: {
                            create: [
                                { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931,
                        likes: {
                            create: [
                                { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    { rating: 2, userId: 804934 },
                    { rating: 3, userId: 804930 },
                    {
                        comment: 'Good but expensive...', rating: 5, userId: 804929,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    }
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
            description: 'Indulge in the art of Spanish small plates, where every bite tells a flavorful story, accompanied by a lively ambiance that celebrates the spirit of sharing and savoring the best of tapas culture.',
            slogan: 'Tapas for every moment',
            imageUrl: 'https://images.unsplash.com/photo-1620589125156-fd5028c5e05b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1639669794539-952631b44515?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Meet;Bread;Ketchup;Fries;Lettuce;Tomato'
                    },
                    {
                        name: 'Pimientos del padrón',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1611575334308-0e03cf925ee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                    {
                        comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804931 }, { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931,
                        likes: {
                            create: [
                                { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Better go somewhere else', rating: 1, userId: 804933,
                        likes: {
                            create: [
                                { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Really good, recommended!', rating: 1, userId: 804934,
                        likes: {
                            create: [
                                { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
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
            imageUrl: 'https://plus.unsplash.com/premium_photo-1664301415131-cf3de36c1e83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1504670555658-db8fb2e908ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Smoked salmon;Pickled radish'
                    },
                    {
                        name: 'KIMCHI-JEON',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1548592806-482f9b023d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 9.50,
                        ingredients: 'kimchi pancake;Vegetables;Seafood'
                    },
                    {
                        name: 'BUL-GO-GI',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1671522635775-020f43518663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 15.90,
                        ingredients: 'Grilled marinated beef'
                    },
                    {
                        name: 'KIMCHI-JEON',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                    {
                        comment: 'Better go somewhere else', rating: 1, userId: 804933,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804931 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Really good, recommended!', rating: 1, userId: 804934,
                        likes: {
                            create: [
                                { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
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
            imageUrl: 'https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1671522635775-020f43518663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: false,
                        price: 13.30,
                        ingredients: 'Soy Bean;Chili paste;Cabbage;Fries;Rice;Onion'
                    },
                    {
                        name: 'Fried chicken',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Rice;Soy Bean;Ketchup;Onion;Cabbage;Chili paste'
                    },
                    {
                        name: 'Samgyeopsal',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1645530654351-d14ae8ac75fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Cabbage;Bread;Soy Bean;Fries;Lettuce;Onion'
                    },
                    {
                        name: 'Jajangmyeon',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 11.30,
                        ingredients: 'Soy Bean;Chili paste;Rice;Fries;Lettuce;Cabbage'
                    },
                    {
                        name: 'Bulgogi',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1558920558-fb0345e52561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                    {
                        comment: 'Really delicious, 100% recommended!', rating: 1, userId: 804930,
                        likes: {
                            create: [
                                { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'The food was good, but the service could improve quite a lot.',
                        rating: 5,
                        userId: 804931,
                        likes: {
                            create: [
                                { userId: 804929 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
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
            description: 'Experience the true essence of German cuisine at our restaurant, where time-honored recipes, brimming with flavors and served with genuine warmth, invite you to indulge in savory delights and raise a glass to the joyous spirit of Gemütlichkeit.',
            slogan: 'The original experience',
            imageUrl: 'https://images.unsplash.com/photo-1612208176815-e132bcf971b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
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
                        imageUrl: 'https://images.unsplash.com/photo-1575996533050-d9eb7e1e7c0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
                        isVegan: true,
                        price: 2.90,
                        ingredients: 'Pretzel;Butten'
                    },
                    {
                        name: 'Curried sausage',
                        isGlutenFree: false,
                        imageUrl: 'https://images.unsplash.com/photo-1561701034-24ceb3e34433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
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
                        userId: 804931,
                        likes: {
                            create: [
                                { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Better go somewhere else', rating: 2, userId: 804933,
                        likes: {
                            create: [
                                { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    },
                    {
                        comment: 'Really good, recommended!', rating: 3, userId: 804934,
                        likes: {
                            create: [
                                { userId: 804930 }, { userId: 804932 }, { userId: 804933 }, { userId: 804934 }
                            ]
                        }
                    }

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
