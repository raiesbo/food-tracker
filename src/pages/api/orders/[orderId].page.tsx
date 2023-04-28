import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";

const orderServiceInstance = ordersService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'PUT') {
		const {
			result: order,
			error
		} = await orderServiceInstance.updateOrder(req);

		if (error) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(201).json({ order });
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
