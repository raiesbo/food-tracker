import MenuItem from "@/components/MenuItem/MenuItem";
import { OrderAction } from "@/components/OrderContext";
import { RatingStars } from "@/components/RatingStars";
import RestaurantDetailsContact from "@/components/RestaurantDetails/RestaurantDetailsContact";
import RestaurantDetailsHours from "@/components/RestaurantDetails/RestaurantDetailsHours";
import RestaurantDetailsReview from "@/components/RestaurantDetails/RestaurantDetailsReview";
import RestaurantListOrderConfirmation from "@/components/RestaurantList/RestaurantListOrderConfirmation";
import services from "@/services";
import { Dish, Restaurant } from "@/types";
import { calcRating, findMainLocation } from "@/utils";
import userOrder from "@/utils/hooks/useOrder";
import { useUser } from "@auth0/nextjs-auth0/client";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import cc from 'classcat';
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
    const { state: orderState, dispatch } = userOrder();

    const mainLocation = findMainLocation(restaurant.locations);
    const rating = calcRating(restaurant.reviews);

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
        dispatch({ type: OrderAction.ADD_ONE_TO_ORDER, payload: { restaurantId: restaurant.id, dishId } });
    };

    const onConfirmOrder = (orderDate: Date) => {
        setIsLoading(true);

        fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify({
                deliveryAt: orderDate
                //TODO: Fill with rest of data
            })
        }).then(response => {
            if (response.ok) {
                alert('ok');
                dispatch({ type: OrderAction.CLEAR_ORDER, payload: { restaurantId: restaurant.id } });
                setIsConfirmationOpen(false);
            } else {
                alert('no ok');
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
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ padding: 1 }}>Name</TableCell>
                                            <TableCell sx={{ padding: 1 }} align="center">Units</TableCell>
                                            <TableCell sx={{ padding: 1 }} align="center">Total</TableCell>
                                            <TableCell sx={{ padding: 1 }} align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderState[restaurant.id]?.map((dish) => {
                                            const dishData = restaurant.menu.find(({ id }) => dish.id === id);
                                            const price = (dishData?.price ? dishData.price * dish.units : 0).toFixed(2);
                                            return dishData && (
                                                <TableRow
                                                    key={dish.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                                                        {dishData.name}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ padding: 1 }}>{dish.units}</TableCell>
                                                    <TableCell align="center" sx={{ padding: 1 }}>{`${price}€`}</TableCell>
                                                    <TableCell align="center" sx={{ padding: 1 }} className={styles.buttonsContainer}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => dispatch({
                                                                type: OrderAction.ADD_ONE_TO_ORDER, payload: {
                                                                    restaurantId: dishData.restaurantId || 0,
                                                                    dishId: dishData.id
                                                                }
                                                            })}
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small" onClick={() => dispatch({
                                                                type: OrderAction.REMOVE_ONE_FROM_ORDER, payload: {
                                                                    restaurantId: dishData.restaurantId || 0,
                                                                    dishId: dishData.id
                                                                }
                                                            })}
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => dispatch({
                                                                type: OrderAction.REMOVE_ORDER, payload: {
                                                                    restaurantId: dishData.restaurantId || 0,
                                                                    dishId: dishData.id
                                                                }
                                                            })}
                                                        >
                                                            <ClearIcon fontSize="small" color="error" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                                <div className={styles.orderButton}>
                                    <Button
                                        variant='contained'
                                        sx={{ width: '100%' }}
                                        onClick={() => {
                                            setAnchorEl(null);
                                            setIsConfirmationOpen(true);
                                        }}
                                    >
                                        Order now
                                    </Button>
                                </div>
                            </Card>
                        </Popover>
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
            <RestaurantListOrderConfirmation
                isOpen={isConfirmationOpen}
                onCancel={() => setIsConfirmationOpen(false)}
                onAccept={onConfirmOrder}
                menu={restaurant.menu}
                order={orderState[restaurant.id]}
                isLoading={isLoading}
            />
        </div>
    );
}
