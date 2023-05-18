import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "./EventsTableRow.module.scss";
import { useToast } from "@/utils";
import formatDate from "@/utils/formatDate";
import formatTime from "@/utils/formatTime";
import { Event, Location } from '@prisma/client';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { ToastAction } from "@/components/ToastContext";
import { useSWRConfig } from "swr";

type Props = {
	event: Partial<Event & {location: Location}>,
	url: string
}

export default function EventsTableRow({ event, url }: Props) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { dispatch } = useToast();
	const { mutate } = useSWRConfig();

	const onToggleUpdate = () => {
		setIsUpdate(!isUpdate);
	};

	const onDelete = () => {
		setIsLoading(true);
		fetch(`/api/events/${event.id}`, {
			method: 'DELETE'
		}).then(response => {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: response.ok ? {
					message: 'Event successfully deleted',
					severity: 'success'
				} : {
					message: 'Sever Error. Unable to delete the event.',
					severity: 'error'
				}
			});
		}).finally(() => {
			setIsLoading(false);
			mutate(url);
		});
	};

	return (
		<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
			<TableCell component="th" scope="row" align="left">
				{event?.name}
			</TableCell>
			<TableCell align='center' sx={{ textTransform: 'capitalize' }}>
				{formatDate(new Date(event.date || ''))}
			</TableCell>
			<TableCell align='center'>
				{event?.opening_hour
					? formatTime((new Date(event.opening_hour)).getTime())
					: ''}
			</TableCell>
			<TableCell align='center'>
				{event?.closing_hour
					? formatTime((new Date(event.closing_hour)).getTime())
					: ''}
			</TableCell>
			<TableCell align='center'>
				{`${event.location?.streetName} ${event.location?.streetNumber} ${event.location?.city || ''} ${event.location?.country || ''}`}
			</TableCell>
			<TableCell align="right" className={styles.buttonContainer}>
				<IconButton
					size='small'
					aria-label='delete event'
					disabled={isLoading}
					onClick={onDelete}
				>
					<DeleteIcon/>
				</IconButton>
				{isUpdate ? (
					<>
						<IconButton
							size='small'
							onClick={onToggleUpdate}
							aria-label='cancel udpate'
							disabled={isLoading}
						>
							<CancelIcon color='error'/>
						</IconButton>
						<IconButton
							size='small'
							aria-label='save udpate'
							disabled={isLoading}
						>
							<SaveIcon color='success'/>
						</IconButton>
					</>
				) : (
					<IconButton
						size='small'
						onClick={onToggleUpdate}
						aria-label='edit event'
						disabled={isLoading}
					>
						<EditIcon/>
					</IconButton>
				)}
			</TableCell>
		</TableRow>
	);
}
