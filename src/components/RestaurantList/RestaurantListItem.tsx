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
    const [ rating, setRating ] = useState(0);

    useEffect(() => {
        setRating(calcRating(restaurant.reviews));
    }, [ restaurant ]);

    const mainLocation = findMainLocation(restaurant.locations);
    const withVeganOptions = restaurant.menu.some((dish: Dish) => dish.isVegan);

    return (
        <Card withHover>
            <Link
                href={`${paths.restaurants}/${restaurant.id}`}
                className={styles.cardLink}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={restaurant.imageUrl || imagesConfig.default}
                        alt='Restaurant image'
                        style={{ objectFit: 'cover' }}
                        height='150'
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
