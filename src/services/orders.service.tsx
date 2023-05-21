import { IDBClient } from '@/repositories/prismaClient';
import { NextApiRequest } from 'next';
import { User } from "@prisma/client";
import { orderWithItemsInclude } from "@/types/OrderWithItems";

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
		getRestaurantsWithOrders: async (userId: User['id']) => {

			try {
				const restaurants = await restaurant.findMany({
					where: { userId: Number(userId) },
					select: {
						id: true,
						name: true,
						orders: {
							select: {
								id: true,
								isAccepted: true,
								createdAt: true,
								deliveryAt: true,
								items: {
									select: {
										id: true,
										dish: { select: { id: true, name: true, price: true } },
										units: true
									}
								}
							}
						}
					}
				});
				return {
					result: restaurants?.map(restaurant => ({
						...restaurant,
						orders: [
							...restaurant?.orders?.map(order => ({
								...order,
								createdAt: order.createdAt.toISOString(),
								deliveryAt: order.deliveryAt?.toISOString()
							}))
						]
					}))
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
		getOrdersByUser: async (userId: User['id']) => {
			try {
				const orders = await order.findMany({
					where: { userId },
					include: orderWithItemsInclude
				});
				return {
					result: orders.map(order => ({
						...order,
						createdAt: order.createdAt.toISOString(),
						updatedAt: order.updatedAt.toISOString(),
						deliveryAt: order.deliveryAt?.toISOString()
					}))
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
		countOpenOrdersByUser: async (req: NextApiRequest) => {
			const { userId } = req.query as { userId: string };

			if (!userId || userId === 'undefined') return { result: 0 };

			try {
				const count = await order.count({
					where: {
						isAccepted: false,
						isCancelled: false,
						restaurant: {
							userId: Number(userId)
						}
					}
				});
				return { result: count };
			} catch (e) {
				console.error(e);
				const { message } = e as { message: string };
				return {
					result: 0,
					error: { status: 400, message }
				};
			}
		}
	};
}
