import { Prisma } from "@prisma/client";

export const categoryRelations = Prisma.validator<Prisma.CategoryInclude>()({
	_count: {
		select: { restaurants: true }
	}
});

const CategoryWithRelationships = Prisma.validator<Prisma.CategoryArgs>()({ include: categoryRelations });

type Category = Prisma.CategoryGetPayload<typeof CategoryWithRelationships>

export default Category;
