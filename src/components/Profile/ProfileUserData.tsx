import styles from "./ProfileUserData.module.scss";
import Image from "next/image";
import { Text } from "@/components/Text";
import TextField from "@mui/material/TextField";
import { InfoSection } from "@/components/InfoSection";
import User from "@/types/User";
import { ChangeEvent } from "react";

type Props = {
	userData: Partial<User>
	updateUserData: (e: {user: Partial<User>}) => void
	updateFile: (e: ChangeEvent<HTMLInputElement>) => void
	isLoading: boolean
	isUpdate: boolean
}

export default function ProfileUserData({ userData, updateUserData, isLoading, isUpdate, updateFile }: Props) {
	return (
		<InfoSection
			title='Personal Information'
			childrenClassName={styles.root}
		>
			<div className={styles.topProfileInfo}>
				<div className={styles.imageContainer}>
					<label htmlFor={`users_${userData.id}`} className={styles.imageUploadInput}>
						<Image
							alt='Users image'
							src={userData.imageUrl || ''}
							fill
							className={styles.image}
							style={{ objectFit: 'cover' }}
							sizes="(max-width: 600px) 100px,(max-width: 900px) 150px, 200px"
							priority
						/>
					</label>
					<input
						id={`users_${userData.id}`}
						type='file'
						accept="image/jpg,image/png"
						onChange={updateFile}
					/>
				</div>
				<div className={styles.name}>
					<Text variant={'h4'} bold>
						First Name
					</Text>
					<TextField
						value={userData.firstName}
						onChange={(e) => updateUserData({ user: { firstName: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</div>
				<div className={styles.last}>
					<Text variant={'h4'} bold>
						Last Name
					</Text>
					<TextField
						value={userData.lastName}
						onChange={(e) => updateUserData({ user: { lastName: e.target.value } })}
						fullWidth
						sx={{ mt: 1, backgroundColor: 'white' }}
						disabled={!isUpdate || isLoading}
					/>
				</div>
			</div>
			<div>
				<Text variant={'h4'} bold>
					Email
				</Text>
				<TextField
					value={userData.email}
					onChange={(e) => updateUserData({ user: { email: e.target.value } })}
					fullWidth
					sx={{ mt: 1, backgroundColor: 'white' }}
					disabled={!isUpdate || isLoading}
				/>
			</div>
			<div>
				<Text variant={'h4'} bold>
					Phone Number
				</Text>
				<TextField
					value={userData.phone}
					onChange={(e) => updateUserData({ user: { phone: e.target.value } })}
					fullWidth
					sx={{ mt: 1, backgroundColor: 'white' }}
					disabled={!isUpdate || isLoading}
				/>
			</div>
			<div>
				<Text variant={'h4'} bold>
					Profile Picture URL
				</Text>
				<TextField
					value={userData.imageUrl}
					onChange={(e) => updateUserData({ user: { imageUrl: e.target.value } })}
					fullWidth
					sx={{ mt: 1, backgroundColor: 'white' }}
					disabled={!isUpdate || isLoading}
					multiline={isUpdate}
				/>
			</div>
		</InfoSection>
	);
}
