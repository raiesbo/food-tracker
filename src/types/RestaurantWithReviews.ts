import { Prisma } from "@prisma/client";

export const restaurantWithReviewsInclude = Prisma.validator<Prisma.RestaurantInclude>()({
    user: true,
    reviews: {
        include: {
            user: true,
            likes: {
                select: {
                    userId: true
                }
            }
        }
    }
});

const Restaurant = Prisma.validator<Prisma.RestaurantArgs>()({ include: restaurantWithReviewsInclude });

type RestaurantWithReviews = Prisma.RestaurantGetPayload<typeof Restaurant>

export default RestaurantWithReviews;
