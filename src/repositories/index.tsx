import commentClient from './comment.repo';
import dishClient from './dish.repo';
import PrismaDBClient, { IDBClient } from './prismaClient';
import restaurantClient from './restaurant.repo';
import userClient from './user.repo';

function prismaClients(prismaInstance: IDBClient) {
    return {
        userClient: userClient(prismaInstance),
        restaurantClient: restaurantClient(prismaInstance),
        dishClient: dishClient(prismaInstance),
        commentClient: commentClient(prismaInstance),
    }
}

export default prismaClients(PrismaDBClient);
export { default as auth0Client } from './auth0.repo';
