import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import eventsService from "@/services/event.service";
import PrismaDBClient from "@/repositories/prismaClient";

const eventsServiceInstance = eventsService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'POST') {
		const {
			result: event,
			error
		} = await eventsServiceInstance.createEvent(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(201).json({ event });
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
