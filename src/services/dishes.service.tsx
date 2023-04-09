import { NextApiRequest } from 'next';
import prismaClients from '../repositories';

export default function categoriesService({ dishClient }: typeof prismaClients) {
    return {
        createNewDish: async (req: NextApiRequest) => {
            const { restaurantId } = req.query as { restaurantId: string };

            try {
                const dish = await dishClient.createDish({
                    name: 'New Dish',
                    restaurantId,
                    price: 0.00,
                    ingredients: {
                        create: [
                            { name: 'First ingredient' }
                        ]
                    }
                });

                if (dish) return { result: dish }

                return {
                    result: {},
                    error: {
                        status: 400,
                        message: `Unable to create a new dish`
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
        deleteDish: async (req: NextApiRequest) => {
            const { dishId } = req.query as { dishId: string };

            try {
                await dishClient.deleteDish(dishId);

                return { result: {} }

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