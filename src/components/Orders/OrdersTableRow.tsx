import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Order } from ".prisma/client";
import { useState } from "react";
import { Collapse, IconButton, TableHead, Box, Table, TableBody } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OrderItem } from "@prisma/client";
import Button from "@mui/material/Button";
import { useToast } from "@/utils";
import formatDate from "@/utils/formatDate";
import { Text } from '../Text';
import styles from './OrdersTableRow.module.scss';
import { ToastAction } from "@/components/ToastContext";

type Props = {
	order: Order & {
		items: Array<OrderItem & { dish: any }>
	},
	onUpdateOrder: (id: Order['id']) => void
}

export default function OrderTableRow({ order, onUpdateOrder }: Props) {
	const { dispatch } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const totalPrice = order.items.reduce((acc, item) => {
		return acc + item.units * item.dish.price;
	}, 0);

	const onAcceptOrder = () => {
		setIsLoading(true);
		fetch(`/api/orders/${order.id}`, {
			method: 'PUT',
			body: JSON.stringify({ isAccepted: true })
		}).then(response => response.json())
			.then(({ order }) => {
				if (order.id) {
					dispatch({
						type: ToastAction.UPDATE_TOAST, payload: {
							message: 'Order successfully updated',
							severity: 'success'
						}
					});
					onUpdateOrder(order.id);
				} else {
					dispatch({
						type: ToastAction.UPDATE_TOAST, payload: {
							message: 'Server Error. Unable to accept the order',
							severity: 'error'
						}
					});
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{order.id}
				</TableCell>
				<TableCell align="right" className={styles.date}>
					{formatDate(order?.createdAt)}
				</TableCell>
				<TableCell align="right" className={styles.date}>
					{formatDate(order?.deliveryAt || '')}
				</TableCell>
				<TableCell align="right">
					{totalPrice} €
				</TableCell>
				<TableCell align="right">
					{order.isAccepted ? (
						<Text semiBold variant='h4'>
							ACCEPED
						</Text>
					) : (
						<Button
							variant='contained'
							color='warning'
							disabled={isLoading}
							onClick={onAcceptOrder}
						>
							Accept Order
						</Button>
					)}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Text semiBold variant='h3'>
								Order details
							</Text>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>
											<Text semiBold variant='h4'>
												Dish name
											</Text>
										</TableCell>
										<TableCell>
											<Text semiBold variant='h4'>
												Units
											</Text>
										</TableCell>
										<TableCell align="right">
											<Text semiBold variant='h4'>
												Price / Dish
											</Text>
										</TableCell>
										<TableCell align="right">
											<Text semiBold variant='h4'>
												Total price (€)
											</Text>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order?.items?.map((orderItem) => (
										<TableRow key={orderItem.id}>
											<TableCell component="th" scope="row">
												{orderItem.dish.name}
											</TableCell>
											<TableCell>
												{orderItem.units}
											</TableCell>
											<TableCell align="right">
												{orderItem.dish.price}
											</TableCell>
											<TableCell align="right">
												{orderItem.dish.price * orderItem.units}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
