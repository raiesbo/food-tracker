import services from '@/services';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';
import reviewsService from "@/services/reviews.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";

const reviewServiceInstance = reviewsService(PrismaDBClient.instance);

async function handler(req: NextApiRequest, res: NextApiResponse) {

	if (req.method === 'POST') {
		const {
			error
		} = await reviewServiceInstance.likeReview(req);

		if (error) {
			return res.status(error.status).json({ errorMessage: error.message });
		}

		return res.status(204).end();
	}

	res.status(405).end();
}

export default withApiAuthRequired(handler);
