import PrismaDBClient from "@/repositories/prismaClient";
import ordersService from "@/services/orders.service";
import { NextApiRequest, NextApiResponse } from "next";

const orderServiceInstance = ordersService(PrismaDBClient.instance);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { result, error } = await orderServiceInstance.createOrder(req);

        if (error) {
            return res.status(error.status).json({ message: error.message });
        }

        return res.status(201).json({ result });
    }

    res.status(405).end();
}
