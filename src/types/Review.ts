import { reviewRelations } from "@/repositories/review.repo";
import { Prisma } from "@prisma/client";

const ReviewWithRelationships = Prisma.validator<Prisma.ReviewArgs>()({ include: reviewRelations });

type Review = Prisma.ReviewGetPayload<typeof ReviewWithRelationships>

export default Review;
