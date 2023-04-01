import { restaurantRelations } from "@/repositories/restaurant.repo";
import { Prisma } from "@prisma/client";

const RestaurantWithRelationships = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantRelations });

type Restaurant = Prisma.RestaurantGetPayload<typeof RestaurantWithRelationships>

export default Restaurant;