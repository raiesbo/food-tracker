import styles from './EventsCreateModal.module.scss';
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Text } from "@/components/Text";
import Button from "@mui/material/Button";
import { useReducer, useState } from "react";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useToast } from "@/utils";
import { ToastAction } from "@/components/ToastContext";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type EventState = {
	name: string,
	date: string,
	opening_hour: string,
	closing_hour: string,
	streetName: string,
	streetNumber: string,
	zip: string,
	country?: string,
	city?: string,
}

type Props = {
	isOpen: boolean,
	onClose: () => void,
	restaurants: Array<RestaurantWithEvents>
}

export default function EventsCreateModal({ isOpen, onClose, restaurants }: Props) {
	const { dispatch } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [restaurantId, setRestaurantId] = useState(restaurants?.at(0)?.id || 0);
	const [event, updateEvent] = useReducer((prev: EventState, next: Partial<EventState>) => {
		return { ...prev, ...next };
	}, {
		name: '',
		date: '',
		opening_hour: '',
		closing_hour: '',
		streetName: '',
		streetNumber: '',
		zip: '',
		city: '',
		country: ''
	});

	console.log({ restaurantId });

	const onCreateEvent = () => {
		setIsLoading(true);
		fetch(`/api/restaurants/${restaurantId}/events`, {
			method: 'POST',
			body: JSON.stringify(event)
		}).then(response => {
				if (response.ok) {
					dispatch({
						type: ToastAction.UPDATE_TOAST, payload: {
							message: 'Event successfully created',
							severity: 'success'
						}
					});
					onClose();
				} else {
					dispatch({
						type: ToastAction.UPDATE_TOAST, payload: {
							message: 'Error when creating the event',
							severity: 'error'
						}
					});
				}
			}
		).finally(() => setIsLoading(false));
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.root}>
				<Text bold variant='h5'>
					Create a new Event
				</Text>
				<LocalizationProvider dateAdapter={AdapterDayjs} className={styles.inputsContainer}>
					<FormControl fullWidth>
						<InputLabel>Food Truck</InputLabel>
						<Select
							value={restaurantId}
							label="Food Truck"
							onChange={e => setRestaurantId(Number(e?.target?.value))}
						>
							{restaurants.map(restaurant => (
								<MenuItem key={restaurant.id} value={restaurant.id}>
									{restaurant.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						label='Event Name'
						value={event.name}
						onChange={e => updateEvent({ name: e.target.value })}
					/>
					<div className={styles.inputRow}>
						<DatePicker
							label="Event Date"
							value={event.date}
							onChange={val => updateEvent({ date: val || '' })}
						/>
						<TimePicker
							label="Opening Hour"
							value={event.opening_hour}
							onChange={val => updateEvent({ opening_hour: val || '' })}
						/>
						<TimePicker
							label="Closing Hour"
							value={event.closing_hour}
							onChange={val => updateEvent({ closing_hour: val || '' })}
						/>

					</div>
					<TextField
						label='Street Name'
						value={event.streetName}
						onChange={e => updateEvent({ streetName: e.target.value })}
					/>
					<div className={styles.inputRow}>
						<TextField
							label='Street Number'
							value={event.streetNumber}
							onChange={e => updateEvent({ streetNumber: e.target.value })}
						/>
						<TextField
							label='Zip Code'
							value={event.zip}
							onChange={e => updateEvent({ zip: e.target.value })}
						/>
					</div>
					<div className={styles.inputRow}>
						<TextField
							label='City'
							value={event.city}
							onChange={e => updateEvent({ city: e.target.value })}
						/>
						<TextField
							label='Country'
							value={event.country}
							onChange={e => updateEvent({ country: e.target.value })}
						/>
					</div>
				</LocalizationProvider>
				<div className={styles.buttonsContainer}>
					<Button
						variant='outlined'
						color='error'
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						variant='contained'
						color='success'
						onClick={onCreateEvent}
						disabled={isLoading}
					>
						Create Event
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
