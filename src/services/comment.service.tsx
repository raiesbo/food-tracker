import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function commentsService({ commentClient }: typeof prismaClients) {
    return {
        createComment: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string };

            try {
                const rating = await commentClient.getComments({ userId })

                if (rating) return { result: rating }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to find all comments from User with id ${userId}`
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
            const { commentId } = req.query as { commentId: string };

            const newRatings = JSON.parse(req.body);

            try {
                const ratings = await commentClient.updateComment(commentId, newRatings)

                if (ratings) return { result: ratings }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to update comment with ID ${commentId}`
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