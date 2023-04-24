import { IDBClient } from '@/repositories/prismaClient';
import { NextApiRequest } from 'next';

export default function ordersService({ order }: IDBClient['instance']) {
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
        updateLocation: async (req: NextApiRequest) => {
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
        }
    };
}
