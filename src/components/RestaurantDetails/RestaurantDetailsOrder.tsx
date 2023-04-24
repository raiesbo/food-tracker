import { Dish, Restaurant } from "@/types";
import useOrder from "@/utils/hooks/useOrder";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "../Card/Card";
import { OrderAction } from "../OrderContext/OrderReducer";
import styles from './RestaurantDetailsOrder.module.scss';

type Props = {
    restaurantId: Restaurant['id'],
    anchorEl: HTMLButtonElement | null,
    setAnchorEl: (e: HTMLButtonElement | null) => void,
    handleClose: () => void,
    menu: Array<Dish>,
    setIsConfirmationOpen: (e: boolean) => void
}

export default function RestaurantDetailsOrder({
    restaurantId, anchorEl, setAnchorEl, handleClose, menu, setIsConfirmationOpen
}: Props) {
    const { state: orderState, dispatch: orderDispatch } = useOrder();

    return (
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
            <Card className={styles.root}>
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
                        {orderState[restaurantId]?.map((dish: { id: number; units: number }) => {
                            const dishData = menu.find(({ id }) => dish.id === id);
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
                                            onClick={() => orderDispatch({
                                                type: OrderAction.ADD_ONE_TO_ORDER, payload: {
                                                    restaurantId: dishData.restaurantId || 0,
                                                    dishId: dishData.id
                                                }
                                            })}
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small" onClick={() => orderDispatch({
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
                                            onClick={() => orderDispatch({
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
    );
}
