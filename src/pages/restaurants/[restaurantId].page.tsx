import MenuItem from "@/components/MenuItem/MenuItem";
import { NavigationMenu } from "@/components/NavigationMenu";
import { RatingStars } from "@/components/RatingStars";
import RestaurantDetailsContact from "@/components/RestaurantDetails/RestaurantDetailsContact";
import RestaurantDetailsHours from "@/components/RestaurantDetails/RestaurantDetailsHours";
import RestaurantDetailsReview from "@/components/RestaurantDetails/RestaurantDetailsReview";
import services from "@/services";
import { Dish, Restaurant } from "@/types";
import { calcRating, findMainLocation } from "@/utils";
import { auth0Config } from "@/utils/settings";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Category } from "@prisma/client";
import cc from 'classcat';
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { Card } from '../../components/Card';
import { Text } from '../../components/Text';
import styles from './restaurantDetails.module.scss';

const { restaurantService, categoriesService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.params as { restaurantId: string };

    const { result: restaurant, error } = await restaurantService.getRestaurant({ query: { restaurantId: Number(restaurantId) } });

    const {
        result: categories,
        error: getAllCategoriesError
    } = await categoriesService.getAllCategories();

    if (error || getAllCategoriesError) return {
        props: { restaurants: [], categories: [] }
    };

    return {
        props: {
            restaurant,
            categories
        }
    };
}

type Props = {
    restaurant: Restaurant,
    categories: Array<Category>
}


export default function RestaurantDetailsPage({ restaurant, categories }: Props) {
    const { user } = useUser();

    const [newComment, setNewComment] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const userMetadata = user && user[auth0Config.metadata] as { user_id: string } | undefined;

    const mainLocation = findMainLocation(restaurant.locations);
    const rating = calcRating(restaurant.reviews);

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <header>
                    <Text as='h1' bold>
                        {restaurant.name}
                    </Text>
                    {restaurant.slogan && (
                        <Text as='small' semiBold italic>
                            {`"${restaurant.slogan}"`}
                        </Text>
                    )}
                </header>
                <div className={styles.bodyContainer}>
                    <div className={cc([
                        styles.container,
                        styles.leftContainer
                    ])}>
                        <RestaurantDetailsContact
                            user={restaurant.user}
                            location={mainLocation}
                        />
                        <RestaurantDetailsHours
                            schedules={restaurant.schedules}
                        />
                    </div>
                    <div className={cc([
                        styles.container,
                        styles.middleContainer
                    ])}>
                        <Text>
                            {restaurant.description}
                        </Text>

                        <Text as='h3'>
                            Menu
                        </Text>
                        <div className={styles.menuList}>
                            {restaurant.menu.map((dish: Dish) => {
                                return (
                                    <MenuItem
                                        key={dish.id}
                                        dish={dish}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={cc([
                        styles.container,
                        styles.rightContainer
                    ])}>
                        <Card className={styles.infoCard} withHover={false}>
                            <Text as='h3'>
                                Rating
                            </Text>
                            <div>
                                <RatingStars rating={rating} />
                            </div>
                        </Card>
                        <RestaurantDetailsReview
                            reviews={restaurant.reviews}
                            ownerId={restaurant.userId}
                            restaurantId={restaurant.id}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
