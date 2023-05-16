import { Dialog } from "@mui/material";
import { Text } from "@/components/Text";
import GeocodeLocation from "@/types/GeocodeLocation";
import styles from './GeocodeUpdate.module.scss';

type Props = {
	isOpen: boolean,
	onClose: () => void,
	geolocations: Array<GeocodeLocation>,
	locationId: number
}
export default function GeocodeUpdate({ isOpen, onClose, geolocations, locationId }: Props) {
	const updateGeolocation = (locId: number) => {
		const location = geolocations.find(({ id }) => id === locId);
		fetch(`/api/locations/${locationId}`, {
			method: 'PUT',
			body: JSON.stringify({ ...location, id: locationId })
		}).finally(() => onClose());
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className={styles.root}>
				<header>
					<Text bold variant={{ small: 'h4', medium: 'h5' }}>Locations</Text>
					<Text variant={'smallest'}>Select the location that better fits your address.</Text>
				</header>
				<div className={styles.locationsContainer}>
					{geolocations.map(location => (
						<div
							className={styles.item}
							key={location.id}
							onClick={() => updateGeolocation(location.id)}
						>
							{location.formattedAddress}
						</div>
					))}
				</div>
			</div>
		</Dialog>
	);
}
