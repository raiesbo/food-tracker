import { Category, Restaurant } from '@/types';
import { Prisma, User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

const validateUpdateBody = (parsedBody: Prisma.RestaurantUncheckedUpdateInput) => {
    const verifiedBody = {} as Prisma.RestaurantUncheckedUpdateInput & { categories: Array<{ id: number }> };

    if (parsedBody?.name) verifiedBody.name = parsedBody.name;
    if (parsedBody?.slogan) verifiedBody.slogan = parsedBody.slogan;
    if (parsedBody?.description) verifiedBody.description = parsedBody.description;
    if (parsedBody?.isCashOnly) verifiedBody.isCashOnly = parsedBody.isCashOnly;
    if (parsedBody?.imageUrl) verifiedBody.imageUrl = parsedBody.imageUrl;
    if (
        parsedBody?.categories
        && Array.isArray(parsedBody.categories)
        && parsedBody.categories.length > 0
    ) verifiedBody.categories = parsedBody.categories.map((category: Category) => ({ id: category.id }));

    return verifiedBody;
};

export default function userService({ restaurantClient }: typeof prismaClients) {
    return {
        getAllRestaurantByFilter: async (req: NextApiRequest) => {
            const query = req.query;
            let filters = {};

            if (!!query?.vegan) {
                filters = {
                    ...filters,
                    menu: {
                        some: {
                            isVegan: true
                        }
                    }
                };
            }

            if (!!query?.creditcard) {
                filters = {
                    ...filters,
                    isCashOnly: false
                };
            }

            if (query?.name) filters = {
                ...filters,
                name: {
                    contains: query.name,
                    mode: 'insensitive'
                }
            };

            if (query?.category) filters = {
                ...filters,
                categories: { some: { name: query.category } }
            };

            if (query?.city) filters = {
                ...filters,
                locations: { some: { city: query.city } }
            };

            try {
                const restaurants = await restaurantClient.getRestaurants(filters);

                if (restaurants) return { result: restaurants };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all restaurants with the following filters ${filters}`
                    }
                };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        },
        getAllRestaurantByUser: async (userId: User['id']) => {
            try {
                const restaurants = await restaurantClient.getRestaurants({ userId });

                if (restaurants) return {
                    result: restaurants.map(restaurant => ({
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        reviews: [
                            ...restaurant.reviews.map(review => ({
                                ...review,
                                createdAt: `${review?.createdAt}`,
                                updatedAt: `${review?.updatedAt}`
                            }))
                        ],
                        menu: [
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`
                            }))
                        ]
                    }))
                };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all restaurants from user with id ${userId}`
                    }
                };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        },
        getRestaurant: async (req: NextApiRequest | { query: { restaurantId: Restaurant['id'] } }) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const restaurant = await restaurantClient.getRestaurant(Number(restaurantId));

                if (restaurant) return {
                    result: {
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        reviews: [
                            ...restaurant.reviews.map(review => ({
                                ...review,
                                createdAt: `${review?.createdAt}`,
                                updatedAt: `${review?.updatedAt}`
                            }))
                        ],
                        menu: [
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`
                            }))
                        ]
                    }
                };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find restaurant with ID ${restaurantId}`
                    }
                };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        },
        updateRestaurant: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const parsedBody = JSON.parse(req.body);

                const vaildatedBody = validateUpdateBody(parsedBody);

                const restaurant = await restaurantClient.updateRestaurant(Number(restaurantId), vaildatedBody);

                return { result: restaurant };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        },
        createNewRestaurant: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string };

            try {
                const restaurant = await restaurantClient.createRestaurant({
                    userId: Number(userId),
                    name: 'New Food Truck',
                    locations: {
                        create: [
                            {
                                isMainLocation: true,
                                country: '',
                                city: '',
                                streetName: '',
                                streetNumber: ''
                            }
                        ]
                    },
                    schedules: {
                        create: [
                            { day: 'MONDAY' },
                            { day: 'TUESDAY' },
                            { day: 'WEDNESDAY' },
                            { day: 'THURSDAY' },
                            { day: 'FRIDAY' },
                            { day: 'SATURDAY' },
                            { day: 'SUNDAY' }
                        ]
                    }
                });

                if (restaurant) return { result: restaurant };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to create a new restaurant`
                    }
                };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        },
        deleteRestaurant: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                await restaurantClient.deleteRestaurant(Number(restaurantId));
                return { result: {} };
            } catch (e) {
                const message = e as { message: string };
                console.error(message);
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                };
            }
        }
    };
}
