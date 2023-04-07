import { Review } from '.prisma/client';
import { Prisma } from "@prisma/client";
import { IDBClient } from './prismaClient';

export const reviewRelations = Prisma.validator<Prisma.ReviewInclude>()({
    user: true
});

export default function prismaReviewClient({ instance }: IDBClient) {
    return {
        createReview: (properties: Review) => {
            return instance.review.create({ data: properties });
        },
        getReview: (id: Review['id']) => {
            return instance.review.findUnique({ where: { id } });
        },
        getReviews: (properties?: Partial<Review>) => {
            return instance.review.findMany({ where: { ...properties } });
        },
        updateReview: (id: Review['id'], properties: Partial<Review>) => {
            return instance.review.update({ where: { id }, data: properties });
        },
        deleteReview: (id: Review['id']) => {
            return instance.review.delete({ where: { id } });
        }
    };
}
