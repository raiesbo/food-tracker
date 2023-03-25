import { User } from '.prisma/client';
import { IDBClient } from './prismaClient';

export default function prismaUserClient({ instance }: IDBClient) {
    return {
        createUser: (properties: User) => {
            return instance.user.create({ data: properties });
        },
        getUser: (id: User['id']) => {
            return instance.user.findUnique({ where: { id } });
        },
        getUsers: (properties?: Partial<User>) => {
            return instance.user.findMany({ where: { ...properties } });
        },
        updateUser: (id: User['id'], properties: Partial<User>) => {
            return instance.user.update({ where: { id }, data: properties });
        },
        deleteUser: (id: User['id']) => {
            return instance.user.delete({ where: { id } });
        }
    };
}
