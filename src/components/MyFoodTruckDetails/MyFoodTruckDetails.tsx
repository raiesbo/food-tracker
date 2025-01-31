import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { uploadImage, useData, useToast } from "@/utils";
import { ChangeEvent, useState } from "react";
import { auth0Config, imagesConfig } from "@/utils/settings";
import { ToastAction } from "@/components/ToastContext";
import { paths } from "@/utils/paths";
import FileService from "@/services/file.service";
import styles from './MyFoodTruckDetails.module.scss';
import { PageHeader } from "@/components/PageHeader";
import Button from "@mui/material/Button";
import cc from "classcat";
import { InfoSection } from "@/components/InfoSection";
import { Card } from "@/components/Card";
import Image from "next/image";
import { MyFoodTruckLocations, MyFoodTruckMenu, MyFoodTruckRestaurant } from "@/components/MyFoodTruckDetails/index";
import { Category, Restaurant } from "@/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";
import Divider from "@mui/material/Divider";
import MyFoodTruckHours from "@/components/MyFoodTruckDetails/MyFoodTruckHours";

type Props = {
	restaurant: Restaurant,
	categories: Array<Category>
}
export default function MyFoodTruckDetails({ restaurant, categories }: Props) {
	const router = useRouter();
	const { user } = useUser();
	const { dispatch } = useToast();

	const { mutate } = useData(`/api/restaurants/${restaurant.id}`, {});

	const [imageUrl, setImageUrl] = useState(restaurant.imageUrl);

	const userMetadata = user && user?.[auth0Config.metadata] as { user_id: string };

	const onRemove = () => {
		fetch(`/api/restaurants/${restaurant.id}`, {
			method: 'DELETE'
		}).then(response => {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: response.ok ? {
					message: 'Restaurant successfully removed',
					severity: 'success'
				} : {
					message: 'There has been a server error',
					severity: 'error'
				}
			});

			if (response.ok) setTimeout(() => {
				router.push(paths.myFoodTrucks);
			}, 1000);
		});
	};

	const updateFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;

		if (user?.accessToken && files && userMetadata?.user_id) {
			const file = files[0];
			const type = 'restaurants';

			const { result, error } = await FileService().createFile({
				token: user.accessToken as string,
				file,
				userId: userMetadata.user_id,
				type,
				typeId: restaurant.id
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
				const newImageUrl = await uploadImage({
					fileNamePath: result.path, type, typeId: restaurant.id
				});
				if (newImageUrl) setImageUrl(newImageUrl);
			}
		}
	};

	const onToggleFoodTruckVisibility = (event: ChangeEvent<HTMLInputElement>) => {
		if (
			event.target.checked &&
			(!restaurant.location?.streetName || !restaurant.location?.streetNumber)
		) {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: {
					message: 'The location data needs to be completed',
					severity: 'error'
				}
			});
			return;
		}
		fetch(`/api/restaurants/${restaurant.id}`, {
			method: 'PUT',
			body: JSON.stringify({ isVisible: event.target.checked || false })
		}).then(response => {
			if (response.ok) mutate();
		});
	};

	return (
		<div className={styles.root}>
			<PageHeader title={restaurant.name || ''} childrenClassName={styles.buttonContainer}>
				<FormControlLabel
					control={<Switch
						checked={restaurant.isVisible}
						onChange={onToggleFoodTruckVisibility}
					/>}
					label={"Make Food Truck Visible"}
				/>
			</PageHeader>
			<section className={styles.bodyContainer}>
				<div className={cc([styles.container, styles.sideColumn])}>
					<InfoSection title="Food Truck Thumbnail">
						<Card className={styles.imageContainer} withHover>
							<label htmlFor={`restaurant_${restaurant.id}`} className={styles.imageUploadInput}>
								<Image
									alt='Business image | default image from Unsplash'
									src={imageUrl || imagesConfig.default}
									fill
									className={styles.image}
									style={{ objectFit: 'cover' }}
									priority
									sizes="(max-width: 900px) 100vw, 300px"
								/>
							</label>
							<input
								id={`restaurant_${restaurant.id}`}
								type='file'
								accept="image/jpg,image/png"
								onChange={updateFile}
							/>
						</Card>
					</InfoSection>
					<MyFoodTruckLocations location={restaurant.location}/>
					<MyFoodTruckHours
						schedules={restaurant.schedules}
						restaurantId={restaurant.id}
					/>
				</div>
				<div className={cc([styles.container, styles.mainColumn])}>
					<MyFoodTruckRestaurant
						restaurant={restaurant}
						allCategories={categories}
					/>
					<MyFoodTruckMenu
						menu={restaurant.menu}
						restaurantId={restaurant.id}
					/>
				</div>
			</section>
			<Divider/>
			<div>
				<Button
					variant="outlined"
					onClick={onRemove}
					color='error'
				>
					REMOVE FOOD TRUCK
				</Button>
			</div>
		</div>
	);
}
