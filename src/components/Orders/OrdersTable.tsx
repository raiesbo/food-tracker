import RestaurantWithOrders from "@/types/RestaurantWithOrders";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import OrderTableRow from "@/components/Orders/OrdersTableRow";
import { Card } from "@/components/Card";
import styles from './OrdersTable.module.scss';
import { Order } from ".prisma/client";
import { OrderItem } from "@prisma/client";

type Props = {
	restaurant: RestaurantWithOrders
}

export default function OrderTable({ restaurant }: Props) {

	return (
		<Card className={styles.root}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell/>
						<TableCell>Dish Name</TableCell>
						<TableCell align="right">Creation date</TableCell>
						<TableCell align="right">Delivery date</TableCell>
						<TableCell align="right">Total</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurant?.orders?.map(order=> {
						if (order) {
							return (
								<OrderTableRow
									key={order.id}
									order={order as unknown as Partial<Order> & {items: Array<OrderItem>}}
								/>
							);
						}
					})}
				</TableBody>
			</Table>
		</Card>
	);
}
