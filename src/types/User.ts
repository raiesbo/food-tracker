import { Prisma } from "@prisma/client";

export const userRelations = Prisma.validator<Prisma.UserInclude>()({
	location: true
});

const UserWithRelationships = Prisma.validator<Prisma.UserArgs>()({ include: userRelations });

type User = Prisma.UserGetPayload<typeof UserWithRelationships>

export default User;
