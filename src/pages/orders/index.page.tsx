import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./Orders.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import ordersService from "@/services/orders.service";
import PrismaDBClient from "@/repositories/prismaClient";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import { Card } from "@/components/Card";
import OrderWithItems from "@/types/OrderWithItems";
import { Text } from "@/components/Text";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Chip from "@mui/material/Chip";
import { formatDate } from "@/utils";
import { ReactElement } from "react";

const ordersServiceInstance = ordersService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);
	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const { result: orders } = await ordersServiceInstance.getOrdersByUser(userId);

	return { props: { orders } };
};

OrdersPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	orders: Array<OrderWithItems>
}

export default function OrdersPage({ orders }: Props) {

	return (
		<div className={styles.root}>
			<PageHeader title={'My Orders'}></PageHeader>
			{orders && orders.length > 0 ? (
				orders.map(order => {
					const totalPrice = order.items?.reduce((acc: number, item) => {
						return acc + item.units * (item.dish?.price || 1);
					}, 0) || 0;

					return (
						<Card key={order.id} className={styles.card}>
							<header className={styles.cardHeader}>
								<div>
									<Text bold variant='h5'>
										{order.restaurant?.name}
									</Text>
									<Text as='p'>
										<Text as='span' variant={'small'}>
											Creation:
										</Text>
										{' '}
										<Text semiBold as='span' variant={'small'} className={styles.date}>
											{formatDate(order.createdAt)}
										</Text>
									</Text>
									<Text as='p'>
										<Text as='span' variant={'small'}>
											Pick Up:
										</Text>
										{' '}
										<Text semiBold as='span' variant={'small'} className={styles.date}>
											{formatDate(order?.deliveryAt || '')}
										</Text>
									</Text>
								</div>
								<Chip
									label={order.isAccepted ? 'ACCEPTED' : 'PENDING'}
									color={order.isAccepted ? 'success' : 'info'}
								/>
							</header>
							<div>
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
										{order.items?.map((item) => {
											return item && (
												<TableRow
													key={item.id}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												>
													<TableCell component="th" scope="row" sx={{ padding: 1 }}>
														{item.dish?.name}
													</TableCell>
													<TableCell align="center" sx={{ padding: 1 }}>
														{item.units}
													</TableCell>
													<TableCell align="center" sx={{ padding: 1 }}>
														{(item.dish?.price || 1)}
													</TableCell>
													<TableCell align="center" sx={{ padding: 1 }}>
														{`${((item.dish?.price || 1) * item.units).toFixed(2)}€`}
													</TableCell>
												</TableRow>
											);
										})}
										<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
											<TableCell component="th" scope="row" sx={{ padding: 1 }}>
											</TableCell>
											<TableCell align="center" sx={{ padding: 1 }}></TableCell>
											<TableCell align="center" sx={{ padding: 1 }}></TableCell>
											<TableCell align="center" sx={{
												padding: 1,
												fontWeight: "bold"
											}}>{`${totalPrice.toFixed(2)}€`}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</Card>
					);
				})
			) : (
				<Text>
					No orders found
				</Text>
			)}
		</div>
	);
}
