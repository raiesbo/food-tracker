import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function reviewsService({ reviewClient }: typeof prismaClients) {
    return {
        getAllReviewsByUserId: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string };

            try {
                const review = await reviewClient.getReviews({ userId: Number(userId) })

                if (review) return {
                    result: review.map(review => ({
                        ...review,
                        createdAt: new Date(review.createdAt).toDateString(),
                        updatedAt: new Date(review.updatedAt).toDateString()
                    }))
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find all reviews from User with id ${userId}`
                    }
                }

            } catch (e) {
                const { message } = e as { message: string };
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
        updateReview: async (req: NextApiRequest) => {
            const { reviewId } = req.query as { reviewId: string };

            try {
                const newProps = JSON.parse(req.body);

                const review = await reviewClient.updateReview(Number(reviewId), newProps);

                if (review) return {
                    result: {
                        ...review,
                        createdAt: new Date(review.createdAt).toDateString(),
                        updatedAt: new Date(review.updatedAt).toDateString()
                    }
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update review with ID ${reviewId}`
                    }
                }

            } catch (e) {
                const { message } = e as { message: string };
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
        deleteReview: async (req: NextApiRequest) => {
            const { reviewId } = req.query as { reviewId: string };

            try {
                const review = await reviewClient.deleteReview(Number(reviewId))

                if (review) return { result: review }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to delete review with ID ${reviewId}`
                    }
                }

            } catch (e) {
                const { message } = e as { message: string };
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
        createReview: async (req: NextApiRequest) => {
            try {
                const newProps = JSON.parse(req.body);

                const review = await reviewClient.createReview(newProps)

                if (review) return {
                    result: {
                        ...review,
                        createdAt: new Date(review.createdAt).toDateString(),
                        updatedAt: new Date(review.updatedAt).toDateString()
                    }
                }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to create a new review`
                    }
                }

            } catch (e) {
                const { message } = e as { message: string };
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