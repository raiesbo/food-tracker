import { Restaurant } from '@prisma/client';
import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function userService({ restaurantClient }: typeof prismaClients) {
    return {
        getAllRestaurants: async (req: NextApiRequest) => {
            // const parsedBody = JSON.parse(req.body);

            try {
                const restaurants = await restaurantClient.getRestaurants({} as Restaurant)

                if (restaurants) return { result: restaurants }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: 'Unable to create new user'
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
        getRestaurant: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const restaurant = await restaurantClient.getRestaurant(restaurantId)

                if (restaurant) return { result: restaurant }

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