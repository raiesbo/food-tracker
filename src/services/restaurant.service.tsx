import { Restaurant } from '@/types';
import { Prisma, User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function userService({ restaurantClient }: typeof prismaClients) {
    return {
        getAllRestaurantByFilter: async (filters: Prisma.RestaurantWhereInput) => {
            try {
                const restaurants = await restaurantClient.getRestaurants(filters) as Array<Restaurant>;

                if (restaurants) return {
                    result: restaurants.map(restaurant => ({
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        reviews: [
                            ...restaurant.reviews?.map(review => ({
                                ...review,
                                createdAt: `${review?.createdAt}`,
                                updatedAt: `${review?.updatedAt}`,
                            }))
                        ],
                        menu: [
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
                            }))
                        ]
                    }))
                };

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
                                updatedAt: `${review?.updatedAt}`,
                            }))
                        ],
                        menu: [
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
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
                                updatedAt: `${review?.updatedAt}`,
                            }))
                        ],
                        menu: [
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
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

            const restaurantProps = JSON.parse(req.body);

            try {
                const restaurant = await restaurantClient.updateRestaurant(Number(restaurantId), restaurantProps);

                if (restaurant) return { result: restaurant };

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update restaurant with ID ${restaurantId}`
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