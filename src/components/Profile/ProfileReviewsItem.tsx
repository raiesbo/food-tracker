import { Review } from "@/types";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "../Card";
import { RatingStars, RatingStarsEdit } from "../RatingStars";
import { Text } from "../Text";
import styles from './ProfileReviewsItem.module.scss';

type Props = {
    review: Review
}

export default function ProfileReviewsItem({ review }: Props) {
    const router = useRouter();

    const [rating, setRating] = useState(review.rating)
    const [comment, setComment] = useState(review.comment)

    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const onRemoveReview = (reviewId: Review['id']) => {
        setIsLoading(true);

        fetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                router.reload();
                return;
            };
            // TODO Switch from alter to Toast
            alert('There has been server error, please try again later.');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const onCancelUpdate = () => {
        setRating(review.rating);
        setComment(review.comment);

        setIsEdit(false);
    }

    const onSaveUpdate = () => {
        setIsLoading(true);

        fetch(`/api/reviews/${review.id}`, {
            method: 'PUT',
            body: JSON.stringify({ rating, comment })
        }).then(response => {
            if (response.ok) return;
            // TODO Switch from alter to Toast
            alert('There has been server error, please try again later.');
        }).finally(() => {
            setIsLoading(false);
            setIsEdit(false);
        })
    }

    return (
        <Card key={review.id} className={styles.root}>
            <div className={styles.commentHeader}>
                <Text>
                    {review.user?.firstName && (
                        <strong>{`${review.restaurant?.name}`}</strong>
                    )}
                </Text>
                <Text>{(new Date(review.createdAt)).toDateString()}</Text>
            </div>
            <div>
                {isEdit ? (
                    <RatingStarsEdit
                        rating={rating}
                        onChange={setRating}
                    />
                ) : (
                    <RatingStars rating={rating} />
                )}
            </div>
            {comment && !isEdit && (
                <Text className={styles.commentBody}>
                    {comment}
                </Text>
            )}
            {isEdit && (
                <TextField
                    value={comment}
                    multiline
                    onChange={(e) => setComment(e.target.value)}
                />
            )}
            <div className={styles.iconsSection}>
                <div>
                    {isEdit ? (
                        <>
                            <IconButton
                                disabled={isLoading}
                                onClick={onSaveUpdate}
                            >
                                <SaveIcon color='success' />
                            </IconButton>
                            <IconButton
                                disabled={isLoading}
                                onClick={onCancelUpdate}
                            >
                                <CancelIcon color='error' />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton
                            disabled={isLoading}
                            onClick={() => setIsEdit(true)}
                        >
                            <EditIcon />
                        </IconButton>
                    )}

                    <IconButton
                        onClick={() => onRemoveReview(review.id)}
                        disabled={isLoading}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}