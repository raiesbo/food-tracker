import { Review } from "@prisma/client";

export default function calcRating(ratings: Array<Review> = []) {
    const sum = ratings?.reduce((acc, rating) => (
        acc + rating.rating
    ), 0);

    return sum > 0 ? sum / ratings.length : 0;
};
