import { Review } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaClientMock from './mocks/prismaClientMock';
import prismaReviewClient from './review.repo';

const reviewsClient = prismaReviewClient(prismaClientMock);

describe('prisma reviews client', () => {
    it('can create a review', () => {
        const createreviewMock = vi.fn();
        prismaClientMock.instance.review.create = createreviewMock;

        reviewsClient.createReview({ content: 'test_content' } as Review);

        expect(createreviewMock).toHaveBeenCalledWith({ 'data': { 'content': 'test_content' } });
    });

    it('can get a review by id', () => {
        const getRestaurantMock = vi.fn();
        prismaClientMock.instance.review.findUnique = getRestaurantMock;

        reviewsClient.getReview('6' as Review['id']);

        expect(getRestaurantMock).toHaveBeenCalledWith({ 'where': { 'id': '6' } });
    });

    it('can get many reviews by ids', () => {
        const getreviewsMock = vi.fn();
        prismaClientMock.instance.review.findMany = getreviewsMock;

        reviewsClient.getReviews({ content: 'test_content' } as Review);

        expect(getreviewsMock).toHaveBeenCalledWith({ 'where': { 'content': 'test_content' } });
    });

    it('can update a review', () => {
        const updatereviewMock = vi.fn();
        prismaClientMock.instance.review.update = updatereviewMock;

        reviewsClient.updateReview('4' as Review['id'], { content: 'test_content' } as Review);

        expect(updatereviewMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'content': 'test_content' }
        });
    });

    it('can delete a review', () => {
        const deletereviewMock = vi.fn();
        prismaClientMock.instance.review.delete = deletereviewMock;

        reviewsClient.deleteReview('5' as Review['id']);

        expect(deletereviewMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
