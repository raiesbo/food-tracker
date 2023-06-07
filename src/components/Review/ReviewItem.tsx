import { Review } from "@/types";
import useToast from "@/utils/hooks/useToast";
import formatDateAndTime from "@/utils/formatDateAndTime";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton, TextField } from "@mui/material";
import { User } from "@prisma/client";
import { useState } from "react";
import { Card } from "../Card";
import { RatingStars, RatingStarsEdit } from "../RatingStars";
import { Text } from "../Text";
import { ToastAction } from "../ToastContext";
import styles from './ReviewItem.module.scss';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type Props = {
	review: Review,
	title?: string,
	currentUserId?: User['id'] | number | null,
	onRemove: (reviewId: Review['id']) => void
}

export default function ProfileReviewsItem({ review, title, currentUserId, onRemove }: Props) {
	const { dispatch } = useToast();

	const [rating, setRating] = useState(review.rating || 0);
	const [comment, setComment] = useState(review.comment || '');
	const [isLiked, setIsLiked] = useState(review.likes.some(({ userId }) => userId === currentUserId));

	const [isLoading, setIsLoading] = useState(false);
	const [isEdit, setIsEdit] = useState(false);

	const isOwner = review.userId === currentUserId;

	const onRemoveReview = (reviewId: Review['id']) => {
		setIsLoading(true);

		fetch(`/api/reviews/${reviewId}`, {
			method: 'DELETE'
		}).then(response => {
			if (response.ok) {
				onRemove(review.id);
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'Review removed successfully',
						severity: 'success'
					}
				});
			} else {
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'There has been server error, please try again later.',
						severity: 'error'
					}
				});
			}
		}).finally(() => {
			setIsLoading(false);
		});
	};

	const onCancelUpdate = () => {
		setRating(review.rating || 0);
		setComment(review.comment || '');

		setIsEdit(false);
	};

	const onSaveUpdate = () => {
		setIsLoading(true);

		fetch(`/api/reviews/${review.id}`, {
			method: 'PUT',
			body: JSON.stringify({ rating, comment })
		}).then(response => {
			if (response.ok) {
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'Review updated successfully',
						severity: 'success'
					}
				});
			} else {
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'There has been server error, please try again later.',
						severity: 'error'
					}
				});
			}
		}).finally(() => {
			setIsLoading(false);
			setIsEdit(false);
		});
	};

	const onLikeComment = () => {
		fetch(`/api/users/${currentUserId}/reviews/${review.id}/${isLiked ? 'dislike' : 'like'}`, {
			method: 'POST'
		}).then(response => {
			if (response.status === 204) setIsLiked(!isLiked);
		});
	};

	return (
		<Card key={review.id} className={styles.root}>
			<div className={styles.commentHeader}>
				<Text bold variant={'smallest'}>
					{(title || review.restaurant?.name) && (
						title || review.restaurant?.name
					)}
				</Text>
				<Text className={styles.date} variant={'smallest'} grey>
					{formatDateAndTime(review.createdAt)}
				</Text>
			</div>
			<div>
				{isEdit ? (
					<RatingStarsEdit
						rating={rating}
						onChange={setRating}
					/>
				) : (
					<RatingStars rating={rating} size='small'/>
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
			{currentUserId && (
				<div className={styles.iconsSection}>
					<div>
						<IconButton
							onClick={onLikeComment}
							size={'small'}
							aria-label='like action'
						>
							{isLiked ? (
								<ThumbUpIcon fontSize="small"/>
							) : (
								<ThumbUpOffAltIcon fontSize="small"/>
							)}
						</IconButton>
					</div>
					{isOwner && (
						<div>
							{isEdit ? (
								<>
									<IconButton
										disabled={isLoading}
										onClick={onSaveUpdate}
										aria-label='save review'
										size={'small'}
									>
										<SaveIcon color='success' fontSize="small"/>
									</IconButton>
									<IconButton
										disabled={isLoading}
										onClick={onCancelUpdate}
										aria-label='cancel review update'
										size={'small'}
									>
										<CancelIcon color='error' fontSize="small"/>
									</IconButton>
								</>
							) : (
								<IconButton
									disabled={isLoading}
									onClick={() => setIsEdit(true)}
									aria-label='edit review'
									size={'small'}
								>
									<EditIcon fontSize="small"/>
								</IconButton>
							)}

							<IconButton
								onClick={() => onRemoveReview(review.id)}
								disabled={isLoading}
								size={'small'}
								aria-label='delete review'
							>
								<DeleteIcon fontSize="small"/>
							</IconButton>
						</div>
					)}
				</div>
			)}
		</Card>
	);
}
