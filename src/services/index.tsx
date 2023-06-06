import prismaClient, { auth0Client } from '../repositories';
import auth0Service from './auth0.service';
import categoriesService from "./category.service";
import dishesService from "./dishes.service";
import fileService from './file.service';
import locationsService from "./location.service";
import restaurantService from "./restaurant.service";
import reviewsService from "./review.service";

type Props = {
    prismaClient: typeof prismaClient,
    auth0Client: typeof auth0Client
}

function services({ prismaClient, auth0Client }: Props) {
    return {
        auth0Service: auth0Service({ auth0Client }),
        restaurantService: restaurantService(prismaClient),
        reviewsService: reviewsService(prismaClient),
        categoriesService: categoriesService(prismaClient),
        dishesService: dishesService(prismaClient),
        locationsService: locationsService(prismaClient),
        fileService: fileService()
    };
}

export default services({ prismaClient, auth0Client });
