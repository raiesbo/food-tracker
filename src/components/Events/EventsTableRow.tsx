import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "@/components/Orders/OrdersTableRow.module.scss";
import { formatDate } from "@/utils";
import Button from "@mui/material/Button";
import { Event } from '@prisma/client';

type Props = {
	event: Event
}

export default function EventsTableRow({ event }: Props) {
	return (
		<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
			<TableCell component="th" scope="row">
				{event?.name}
			</TableCell>
			<TableCell align="right" className={styles.date}>
				{formatDate(new Date(event.date || ''))}
				{/*{event?.date || ''}*/}
			</TableCell>
			<TableCell align="right" className={styles.date}>
				{event?.opening_hour || ''}
			</TableCell>
			<TableCell align="right" className={styles.date}>
				{event?.closing_hour || ''}
			</TableCell>
			<TableCell align="right">
				Location
			</TableCell>
			<TableCell align="right">
				<Button>
					Edit
				</Button>
				<Button>
					Remove
				</Button>
			</TableCell>
		</TableRow>
	);
}
