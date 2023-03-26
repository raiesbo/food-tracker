import { Comment } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaRestaurantClient from './comment.repo';
import prismaClientMock from './mocks/prismaClientMock';

const commentsClient = prismaRestaurantClient(prismaClientMock);

describe('prisma comments client', () => {
    it('can create a comment', () => {
        const createCommentMock = vi.fn();
        prismaClientMock.instance.comment.create = createCommentMock;

        commentsClient.createComment({ content: 'test_content' } as Comment);

        expect(createCommentMock).toHaveBeenCalledWith({ 'data': { 'content': 'test_content' } });
    });

    it('can get a comment by id', () => {
        const getRestaurantMock = vi.fn();
        prismaClientMock.instance.comment.findUnique = getRestaurantMock;

        commentsClient.getComment('6' as Comment['id']);

        expect(getRestaurantMock).toHaveBeenCalledWith({ 'where': { 'id': '6' } });
    });

    it('can get many comments by ids', () => {
        const getcommentsMock = vi.fn();
        prismaClientMock.instance.comment.findMany = getcommentsMock;

        commentsClient.getComments({ content: 'test_content' } as Comment);

        expect(getcommentsMock).toHaveBeenCalledWith({ 'where': { 'content': 'test_content' } });
    });

    it('can update a comment', () => {
        const updateCommentMock = vi.fn();
        prismaClientMock.instance.comment.update = updateCommentMock;

        commentsClient.updateComment('4' as Comment['id'], { content: 'test_content' } as Comment);

        expect(updateCommentMock).toHaveBeenCalledWith({
            'where': { 'id': '4' },
            'data': { 'content': 'test_content' }
        });
    });

    it('can delete a comment', () => {
        const deleteCommentMock = vi.fn();
        prismaClientMock.instance.comment.delete = deleteCommentMock;

        commentsClient.deleteComment('5' as Comment['id']);

        expect(deleteCommentMock).toHaveBeenCalledWith({ 'where': { 'id': '5' } });
    });
});
