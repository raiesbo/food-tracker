import categoryClient from './category.repo';
import commentClient from './comment.repo';
import dishClient from './dish.repo';
import locationClient from './location.repo';
import PrismaDBClient, { IDBClient } from './prismaClient';
import ratingClient from './rating.repo';
import restaurantClient from './restaurant.repo';
import userClient from './user.repo';

function prismaClients(prismaInstance: IDBClient) {
    return {
        userClient: userClient(prismaInstance),
        restaurantClient: restaurantClient(prismaInstance),
        dishClient: dishClient(prismaInstance),
        commentClient: commentClient(prismaInstance),
        ratingClient: ratingClient(prismaInstance),
        locationClient: locationClient(prismaInstance),
        categoryClient: categoryClient(prismaInstance)
    }
}

export default prismaClients(PrismaDBClient);
export { default as auth0Client } from './auth0.repo';
