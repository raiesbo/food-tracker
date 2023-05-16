import styles from './Profile.module.scss';
import { PageHeader } from "@/components/PageHeader";
import Button from "@mui/material/Button";
import { imagesConfig } from "@/utils/settings";
import { uploadImage, useToast } from "@/utils";
import { ChangeEvent, useReducer, useState } from "react";
import { ToastAction } from "@/components/ToastContext";
import FileService from "@/services/file.service";
import { UserProfile } from "@auth0/nextjs-auth0/dist/client";
import Divider from "@mui/material/Divider";
import { paths } from "@/utils/paths";
import { useRouter } from "next/navigation";
import User from "@/types/User";
import ProfileLocation from "@/components/Profile/ProfileLocation";
import ProfileUserData from "@/components/Profile/ProfileUserData";
import geocodeService from "@/services/geocode.service";
import { GeocodeUpdate } from "@/components/GeocodeUpdate";
import GeocodeLocation from "@/types/GeocodeLocation";

type UserReducer = {
	user: Partial<User>,
	location: Partial<User['location']>
}

type Props = {
	user: User,
	auth0User: UserProfile
}

export default function Profile({ user, auth0User }: Props) {
	const { dispatch } = useToast();
	const router = useRouter();

	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [openGeocode, setOpenGeocode] = useState(false);
	const [geocodeLocations, setGeocodeLocations] = useState<Array<GeocodeLocation>>([]);
	const [userData, updateUserData] = useReducer((previous: UserReducer, payload: Partial<UserReducer>) => {
		return { user: { ...previous.user, ...payload.user }, location: { ...previous.location, ...payload.location } };
	}, {
		user: {
			firstName: user.firstName || '',
			lastName: user.lastName || '',
			email: user.email || '',
			phone: user.phone || '',
			imageUrl: user.imageUrl || ''
		}, location: {
			streetName: user.location?.streetName,
			streetNumber: user.location?.streetNumber,
			city: user.location?.city,
			country: user.location?.country,
			zip: user.location?.zip
		}
	});

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
		updateUserData({ user: {
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				phone: user.phone || '',
				imageUrl: user.imageUrl || auth0User?.picture || imagesConfig.default
			}, location: {
				streetName: user.location?.streetName,
				streetNumber: user.location?.streetNumber,
				city: user.location?.city,
				country: user.location?.country,
				zip: user.location?.zip
			} });

		setIsUpdate(false);
	};

	const onSave = async () => {
		setIsLoading(true);

		fetch(`/api/users/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				user: userData.user,
				location: { id: user.location?.id, ...userData.location }
			})
		}).then(response => {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: response.ok ? {
					message: 'Profile successfully updated.',
					severity: 'success'
				} : {
					message: 'There has been server error, please try again later.',
					severity: 'error'
				}
			});
			if (!response.ok) {
				onCancel();
				return;
			}
		}).finally(() => {
			setIsLoading(false);
			setIsUpdate(false);
		});

		const { result: locations } = await geocodeService().getAddresses({
			streetName: userData.location.streetName || '',
			streetNumber: userData.location.streetNumber || '',
			city: userData.location.city || ''
		});

		if (
			locations
			&& locations?.length > 0
			&& (user.location?.streetName !== userData.location.streetName || user.location?.streetNumber !== userData.location.streetNumber)
			&& locations.at(0)?.formattedAddress !== user.location?.formattedAddress
		) {
			setGeocodeLocations(locations);
			setOpenGeocode(true);
		}
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
				if (newImageUrl) updateUserData({ user: { imageUrl: newImageUrl } });
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
				<ProfileUserData
					userData={userData.user}
					updateUserData={updateUserData}
					isLoading={isLoading}
					isUpdate={isUpdate}
					updateFile={updateFile}
				/>
				<ProfileLocation
					location={userData.location}
					isLoading={isLoading}
					isUpdate={isUpdate}
					updateLocation={updateUserData}
				/>
			</section>
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
			<GeocodeUpdate
				isOpen={openGeocode}
				onClose={() => setOpenGeocode(false)}
				geolocations={geocodeLocations}
				locationId={user.location?.id || 0}
			/>
		</div>
	);
}
