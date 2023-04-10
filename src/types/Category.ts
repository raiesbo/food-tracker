import { categoryRelations } from "@/repositories/category.repo";
import { Prisma } from "@prisma/client";

const CategoryWithRelationships = Prisma.validator<Prisma.CategoryArgs>()({ include: categoryRelations });

type Category = Prisma.CategoryGetPayload<typeof CategoryWithRelationships>

export default Category;
