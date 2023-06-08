import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import PrismaDBClient from "@/repositories/prismaClient";
import scheduleService from "@/services/schedule.service";

const scheduleServiceInstance = scheduleService(PrismaDBClient);
async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'PUT') {
		const {
			result: user,
			error
		} = await scheduleServiceInstance.updateManySchedules(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(201).json({ user });
	}

	return res.status(405).end();
}

export default withApiAuthRequired(handler);
