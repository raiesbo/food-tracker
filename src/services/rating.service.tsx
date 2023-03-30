import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function ratingsService({ ratingClient }: typeof prismaClients) {
    return {
        createRestaurantRating: async (req: NextApiRequest) => {
            const { restaurantId, userId } = req.query as { restaurantId: string, userId: string };

            const rating = JSON.parse(req.body);

            try {
                const ratings = await ratingClient.createRating({ value: rating, restaurantId, userId })

                if (ratings) return { result: ratings }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to create a new ratings`
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
        getRestaurantRatings: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const ratings = await ratingClient.getRatings({ restaurantId })

                if (ratings) return { result: ratings }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to fetch ratings from restaurant with id ${restaurantId}`
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
        getRestaurantRatingsByUser: async (req: NextApiRequest) => {
            const { restaurantId, userId } = req.query as { restaurantId: string, userId: string };

            try {
                const rating = await ratingClient.getRatings({ restaurantId, userId })

                if (rating) return { result: rating }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find rating from Restaurant ${restaurantId} and User ${userId}`
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
        updateRating: async (req: NextApiRequest) => {
            const { ratingId } = req.query as { ratingId: string };

            const newRatings = JSON.parse(req.body);

            try {
                const ratings = await ratingClient.updateRating(ratingId, { value: newRatings })

                if (ratings) return { result: ratings }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update ratings with ID ${ratingId}`
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