import { dishRelations } from "@/repositories/dish.repo";
import { Prisma } from "@prisma/client";

const DishtWithRelationships = Prisma.validator<Prisma.DishArgs>()({ include: dishRelations });

type Dish = Prisma.DishGetPayload<typeof DishtWithRelationships>

export default Dish;
