import { Restaurant, Review } from '@/types';
import { Text } from '../Text';
import styles from './ProfileReviews.module.scss';
import ProfileReviewsItem from './ProfileReviewsItem';

type Props = {
    reviews: Restaurant['reviews'],
    ownerId: Restaurant['userId']
}

export default function RestaurantDetailsReview({ reviews }: Props) {

    return (
        <div className={styles.root}>
            <Text as='h2' variant='h3' bold>
                Your Reviews
            </Text>
            <div className={styles.commentList}>
                {reviews.map((review) => (
                    <ProfileReviewsItem
                        key={review.id}
                        review={review as Review}
                    />
                ))}
            </div>
        </div>
    )
}