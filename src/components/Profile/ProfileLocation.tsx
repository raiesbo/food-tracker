import styles from './ProfileLocation.module.scss';
import User from "@/types/User";
import { InfoSection } from "@/components/InfoSection";
import { Text } from "@/components/Text";
import TextField from "@mui/material/TextField";

type Props = {
	isUpdate?: boolean,
	isLoading?: boolean,
	location: Partial<User['location']>,
	updateLocation: (e: { location: Partial<User['location']> }) => void
}
export default function ProfileLocation({ location, updateLocation, isUpdate, isLoading }: Props) {

	return (
		<InfoSection
			title='Location'
			className={styles.root}
			childrenClassName={styles.userLocation}
		>
			<div className={styles.name}>
				<Text variant={'h4'} bold as='label'>
					Street Name
					<TextField
						value={location?.streetName}
						onChange={(e) => updateLocation({ location: { streetName: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</Text>
			</div>
			<div className={styles.name}>
				<Text variant={'h4'} bold as='label'>
					Street Number
					<TextField
						value={location?.streetNumber}
						onChange={(e) => updateLocation({ location: { streetNumber: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</Text>
			</div>
			<div className={styles.name}>
				<Text variant={'h4'} bold as='label'>
					Zip Code
					<TextField
						value={location?.zip}
						onChange={(e) => updateLocation({ location: { zip: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</Text>
			</div>
			<div className={styles.name}>
				<Text variant={'h4'} bold as='label'>
					City
					<TextField
						value={location?.city}
						onChange={(e) => updateLocation({ location: { city: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</Text>
			</div>
			<div className={styles.name}>
				<Text variant={'h4'} bold as='label'>
					Country
					<TextField
						value={location?.country}
						onChange={(e) => updateLocation({ location: { country: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</Text>
			</div>
		</InfoSection>
	);
}
