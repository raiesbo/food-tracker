import { Restaurant, Review } from '@/types';
import { User } from '@prisma/client';
import { useState } from 'react';
import { InfoSection } from '../InfoSection';
import { ReviewItem } from '../Review';
import styles from './MyFoodTruckReviews.module.scss';

type Props = {
    reviews: Restaurant['reviews'],
    currentUserId?: User['id'] | null
}

export default function MyFoodTruckReviews({ reviews, currentUserId }: Props) {
    const [localReviews, setReviews] = useState(reviews);

    const onDeleteOne = (reviewId: Review['id']) => {
        setReviews([...localReviews.filter(({ id }) => id !== reviewId)]);
    };

    return (
        <InfoSection title="Received Reviews">
            <div className={styles.reviewList}>
                {localReviews.map((review) => (
                    <ReviewItem
                        key={review.createdAt.toDateString()}
                        review={review as Review}
                        currentUserId={currentUserId}
                        title={`${review.user?.firstName} ${review.user?.lastName}`}
                        onRemove={onDeleteOne}
                    />
                ))}
            </div>
        </InfoSection>
    );
}
