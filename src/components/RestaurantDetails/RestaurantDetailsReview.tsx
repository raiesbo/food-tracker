import { Restaurant, Review } from '@/types';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RatingStarsEdit } from '../RatingStars';
import { ReviewItem } from '../Review';
import { Text } from '../Text';
import styles from './RestaurantDetailsReview.module.scss';

type Props = {
    reviews: Restaurant['reviews'],
    ownerId: Restaurant['userId']
    restaurantId: Restaurant['id']
}

export default function RestaurantDetailsReview({ reviews, ownerId, restaurantId }: Props) {
    const { user } = useUser();
    const router = useRouter()

    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const userMetadata = user && user[auth0Config.metadata] as { user_id: string } | undefined;
    const isYourFoodTruck = userMetadata?.user_id === ownerId

    const onSaveNewRating = () => {
        fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({
                comment: newComment,
                rating: newRating,
                userId: userMetadata?.user_id,
                restaurantId
            })
        }).then(response => {
            console.log({ response })
            if (!response.ok) {
                alert('Server Error')
            } else {
                router.reload();
            }
        })
    }

    return (
        <>
            <div className={styles.root}>
                <Text as='h3'>
                    Reviews
                </Text>
                <div className={styles.commentList}>
                    {reviews?.map(review => (
                        <ReviewItem
                            key={review.id}
                            review={review as Review}
                            title={`${review.user?.firstName} ${review.user?.lastName}`}
                            currentUserId={userMetadata?.user_id}
                        />
                    ))}
                    {!isYourFoodTruck && user && (
                        <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
                            Write a Review
                        </Button>
                    )}
                </div>
            </div>
            <Dialog
                onClose={() => setIsDialogOpen(false)}
                open={isDialogOpen}
            >
                <DialogTitle
                    sx={{ fontWeight: 'bold' }}
                >
                    {`Your Review`}
                </DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <div className={styles.dialogContentItem}>
                        <Text variant={'h4'} bold>
                            Rating
                        </Text>
                        <RatingStarsEdit
                            rating={newRating}
                            onChange={(rating) => setNewRating(rating)}
                        />
                    </div>
                    <div className={styles.dialogContentItem}>
                        <Text variant={'h4'} bold>
                            Comment
                        </Text>
                        <TextField
                            fullWidth
                            autoFocus
                            id="name"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write here your review..."
                            multiline
                        />
                    </div>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={onSaveNewRating}>
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
