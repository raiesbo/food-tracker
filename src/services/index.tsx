import prismaClient, { auth0Client } from '../repositories';
import auth0Service from './auth0.service';
import restaurantService from "./restaurant.service";
import userService from "./user.service";

type Props = {
    prismaClient: typeof prismaClient,
    auth0Client: typeof auth0Client
}

function dbServices({ prismaClient, auth0Client }: Props) {
    return {
        auth0Service: auth0Service({ auth0Client }),
        restaurantService: restaurantService(prismaClient),
        userService: userService(prismaClient)
    }
}

export default dbServices({ prismaClient, auth0Client });
