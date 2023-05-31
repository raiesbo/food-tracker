import RestaurantWithOrders from "@/types/RestaurantWithOrders";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import OrderTableRow from "@/components/Orders/OrdersTableRow";
import { Card } from "@/components/Card";
import { Text } from "@/components/Text";
import styles from './OrdersTable.module.scss';
import { Order, User } from ".prisma/client";
import { OrderItem } from "@prisma/client";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useState } from "react";
import { io } from "socket.io-client";

type OrderDate = Order & {
	items: Array<OrderItem & { dish: any }>
}

type Props = {
	fetchedOrders: RestaurantWithOrders['orders'],
	userId: User['id'] | null
}

export default function OrderTable({ fetchedOrders, userId }: Props) {
	const [orders, setOrders] = useState(fetchedOrders);
	const [value, setValue] = useState(0);

	const onAcceptOrder = async (orderId: Order['id']) => {
		io().emit('count');
		setOrders([...orders.map(order => {
			return order.id === orderId
				? { ...order, isAccepted: true }
				: order;
		})]);
	};

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const sortedOrders = orders.reduce((acc: { open: Array<any>, accepted: Array<any> }, order) => {
		return order.isAccepted
			? { ...acc, accepted: [...acc.accepted, order] }
			: { ...acc, open: [...acc.open, order] };
	}, { open: [], accepted: [] });

	const selectedOrders = sortedOrders[value ? 'accepted' : 'open'];

	return (
		<Card className={styles.root}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell align="center" colSpan={6} className={styles.tabsContainer}>
							<Tabs value={value} onChange={handleChange}>
								<Tab label="Open Orders"/>
								<Tab label="Accepted"/>
							</Tabs>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell/>
						<TableCell>
							<Text bold variant='h4'>
								Order ID
							</Text>
						</TableCell>
						<TableCell align="right">
							<Text bold variant='h4'>
								Creation date
							</Text>
						</TableCell>
						<TableCell align="right">
							<Text bold variant='h4'>
								Delivery date
							</Text>
						</TableCell>
						<TableCell align="right">
							<Text bold variant='h4'>
								Total
							</Text>
						</TableCell>
						<TableCell align="right">
							<Text bold variant='h4'>
								Actions
							</Text>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{selectedOrders.map((order: OrderDate) => {
						if (order) {
							return (
								<OrderTableRow
									key={order.id}
									order={order as OrderDate}
									onUpdateOrder={onAcceptOrder}
								/>
							);
						}
					})}
				</TableBody>
			</Table>
		</Card>
	);
}
