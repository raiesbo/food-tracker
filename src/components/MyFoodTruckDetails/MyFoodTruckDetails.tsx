import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { uploadImage, useToast } from "@/utils";
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
import { Location } from "@prisma/client";
import { Text } from "@/components/Text";
import { Category, Restaurant } from "@/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch } from "@mui/material";
import Divider from "@mui/material/Divider";

type Props = {
	restaurant: Restaurant,
	categories: Array<Category>
}
export default function MyFoodTruckDetails({ restaurant, categories }: Props) {
	const router = useRouter();
	const { user } = useUser();
	const { dispatch } = useToast();

	const [imageUrl, setImageUrl] = useState(restaurant.imageUrl);
	const [isVisible, setIsVisible] = useState(restaurant.isVisible);

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
			const extension = file?.name?.split('.')?.at(-1)?.toLowerCase() as "png" | "jpg";
			const type = 'restaurants';

			const { result, error } = await FileService().createFile({
				token: user.accessToken as string,
				file,
				userId: userMetadata.user_id,
				type,
				format: extension,
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
					userId: userMetadata.user_id,
					type,
					typeId: restaurant.id,
					extension
				});
				if (newImageUrl) setImageUrl(newImageUrl);
			}
		}
	};

	const onToggleFoodTruckVisibility = (event: ChangeEvent<HTMLInputElement>) => {
		fetch(`/api/restaurants/${restaurant.id}`, {
			method: 'PUT',
			body: JSON.stringify({ isVisible: event.target.checked || false })
		}).then(response => {
			if (response.ok) setIsVisible(!event.target.checked);
		});
	};

	return (
		<div className={styles.root}>
			<PageHeader title={restaurant.name || ''} childrenClassName={styles.buttonContainer}>
				<FormControlLabel
					control={<Switch
						checked={isVisible}
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
					<MyFoodTruckLocations
						location={restaurant.locations.find(loc => loc.isMainLocation) || {} as Location}
					/>
					<Card className={styles.scheduleList}>
						<InfoSection title="Opening Hours" childrenClassName={styles.item}>
							{restaurant.schedules?.map((schedule) => (
								<div key={schedule.id} className={styles.scheduleListItem}>
									<Text bold variant={'smallest'}>
										{schedule.day}
									</Text>
									{schedule.isOpen ? (
										<Text variant={'smallest'}>
											{`${schedule.opening_hour} ${schedule.closing_hour}`}
										</Text>
									) : (
										<Text variant={'smallest'}>
											Closed
										</Text>
									)}
								</div>
							))}
						</InfoSection>
					</Card>
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
