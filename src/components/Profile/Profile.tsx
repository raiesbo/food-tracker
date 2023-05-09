import styles from './Profile.module.scss';
import { PageHeader } from "@/components/PageHeader";
import Button from "@mui/material/Button";
import Image from "next/image";
import { imagesConfig } from "@/utils/settings";
import { InfoSection } from "@/components/InfoSection";
import { Text } from "@/components/Text";
import TextField from "@mui/material/TextField";
import { uploadImage, useToast } from "@/utils";
import { ChangeEvent, useState } from "react";
import { ToastAction } from "@/components/ToastContext";
import FileService from "@/services/file.service";
import { User } from "@prisma/client";
import { UserProfile } from "@auth0/nextjs-auth0/dist/client";
import Divider from "@mui/material/Divider";
import { paths } from "@/utils/paths";
import { useRouter } from "next/navigation";

type Props = {
	user: User,
	auth0User: UserProfile
}

export default function Profile({ user, auth0User }: Props) {
	const { dispatch } = useToast();
	const router = useRouter();

	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [firstName, setFirstName] = useState(user.firstName || '');
	const [lastName, setLastname] = useState(user.lastName || '');
	const [email, setEmail] = useState(user.email || '');
	const [phone, setPhone] = useState(user.phone || '');
	const [imageUrl, setImageUrl] = useState(user.imageUrl || '');

	const onRemove = () => {
		fetch(`/api/users/${user.id}`, {
			method: 'DELETE'
		}).then(response => {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: response.ok ? {
					message: 'User successfully removed',
					severity: 'success'
				} : {
					message: 'There has been a server error',
					severity: 'error'
				}
			});

			if (response.ok) setTimeout(() => {
				router.push(paths.home);
			}, 1000);
		});
	};

	const onCancel = () => {
		setFirstName(user.firstName || '');
		setLastname(user.lastName || '');
		setEmail(user.email || '');
		setPhone(user.phone || '');

		setIsUpdate(false);
	};

	const onSave = async () => {
		setIsLoading(true);

		fetch(`/api/users/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify({ firstName, lastName, email, phone })
		}).then(response => {
			if (response.ok) return;
			onCancel();
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: {
					message: 'There has been server error, please try again later.',
					severity: 'error'
				}
			});
		}).finally(() => {
			setIsLoading(false);
			setIsUpdate(false);
		});
	};

	const updateFile = async (event: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);

		const files = event.target.files;

		if (auth0User?.accessToken && files && user.id) {
			const file = files[0];
			const extension = file?.name?.split('.')?.at(-1)?.toLowerCase() as "png" | "jpg";
			const type = 'users';
			const { result, error } = await FileService().createFile({
				token: auth0User.accessToken as string,
				file,
				userId: user.id,
				type,
				format: extension,
				typeId: user.id
			});
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: error ? {
					message: 'Error while uploading the image',
					severity: 'error'
				} : {
					message: 'The image has been successfully uploaded',
					severity: 'success'
				}
			});

			if (result) {
				const newImageUrl = await uploadImage({ userId: user.id, type, typeId: user.id, extension });
				if (newImageUrl) setImageUrl(newImageUrl);
			}

			setIsLoading(false);
		}
	};

	return (
		<div className={styles.root}>
			<PageHeader
				title={'User Profile'}
				childrenClassName={styles.buttonContainer}
				className={styles.headerContainer}
			>
				{isUpdate ? (
					<>
						<Button
							variant="outlined"
							onClick={onCancel}
							color="error"
							disabled={isLoading}
						>
							CANCEL
						</Button>
						<Button
							variant="contained"
							color="success"
							onClick={onSave}
							disabled={isLoading}
						>
							SAVE
						</Button>
					</>
				) : (
					<Button
						variant="contained"
						onClick={() => setIsUpdate(true)}
						disabled={isLoading}
					>
						EDIT
					</Button>
				)}
			</PageHeader>
			<section className={styles.bodyContainer}>
				<InfoSection
					title='Personal Information'
					childrenClassName={styles.userInfo}
				>
					<div className={styles.topProfileInfo}>
						<div className={styles.imageContainer}>
							<label htmlFor={`users_${user.id}`} className={styles.imageUploadInput}>
								<Image
									alt='Users image'
									src={imageUrl || auth0User?.picture || imagesConfig.default}
									fill
									className={styles.image}
									style={{ objectFit: 'cover' }}
									sizes="(max-width: 600px) 100px,(max-width: 900px) 150px, 200px"
								/>
							</label>
							<input
								id={`users_${user.id}`}
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
								value={firstName}
								label=''
								onChange={(e) => setFirstName(e.target.value)}
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
								value={lastName}
								label=''
								onChange={(e) => setLastname(e.target.value)}
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
							value={email}
							label=''
							onChange={(e) => setEmail(e.target.value)}
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
							value={phone}
							label=''
							onChange={(e) => setPhone(e.target.value)}
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
							value={imageUrl}
							label=''
							onChange={(e) => setImageUrl(e.target.value)}
							fullWidth
							sx={{ mt: 1, backgroundColor: 'white' }}
							disabled={!isUpdate || isLoading}
							multiline={isUpdate}
						/>
					</div>
				</InfoSection>
				<Divider/>
				<div>
					<Button
						variant="outlined"
						onClick={onRemove}
						color='error'
					>
						REMOVE ACCOUNT
					</Button>
				</div>
			</section>
		</div>
	);
}
