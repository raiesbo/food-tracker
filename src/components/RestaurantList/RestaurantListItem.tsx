import { findMainLocation } from "@/utils";
import calcRating from "@/utils/calcRating";
import { paths } from "@/utils/paths";
import { imagesConfig } from "@/utils/settings";
import { Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dish, Restaurant } from '../../types';
import { Card } from '../Card';
import { RatingStars } from "../RatingStars";
import { Text } from '../Text';
import styles from './restaurantListItem.module.scss';

type Props = {
	restaurant: Restaurant
}

export default function RestaurantListItem({ restaurant }: Props) {
	const [rating, setRating] = useState(0);

	useEffect(() => {
		setRating(calcRating(restaurant.reviews));
	}, [restaurant]);

	const mainLocation = findMainLocation(restaurant.locations);
	const withVeganOptions = restaurant.menu.some((dish: Dish) => dish.isVegan);

	return (
		<Card withHover className={styles.root}>
			<Link
				href={`${paths.restaurants}/${restaurant.id}`}
				className={styles.cardLink}
			>
				<div className={styles.imageContainer}>
					<Image
						src={restaurant.imageUrl || imagesConfig.default}
						blurDataURL={imagesConfig.default}
						alt='Restaurant image'
						style={{ objectFit: 'cover' }}
						fill
						priority
						placeholder='blur'
					/>
				</div>
				<div className={styles.cardBody}>
					<header className={styles.cardBodyHeader}>
						<div>
							<Text bold>
								{restaurant.name}
							</Text>
							{restaurant.slogan && (
								<Text as='small' grey semiBold italic>
									{`"${restaurant.slogan}"`}
								</Text>
							)}
						</div>
						<div className={styles.ratingContainer}>
							<Text semiBold variant={'smallest'}>
								{restaurant.reviews.length}
							</Text>
							<RatingStars rating={rating} size='small'/>
						</div>
					</header>
					<footer className={styles.cardFooter}>
						{mainLocation && (
							<Text semiBold variant={"smallest"}>
								{`${mainLocation?.streetName} ${mainLocation?.streetNumber}, ${mainLocation?.city}`}
							</Text>
						)}
						<div className={styles.badges}>
							{restaurant.isCashOnly && (
								<Chip label="Cash Only" variant="filled" color="info" size="small"/>
							)}
							{withVeganOptions && (
								<Chip label="Vegan Options" variant="filled" color="success" size="small"/>
							)}
						</div>
					</footer>
				</div>
			</Link>
		</Card>
	);
}
