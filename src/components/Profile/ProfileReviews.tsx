import { Restaurant, Review } from '@/types';
import cc from 'classcat';
import { InfoSection } from '../InfoSection';
import { ReviewItem } from '../Review';
import styles from './ProfileReviews.module.scss';

type Props = {
    reviews: Restaurant['reviews'],
    currentUserId?: string
    className?: string
}

export default function RestaurantDetailsReview({ reviews, currentUserId, className }: Props) {

    return (
        <InfoSection title="Your Reviews" className={cc([className])}>
            <div className={styles.reviewList}>
                {reviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review as Review}
                        currentUserId={currentUserId}
                    />
                ))}
            </div>
        </InfoSection>
    )
}