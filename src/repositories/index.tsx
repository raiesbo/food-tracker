import categoryClient from './category.repo';
import dishClient from './dish.repo';
import locationClient from './location.repo';
import PrismaDBClient, { IDBClient } from './prismaClient';
import restaurantClient from './restaurant.repo';
import reviewClient from './review.repo';

function prismaClients(prismaInstance: IDBClient) {
    return {
        restaurantClient: restaurantClient(prismaInstance),
        dishClient: dishClient(prismaInstance),
        reviewClient: reviewClient(prismaInstance),
        locationClient: locationClient(prismaInstance),
        categoryClient: categoryClient(prismaInstance)
    };
}

export default prismaClients(PrismaDBClient);
export { default as auth0Client } from './auth0.repo';
