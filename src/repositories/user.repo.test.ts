import { User } from '@prisma/client';
import { describe, expect, it, vi } from 'vitest';
import prismaClientMock from './mocks/prismaClientMock';
import prismaUserClient from './user.repo';

const usersClient = prismaUserClient(prismaClientMock);

describe('prisma users client', () => {
    it('can create a user', () => {
        const createUserMock = vi.fn();
        prismaClientMock.instance.user.create = createUserMock;

        usersClient.createUser({ email: 'test_email' } as User);

        expect(createUserMock).toHaveBeenCalledWith({ 'data': { 'email': 'test_email' } });
    });

    it('can get a user by id', () => {
        const getUserMock = vi.fn();
        prismaClientMock.instance.user.findUnique = getUserMock;

        usersClient.getUser(6 as User['id']);

        expect(getUserMock).toHaveBeenCalledWith({ 'where': { 'id': 6 } });
    });

    it('can get many users by ids', () => {
        const getUsersMock = vi.fn();
        prismaClientMock.instance.user.findMany = getUsersMock;

        usersClient.getUsers({ email: 'test_email' } as User);

        expect(getUsersMock).toHaveBeenCalledWith({ 'where': { 'email': 'test_email' } });
    });

    it('can update a user', () => {
        const updateUserMock = vi.fn();
        prismaClientMock.instance.user.update = updateUserMock;

        usersClient.updateUser(4 as User['id'], { email: 'test_email' } as User);

        expect(updateUserMock).toHaveBeenCalledWith({
            'where': { 'id': 4 },
            'data': { 'email': 'test_email' }
        });
    });

    it('can delete a user', () => {
        const deleteUserMock = vi.fn();
        prismaClientMock.instance.user.delete = deleteUserMock;

        usersClient.deleteUser(5 as User['id']);

        expect(deleteUserMock).toHaveBeenCalledWith({ 'where': { 'id': 5 } });
    });
});
