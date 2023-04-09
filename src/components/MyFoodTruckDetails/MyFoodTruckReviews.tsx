import { Restaurant, Review } from '@/types';
import { InfoSection } from '../InfoSection';
import { ReviewItem } from '../Review';
import styles from './MyFoodTruckReviews.module.scss';

type Props = {
    reviews: Restaurant['reviews'],
    currentUserId?: string | null
}

export default function MyFoodTruckReviews({ reviews, currentUserId }: Props) {

    return (
        <InfoSection title="Received Reviews">
            <div className={styles.reviewList}>
                {reviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review as Review}
                        currentUserId={currentUserId}
                        title={`${review.user?.firstName} ${review.user?.lastName}`}
                    />
                ))}
            </div>
        </InfoSection>
    )
}
