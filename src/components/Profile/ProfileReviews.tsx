import { Restaurant, Review } from '@/types';
import { InfoSection } from '../InfoSection';
import styles from './ProfileReviews.module.scss';
import ProfileReviewsItem from './ProfileReviewsItem';

type Props = {
    reviews: Restaurant['reviews']
}

export default function RestaurantDetailsReview({ reviews }: Props) {

    return (
        <InfoSection title="Your Reviews">
            <div className={styles.commentList}>
                {reviews.map((review) => (
                    <ProfileReviewsItem
                        key={review.id}
                        review={review as Review}
                    />
                ))}
            </div>
        </InfoSection>
    )
}