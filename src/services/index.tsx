import prismaClient, { auth0Client } from '../repositories';
import auth0Service from './auth0.service';
import commentsService from "./comment.service";
import ratingsService from "./rating.service";
import restaurantService from "./restaurant.service";
import userService from "./user.service";

type Props = {
    prismaClient: typeof prismaClient,
    auth0Client: typeof auth0Client
}

function services({ prismaClient, auth0Client }: Props) {
    return {
        auth0Service: auth0Service({ auth0Client }),
        restaurantService: restaurantService(prismaClient),
        userService: userService(prismaClient),
        ratingsService: ratingsService(prismaClient),
        commentsService: commentsService(prismaClient)
    }
}

export default services({ prismaClient, auth0Client });
