import PrismaDBClient, { IDBClient } from './prismaClient';
import { default as userClient } from './user.repo';

function prismaClients(prismaInstance: IDBClient) {
    return {
        userClient: userClient(prismaInstance)
    }
}

export default prismaClients(PrismaDBClient);