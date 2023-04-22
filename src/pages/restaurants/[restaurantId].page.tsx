import MenuItem from "@/components/MenuItem/MenuItem";
import { OrderAction } from "@/components/OrderContext";
import { RatingStars } from "@/components/RatingStars";
import RestaurantDetailsContact from "@/components/RestaurantDetails/RestaurantDetailsContact";
import RestaurantDetailsHours from "@/components/RestaurantDetails/RestaurantDetailsHours";
import RestaurantDetailsReview from "@/components/RestaurantDetails/RestaurantDetailsReview";
import services from "@/services";
import { Dish, Restaurant } from "@/types";
import { calcRating, findMainLocation } from "@/utils";
import userOrder from "@/utils/hooks/useOrder";
import { auth0Config } from "@/utils/settings";
import { useUser } from "@auth0/nextjs-auth0/client";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Popover } from "@mui/material";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import cc from 'classcat';
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import { Card } from '../../components/Card';
import { Text } from '../../components/Text';
import styles from './restaurantDetails.module.scss';

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.params as { restaurantId: string };

    const {
        result: restaurant,
        error
    } = await restaurantService.getRestaurant({ query: { restaurantId: Number(restaurantId) } });

    if (error) return {
        props: { restaurants: [] }
    };

    return { props: { restaurant } };
}

type Props = { restaurant: Restaurant }

export default function RestaurantDetailsPage({ restaurant }: Props) {
    const { user } = useUser();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { state: orderState, dispatch } = userOrder();

    const userMetadata = user && user[auth0Config.metadata] as { user_id: string } | undefined;

    const mainLocation = findMainLocation(restaurant.locations);
    const rating = calcRating(restaurant.reviews);

    const numberOfOrders = orderState[restaurant.id]?.length || 0;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onAddToOrder = (dishId: Dish['id']) => {
        dispatch({ type: OrderAction.ADD_TO_ORDER, payload: { restaurantId: restaurant.id, dishId } });
    };

    return (
        <div className={styles.root}>
            <header className={styles.shopHeader}>
                <div>
                    <Text as='h1' bold>
                        {restaurant.name}
                    </Text>
                    {restaurant.slogan && (
                        <Text as='small' semiBold italic>
                            {restaurant.slogan}
                        </Text>
                    )}
                </div>
                {user && (
                    <div>
                        <IconButton
                            onClick={handleClick}
                            disabled={numberOfOrders === 0}
                        >
                            <Badge
                                badgeContent={numberOfOrders}
                                color="primary"
                            >
                                <LocalGroceryStoreIcon />
                            </Badge>
                        </IconButton>
                        <Popover
                            id={'simple-popover'}
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                        >
                            <Card className={styles.orderPopover}>
                                <Text bold variant='h4'>Your Pre-Order:</Text>
                                {orderState[restaurant.id]?.map((dish) => {
                                    const name = restaurant.menu.find(({ id }) => dish.id === id)?.name;
                                    return (
                                        <div key={dish.id}>
                                            <Text>{`${name}: ${dish.units}`}</Text>
                                        </div>
                                    );
                                })}
                            </Card>
                        </Popover>
                    </div>
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
                                    onAddToOrder={user && onAddToOrder}
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
        </div>
    );
}
