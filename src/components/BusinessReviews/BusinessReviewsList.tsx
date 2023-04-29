import styles from "./BusinessReviewsList.module.scss";
import { ReviewItem } from "@/components/Review";
import { Review } from "@/types";
import { useState } from "react";
import { User } from "@prisma/client";
import RestaurantWithReviews from "@/types/RestaurantWithReviews";

type Props = {
	prefechedReviews: RestaurantWithReviews['reviews'],
	userId: User['id']
}

export default function BusinessReviewsList({ prefechedReviews, userId }: Props) {
	const [reviews, setReviews] = useState(prefechedReviews);

	const onRemoveReview = (reviewId: number) => {
		setReviews([...reviews.filter(review => review.id !== reviewId)]);
	};

	return (
		<div className={styles.root}>
			{reviews?.map((review) => (
				<ReviewItem
					key={review.id}
					review={review as Review}
					currentUserId={userId}
					title={`${review.user?.firstName} ${review.user?.lastName}`}
					onRemove={onRemoveReview}
				/>
			))}
		</div>
	);
}
