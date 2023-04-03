import { Restaurant, User } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function userService({ restaurantClient }: typeof prismaClients) {
    return {
        getAllRestaurantByFilter: async (filters: unknown) => {
            try {
                const restaurants = await restaurantClient.getRestaurants(filters as Restaurant);

                if (restaurants) return {
                    result: restaurants.map(restaurant => ({
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        comments: {
                            ...restaurant.comments.map(comment => ({
                                ...comment,
                                createdAt: `${comment?.createdAt}`,
                                updatedAt: `${comment?.updatedAt}`,
                            }))
                        },
                        menu: {
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
                            }))
                        }
                    }))
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all restaurants with the following filters ${filters}`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        },
        getAllRestaurantByUser: async (userId: User['id']) => {
            try {
                const restaurants = await restaurantClient.getRestaurants({ userId } as Restaurant)

                if (restaurants) return {
                    result: restaurants.map(restaurant => ({
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        comments: {
                            ...restaurant.comments.map(comment => ({
                                ...comment,
                                createdAt: `${comment?.createdAt}`,
                                updatedAt: `${comment?.updatedAt}`,
                            }))
                        },
                        menu: {
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
                            }))
                        }
                    }))
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to get all restaurants from user with id ${userId}`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }
        },
        getRestaurant: async (req: NextApiRequest | { query: { restaurantId: string } }) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const restaurant = await restaurantClient.getRestaurant(restaurantId)

                if (restaurant) return {
                    result: {
                        ...restaurant,
                        createdAt: `${restaurant.createdAt}`,
                        updatedAt: `${restaurant.updatedAt}`,
                        comments: {
                            ...restaurant.comments.map(comment => ({
                                ...comment,
                                createdAt: `${comment?.createdAt}`,
                                updatedAt: `${comment?.updatedAt}`,
                            }))
                        },
                        menu: {
                            ...restaurant.menu.map(dish => ({
                                ...dish,
                                createdAt: `${dish?.createdAt}`,
                                updatedAt: `${dish?.updatedAt}`,
                            }))
                        }
                    }
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find restaurant with ID ${restaurantId}`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }

        },
        updateRestaurant: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            const restaurantProps = JSON.parse(req.body);

            try {
                const restaurant = await restaurantClient.updateRestaurant(restaurantId, restaurantProps)

                if (restaurant) return { result: restaurant }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update restaurant with ID ${restaurantId}`
                    }
                }
            } catch (e) {
                const message = e as { message: string };
                console.error(message)
                return {
                    result: {},
                    error: {
                        status: 400,
                        message: message
                    }
                }
            }

        }
    }
}