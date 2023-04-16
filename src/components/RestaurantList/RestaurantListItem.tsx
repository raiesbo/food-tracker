import { findMainLocation } from "@/utils";
import calcRating from "@/utils/calcRating";
import { paths } from "@/utils/paths";
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

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80';

export default function RestaurantListItem({ restaurant }: Props) {
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setRating(calcRating(restaurant.reviews));
    }, [restaurant]);

    const mainLocation = findMainLocation(restaurant.locations);
    const withVeganOptions = restaurant.menu.some((dish: Dish) => dish.isVegan);

    return (
        <Card >
            <Link
                href={`${paths.restaurants}/${restaurant.id}`}
                className={styles.cardLink}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={restaurant.imageUrl || imagePlaceholder}
                        alt='Restaurant image'
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <section className={styles.bodySection}>
                    <header className={styles.itemHeader}>
                        <div>
                            <Text variant='h3' bold>
                                {restaurant.name}
                            </Text>
                            {restaurant.slogan && (
                                <Text as='small' semiBold italic>
                                    {`${restaurant.slogan}"`}
                                </Text>
                            )}
                        </div>
                        <div>
                            <RatingStars rating={rating} />
                        </div>
                    </header>
                    <div className={styles.itemBody}>
                        <Text>
                            Number of dishes: {restaurant.menu.length}
                        </Text>
                        {mainLocation && (
                            <Text>
                                {`${mainLocation?.streetName} ${mainLocation?.streetNumber}, ${mainLocation?.city}`}
                            </Text>
                        )}
                        <div className={styles.badges}>
                            {restaurant.isCashOnly && (
                                <Chip label="Cash Only" variant="filled" color="info" size="small" />
                            )}
                            {withVeganOptions && (
                                <Chip label="Vegan Options" variant="filled" color="success" size="small" />
                            )}
                        </div>
                    </div>
                </section>
            </Link>
        </Card >
    );
}