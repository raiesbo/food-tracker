import { Comment } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaCommentClient({ instance }: IDBClient) {
    return {
        createComment: (properties: Comment) => {
            return instance.comment.create({ data: properties });
        },
        getComment: (id: Comment['id']) => {
            return instance.comment.findUnique({ where: { id } });
        },
        getComments: (properties?: Partial<Comment>) => {
            return instance.comment.findMany({ where: { ...properties } });
        },
        updateComment: (id: Comment['id'], properties: Partial<Comment>) => {
            return instance.comment.update({ where: { id }, data: properties });
        },
        deleteComment: (id: Comment['id']) => {
            return instance.comment.delete({ where: { id } });
        }
    };
}
