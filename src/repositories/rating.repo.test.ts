import { Rating } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaClientMock from './mocks/prismaClientMock';
import prismaRatingClient from './rating.repo';

const ratingsClient = prismaRatingClient(prismaClientMock);

describe('prisma Ratings client', () => {
    it('can create a Rating', () => {
        const createRatingMock = vi.fn();
        prismaClientMock.instance.rating.create = createRatingMock;

        ratingsClient.createRating({ value: 5 } as Rating);

        expect(createRatingMock).toHaveBeenCalledWith({ 'data': { 'value': 5 } });
    });

    it('can get a Rating by id', () => {
        const getRatingMock = vi.fn();
        prismaClientMock.instance.rating.findUnique = getRatingMock;

        ratingsClient.getRating('6' as Rating['id']);

        expect(getRatingMock).toHaveBeenCalledWith({ 'where': { 'id': '6' } });
    });

    it('can get many Ratings by ids', () => {
        const getRatingsMock = vi.fn();
        prismaClientMock.instance.rating.findMany = getRatingsMock;

        ratingsClient.getRatings({ value: 5 } as Rating);

        expect(getRatingsMock).toHaveBeenCalledWith({ 'where': { 'value': 5 } });
    });

    it('can update a Rating', () => {
        const updateRatingMock = vi.fn();
        prismaClientMock.instance.rating.update = updateRatingMock;

        ratingsClient.updateRating('4' as Rating['id'], { value: 5 } as Rating);

        expect(updateRatingMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'value': 5 }
        });
    });

    it('can delete a Rating', () => {
        const deleteRatingMock = vi.fn();
        prismaClientMock.instance.rating.delete = deleteRatingMock;

        ratingsClient.deleteRating('5' as Rating['id']);

        expect(deleteRatingMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
