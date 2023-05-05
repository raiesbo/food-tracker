import { Prisma } from "@prisma/client";

export const reviewRelations = Prisma.validator<Prisma.ReviewInclude>()({
	user: true,
	restaurant: {
		select: {
			name: true
		}
	},
	likes: {
		select: {
			userId: true
		}
	}
});

const ReviewWithRelationships = Prisma.validator<Prisma.ReviewArgs>()({ include: reviewRelations });

type Review = Prisma.ReviewGetPayload<typeof ReviewWithRelationships>

export default Review;
