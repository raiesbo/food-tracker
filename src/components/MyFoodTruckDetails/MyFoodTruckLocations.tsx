import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Location } from "@prisma/client";
import { useReducer, useState } from "react";
import { InfoSection } from "../InfoSection";
import styles from './MyFoodTruckLocations.module.scss';
import { GeocodeUpdate } from "@/components/GeocodeUpdate";
import GeocodeLocation from "@/types/GeocodeLocation";
import geocodeService from "@/services/geocode.service";
import { useData } from "@/utils";

type Props = { location: Location }

export default function MyFoodTruckLocations({ location }: Props) {
	const { mutate } = useData(`/api/restaurants/${location.restaurantId}`, {});
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [openGeocode, setOpenGeocode] = useState(false);
	const [geocodeLocations, setGeocodeLocations] = useState<Array<GeocodeLocation>>([]);

	const [locationData, updateLocationData] = useReducer((previous: Partial<Location>, payload: Partial<Location>) => {
		return { ...previous, ...payload };
	}, {
		streetName: location.streetName || '',
		streetNumber: location.streetNumber || '',
		city: location.city || '',
		country: location.country || '',
		zip: location.zip || ''
	});

	const onCancel = () => {
		updateLocationData(location);
		setIsUpdate(false);
	};

	const onSave = async () => {
		setIsLoading(true);

		fetch(`/api/locations/${location.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				streetName: locationData.streetName,
				streetNumber: locationData.streetNumber,
				city: locationData.city,
				country: locationData.country,
				zip: locationData.zip
			})
		}).then(response => {
			if (!response.ok) {
				onCancel();
				alert('Server Error');
			}
		}).finally(() => {
			setIsLoading(false);
			setIsUpdate(false);
		});

		const { result: locations } = await geocodeService().getAddresses({
			streetName: locationData.streetName || '',
			streetNumber: locationData.streetNumber || '',
			city: locationData.city || ''
		});

		if (
			locations
			&& locations?.length > 0
			&& (location?.streetName !== locationData.streetName || location?.streetNumber !== locationData.streetNumber)
			&& locations.at(0)?.formattedAddress !== location?.formattedAddress
		) {
			setGeocodeLocations(locations);
			setOpenGeocode(true);
			mutate();
		}
	};

	return (
		<InfoSection title="Main Location">
			{!location?.id ? (
				"Unfortunately there are no existing locations"
			) : (
				<div className={styles.inputList}>
					<TextField
						disabled={!isUpdate || isLoading}
						value={locationData.streetName}
						label='Street Name'
						onChange={(e) => updateLocationData({ streetName: e.target.value })}
						fullWidth
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						disabled={!isUpdate || isLoading}
						value={locationData.streetNumber}
						label='Street Number'
						onChange={(e) => updateLocationData({ streetNumber: e.target.value })}
						fullWidth
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						disabled={!isUpdate || isLoading}
						value={locationData.city}
						label='City'
						onChange={(e) => updateLocationData({ city: e.target.value })}
						fullWidth
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						disabled={!isUpdate || isLoading}
						value={locationData.zip}
						label='Post Code'
						onChange={(e) => updateLocationData({ zip: e.target.value })}
						fullWidth
						sx={{ backgroundColor: 'white' }}
					/>
					<TextField
						disabled={!isUpdate || isLoading}
						value={locationData.country}
						label='Country'
						onChange={(e) => updateLocationData({ country: e.target.value })}
						fullWidth
						sx={{ backgroundColor: 'white' }}
					/>
					<div className={styles.buttonContainer}>
						{isUpdate ? (
							<>
								<Button variant="outlined" onClick={onCancel} color='error'>
									Cancel
								</Button>
								<Button variant="outlined" onClick={onSave} color='success'>
									Save
								</Button>
							</>
						) : (
							<Button variant="outlined" onClick={() => setIsUpdate(true)}>
								Update
							</Button>
						)}
					</div>
				</div>
			)}
			<GeocodeUpdate
				isOpen={openGeocode}
				onClose={() => setOpenGeocode(false)}
				geolocations={geocodeLocations}
				locationId={location.id || 0}
			/>
		</InfoSection>
	);
}
