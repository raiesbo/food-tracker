import { IDBClient } from '@/repositories/prismaClient';
import { NextApiRequest } from 'next';

export default function ordersService({ order, restaurant }: IDBClient['instance']) {
    return {
        createOrder: async (req: NextApiRequest) => {
            try {
                const parsedBody = JSON.parse(req.body);

                const newOrder = await order.create({
                    data: {
                        ...parsedBody,
                        items: {
                            create: parsedBody.items.map(({ id, units }: { id: number, units: number }) => (
                                { dishId: id, units }
                            ))
                        }
                    }
                });

                return { result: newOrder };
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
        updateOrder: async (req: NextApiRequest) => {
            const { orderId } = req.query as { orderId: string };

            try {
                const parsedBody = JSON.parse(req.body);
                const updatedOrder = await order.update({ where: { id: Number(orderId) }, data: parsedBody });
                return { result: updatedOrder };
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
        getRestaurantsWithOrders: async (req: NextApiRequest) => {
            const { userId } = req.query as { userId: string };

            try {
                const restaurants = await restaurant.findMany({
                    where: { userId: Number(userId) },
                    select: {
                        id: true, name: true, orders: {
                            select: {
                                id: true,
                                isAccepted: true,
                                createdAt: true,
                                deliveryAt: true,
                                items: {
                                    select: {
                                        dish: { select: { id: true, name: true, price: true } },
                                        units: true
                                    }
                                }
                            }
                        }
                    }
                });
                return { result: restaurants };
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
