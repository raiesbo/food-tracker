import { NextApiRequest, NextApiResponse } from "next";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'GET') {
		 const {
			 result,
			 error
		 } = await ordersServiceInstance.countOpenOrdersByUser(req);

		 if (error) {
			 return res.status(error.status).json({ message: error.message });
		 }

		return res.status(200).json(result);
	}

	res.status(405).end();
}
