import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function reviewsService({ reviewClient }: typeof prismaClients) {
    return {
        getAllReviewsByUserId: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string };

            try {
                const review = await reviewClient.getReviews({ userId })

                if (review) return { result: review }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find all reviews from User with id ${userId}`
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
        updateReview: async (req: NextApiRequest) => {
            const { commentId } = req.query as { commentId: string };

            try {
                const newProps = JSON.parse(req.body);

                const ratings = await reviewClient.updateReview(commentId, newProps)

                if (ratings) return { result: ratings }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update review with ID ${commentId}`
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