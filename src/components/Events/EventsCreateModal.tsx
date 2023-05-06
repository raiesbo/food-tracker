import styles from './EventsCreateModal.module.scss';
import { Dialog } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Text } from "@/components/Text";
import Button from "@mui/material/Button";
import { useState } from "react";
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Props = {
	isOpen: boolean,
	onClose: () => void,
	restaurants: Array<RestaurantWithEvents>
}

export default function EventsCreateModal({ isOpen, onClose, restaurants }: Props) {
	const [name, setName] = useState('');
	const [restaurantId, setRestaurantId] = useState(restaurants?.at(0)?.id);

	const onCreateEvent = () => {
		fetch(`/api/restaurants/${restaurantId}/events`, {
			method: 'POST',
			body: JSON.stringify({})
		});
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.root}>
				<Text bold variant='h5'>
					Create a new Event
				</Text>
				<div className={styles.inputsContainer}>
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
					<TextField label='Event Name' value={name}/>
					<TextField value={''}/>
					<TextField value={''}/>
					<TextField value={''}/>
					<TextField value={''}/>
					<TextField value={''}/>
				</div>
				<div className={styles.buttonsContainer}>
					<Button variant='outlined' color='error' onClick={onClose}>
						Cancel
					</Button>
					<Button variant='contained' color='success'>
						Create Event
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
