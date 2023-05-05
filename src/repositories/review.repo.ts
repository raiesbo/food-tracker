import { Review } from '.prisma/client';
import { IDBClient } from './prismaClient';
import { reviewRelations } from "../types/Review";

export default function prismaReviewClient({ instance }: IDBClient) {
    return {
        createReview: (properties: Review) => {
            return instance.review.create({ data: properties });
        },
        getReview: (id: Review['id']) => {
            return instance.review.findUnique({ where: { id } });
        },
        getReviews: (properties?: Partial<Review>) => {
            return instance.review.findMany({ where: { ...properties }, include: reviewRelations });
        },
        updateReview: (id: Review['id'], properties: Partial<Review>) => {
            return instance.review.update({ where: { id }, data: properties });
        },
        deleteReview: (id: Review['id']) => {
            return instance.review.delete({ where: { id } });
        }
    };
}
