import { NextApiRequest, NextApiResponse } from "next";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

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

export default withApiAuthRequired(handler);
