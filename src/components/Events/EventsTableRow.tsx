import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "./EventsTableRow.module.scss";
import { formatDate } from "@/utils";
import { Event } from '@prisma/client';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
	event: Event
}

export default function EventsTableRow({ event }: Props) {
	return (
		<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
			<TableCell component="th" scope="row" align="left">
				{event?.name}
			</TableCell>
			<TableCell>
				{formatDate(new Date(event.date || ''))}
			</TableCell>
			<TableCell>
				{event?.opening_hour || ''}
			</TableCell>
			<TableCell>
				{event?.closing_hour || ''}
			</TableCell>
			<TableCell>
				Location
			</TableCell>
			<TableCell align="right" className={styles.buttonContainer}>
				<IconButton size='small'>
					<EditIcon/>
				</IconButton>
				<IconButton size='small'>
					<DeleteIcon/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
