import PrismaDBClient from "@/repositories/prismaClient";
import ordersService from "@/services/orders.service";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const orderServiceInstance = ordersService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const {
            result: orders,
            error
        } = await orderServiceInstance.createOrder(req);

        if (error) {
            return res.status(error.status).json({ message: error.message });
        }

        return res.status(201).json({ orders });
    }

    res.status(405).end();
}

export default withApiAuthRequired(handler);
