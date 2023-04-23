import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Dish } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Text } from "../Text";
import styles from './RestaurantListOrderConfirmation.module.scss';

type Props = {
    isOpen: boolean,
    isLoading: boolean,
    onCancel: () => void,
    onAccept: (date: Date) => void,
    order: Array<{ id: number, units: number }>
    menu: Array<Dish>
}

export default function RestaurantListOrderConfirmation({ isOpen, isLoading = false, onCancel, onAccept, menu, order }: Props) {
    const [date, setDate] = useState(new Date);

    const totalPrice = order?.reduce((acc: number, dish) => {
        const foundDish = menu.find(({ id }) => id === dish.id);
        return foundDish?.price ? acc + dish.units * foundDish.price : acc;
    }, 0) || 0;

    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(new Date(e.target.value));
    };

    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
        >
            <div className={styles.root}>
                <header>
                    <Text semiBold variant='h3'>Order confirmation</Text>
                </header>
                <div>

                    <div>
                        <Text bold variant='h4'>Pick up date</Text>
                        <input
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={date.toString()}
                            onChange={onDateChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Text bold variant='h4'>Order description</Text>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ padding: 1 }}>Name</TableCell>
                                    <TableCell sx={{ padding: 1 }} align="center">Units</TableCell>
                                    <TableCell sx={{ padding: 1 }} align="center">Price / Unit</TableCell>
                                    <TableCell sx={{ padding: 1 }} align="center">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order?.map((dish) => {
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
                                            <TableCell align="center" sx={{ padding: 1 }}>{dishData.price}</TableCell>
                                            <TableCell align="center" sx={{ padding: 1 }}>{`${price}€`}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" sx={{ padding: 1 }}>
                                    </TableCell>
                                    <TableCell align="center" sx={{ padding: 1 }}></TableCell>
                                    <TableCell align="center" sx={{ padding: 1 }}></TableCell>
                                    <TableCell align="center" sx={{ padding: 1, fontWeight: "bold" }}>{`${totalPrice.toFixed(2)}€`}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => onAccept(date)}
                        disabled={isLoading}
                    >
                        Accept
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
