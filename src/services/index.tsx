import prismaClients from '../repositories';
import userService from "./user.service";

function dbServices(prismaClient: typeof prismaClients) {
    return {
        userService: userService(prismaClient)
    }
}

export default dbServices(prismaClients);
