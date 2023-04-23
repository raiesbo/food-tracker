import Text from '@/components/Text/Text';
import { Review } from '@/types';
import { User } from '@prisma/client';
import cc from 'classcat';
import { useEffect, useState } from 'react';
import { InfoSection } from '../InfoSection';
import { ReviewItem } from '../Review';
import styles from './ProfileReviews.module.scss';

type Props = {
    currentUserId?: User['id']
    className?: string
}

export default function RestaurantDetailsReview({ currentUserId, className }: Props) {
    const [isLoading, setisLoading] = useState(false);
    const [reviews, setReviews] = useState<Array<Review>>([]);

    const onDeleteOne = (reviewId: Review['id']) => {
        setReviews([...reviews.filter(({ id }) => id !== reviewId)]);
    };

    useEffect(() => {
        const getReviews = () => {
            setisLoading(true);

            fetch(`/api/users/${currentUserId}/reviews`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return { reviews: [] };
                    }
                })
                .then(({ reviews }) => {
                    if (reviews.length > 0) setReviews(reviews);
                })
                .finally(() => setisLoading(false));
        };
        getReviews();
    }, [currentUserId]);

    return (
        <InfoSection title="Your Reviews" className={cc([className])}>
            {isLoading ? (
                <Text>Loading the personal reviews...</Text>
            ) : (
                <div className={styles.reviewList}>
                    {reviews.map((review) => (
                        <ReviewItem
                            key={review.id}
                            review={review as Review}
                            currentUserId={currentUserId}
                            onRemove={onDeleteOne}
                        />
                    ))}
                </div>
            )}
        </InfoSection>
    );
}
