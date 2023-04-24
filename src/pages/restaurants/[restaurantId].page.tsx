import MenuItem from "@/components/MenuItem/MenuItem";
import { OrderAction } from "@/components/OrderContext";
import { RatingStars } from "@/components/RatingStars";
import RestaurantDetailsContact from "@/components/RestaurantDetails/RestaurantDetailsContact";
import RestaurantDetailsHours from "@/components/RestaurantDetails/RestaurantDetailsHours";
import RestaurantDetailsOrder from "@/components/RestaurantDetails/RestaurantDetailsOrder";
import RestaurantDetailsReview from "@/components/RestaurantDetails/RestaurantDetailsReview";
import RestaurantListOrderConfirmation from "@/components/RestaurantList/RestaurantListOrderConfirmation";
import { ToastAction } from "@/components/ToastContext";
import services from "@/services";
import { Dish, Restaurant } from "@/types";
import { calcRating, findMainLocation, useToast } from "@/utils";
import userOrder from "@/utils/hooks/useOrder";
import { auth0Config } from "@/utils/settings";
import { useUser } from "@auth0/nextjs-auth0/client";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import cc from 'classcat';
import { Dayjs } from "dayjs";
import { GetServerSidePropsContext } from "next";
import { Suspense, useState } from "react";
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
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { state: orderState, dispatch: orderDispatch } = userOrder();
    const { dispatch } = useToast();

    const mainLocation = findMainLocation(restaurant.locations);
    const rating = calcRating(restaurant.reviews);
    const userMetadata = user && user[auth0Config.metadata] as { user_id: string };

    const numberOfOrders = orderState[restaurant.id]?.reduce((acc, dish) => {
        return acc + dish.units;
    }, 0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onAddToOrder = (dishId: Dish['id']) => {
        orderDispatch({ type: OrderAction.ADD_ONE_TO_ORDER, payload: { restaurantId: restaurant.id, dishId } });
    };

    const onConfirmOrder = (orderDate: Dayjs | null) => {
        setIsLoading(true);

        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify({
                deliveryAt: orderDate,
                userId: Number(userMetadata?.user_id),
                restaurantId: restaurant.id,
                items: orderState[restaurant.id]
            })
        }).then(response => {
            console.log({ response });
            if (response.ok) {
                dispatch({
                    type: ToastAction.UPDATE_TOAST, payload: {
                        message: 'Order successfully created',
                        severity: 'success'
                    }
                });
                orderDispatch({ type: OrderAction.CLEAR_ORDER, payload: { restaurantId: restaurant.id } });
                setIsConfirmationOpen(false);
            } else {
                dispatch({
                    type: ToastAction.UPDATE_TOAST, payload: {
                        message: 'There has been a server error while placing the order',
                        severity: 'error'
                    }
                });
            }
        }).finally(() => { setIsLoading(false); });
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
                            disabled={!numberOfOrders || numberOfOrders === 0}
                        >
                            <Badge
                                badgeContent={numberOfOrders}
                                color="primary"
                            >
                                <LocalGroceryStoreIcon />
                            </Badge>
                        </IconButton>
                        <RestaurantDetailsOrder
                            restaurantId={restaurant.id}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                            handleClose={handleClose}
                            menu={restaurant.menu}
                            setIsConfirmationOpen={setIsConfirmationOpen}
                        />
                    </div >
                )}
            </header >
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
                    <Suspense fallback={<p>Loading Reviews</p>}>
                        <RestaurantDetailsReview
                            reviews={restaurant.reviews}
                            ownerId={restaurant.userId}
                            restaurantId={restaurant.id}
                        />
                    </Suspense>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RestaurantListOrderConfirmation
                    isOpen={isConfirmationOpen}
                    onCancel={() => setIsConfirmationOpen(false)}
                    onAccept={onConfirmOrder}
                    menu={restaurant.menu}
                    order={orderState[restaurant.id]}
                    isLoading={isLoading}
                />
            </LocalizationProvider>
        </div>
    );
}
