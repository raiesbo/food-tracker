import PrismaDBClient, { IDBClient } from './prismaClient';
import { default as userClient } from './user.repo';

function prismaClients(prismaInstance: IDBClient) {
    return {
        userClient: userClient(prismaInstance)
    }
}

export default prismaClients(PrismaDBClient);
export { default as auth0Client } from './auth0.repo';
