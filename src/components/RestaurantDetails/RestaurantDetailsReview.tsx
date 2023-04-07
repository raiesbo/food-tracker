import { Restaurant } from '@/types';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextareaAutosize } from "@mui/material";
import { useState } from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './RestaurantDetailsReview.module.scss';

type Props = {
    reviews: Restaurant['reviews'],
    ownerId: Restaurant['userId']
}

export default function RestaurantDetailsReview({ reviews, ownerId }: Props) {
    const { user } = useUser();

    const [newComment, setNewComment] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const userMetadata = user && user[auth0Config.metadata] as { user_id: string } | undefined;
    const isYourFoodTruck = userMetadata?.user_id === ownerId

    return (
        <>
            <div className={styles.root}>
                <Text as='h3'>
                    Reviews
                </Text>
                <div className={styles.commentList}>
                    {reviews?.map(review => review.comment && (
                        <Card key={review.id} className={styles.commentItem}>
                            <div className={styles.commentHeader}>
                                <p>
                                    {review.user?.firstName && (
                                        <strong>{`${review.user?.firstName} ${review.user?.lastName}`}</strong>
                                    )}
                                </p>
                                <p>{(new Date(review.createdAt)).toDateString()}</p>
                            </div>
                            <p className={styles.commentBody}>
                                {review.comment}
                            </p>
                            {user && (
                                <div className={styles.iconsSection}>
                                    <div>
                                        <IconButton>
                                            <ThumbUpOffAltIcon />
                                        </IconButton>
                                        <IconButton>
                                            <QuestionAnswerIcon />
                                        </IconButton>
                                    </div>
                                    <div>
                                        {userMetadata?.user_id === review.userId && (
                                            <>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                    {!isYourFoodTruck && (
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
                <DialogTitle>{`New Review`}</DialogTitle>
                <DialogContent>
                    <TextareaAutosize
                        autoFocus
                        id="name"
                        value={newComment} onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write here your review..."
                        minRows={3}
                        className={styles.createCommentText}
                    />
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={() => setIsDialogOpen(false)}>Save</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}