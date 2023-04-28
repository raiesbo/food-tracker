import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Order } from ".prisma/client";
import { useState } from "react";
import { Collapse, Typography, IconButton, TableHead, Box, Table, TableBody } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { OrderItem } from "@prisma/client";

type Props = {
	order: Partial<Order> & {items: Array<OrderItem>}
}

export default function OrderTableRow({ order }: Props) {
	const [open, setOpen] = useState(false);

	console.log({ order });

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{order.id}
				</TableCell>
				{/*<TableCell align="right">{order?.createdAt?.getFullYear()}</TableCell>*/}
				<TableCell align="right">{order?.isAccepted}</TableCell>
				{/*<TableCell align="right">{row.carbs}</TableCell>*/}
				{/*<TableCell align="right">{row.protein}</TableCell>*/}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align="right">Amount</TableCell>
										<TableCell align="right">Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{order?.items?.map((orderItem) => (
										<TableRow key={orderItem.id}>
											<TableCell component="th" scope="row">
												{orderItem.id}
											</TableCell>
											<TableCell>{orderItem.units}</TableCell>
											<TableCell align="right">{orderItem.id}</TableCell>
											<TableCell align="right">
												{/*{Math.round(historyRow.amount * row.price * 100) / 100}*/}
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
