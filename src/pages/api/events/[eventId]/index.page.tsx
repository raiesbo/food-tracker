import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import eventsService from "@/services/event.service";
import PrismaDBClient from "@/repositories/prismaClient";

const eventServiceInstance = eventsService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'DELETE') {
		const { error } = await eventServiceInstance.deleteEvent(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(204).end();
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
