import { Card } from "@/components/Card";
import { InfoSection } from "@/components/InfoSection";
import { MyFoodTruckLocations, MyFoodTruckMenu, MyFoodTruckRestaurant } from "@/components/MyFoodTruckDetails";
import MyFoodTruckReviews from "@/components/MyFoodTruckDetails/MyFoodTruckReviews";
import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import FileService from "@/services/file.service";
import { Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { auth0Config, imagesConfig, supagaseConfig } from "@/utils/settings";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@mui/material";
import { Category, Location } from "@prisma/client";
import cc from 'classcat';
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Text } from '../../components/Text';
import styles from './MyFoodTrucksDetails.module.scss';

const { restaurantService, categoriesService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.query;

    const {
        result: restaurant,
        error
    } = await restaurantService.getRestaurant({ query: { restaurantId } } as unknown as NextApiRequest);

    const {
        result: categories,
        error: categoryError
    } = await categoriesService.getAllCategories();

    if (error || categoryError) return {
        redirect: {
            permanent: true,
            destination: paths.myFoodTrucks
        }
    };

    return { props: { restaurant, categories } };
}

type Props = {
    restaurant: Restaurant,
    categories: Array<Category>
}

export default function MyNewRestaurant({ restaurant, categories }: Props) {
    const router = useRouter();
    const { user } = useUser();

    const [ imageUrl, setImageUrl ] = useState(restaurant.imageUrl);

    const userMetadata = user && user?.[auth0Config.metadata] as { user_id: string };

    const onRemove = () => {
        fetch(`/api/restaurants/${restaurant.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                return router.push(paths.myFoodTrucks);
            } else {
                alert('Server Error');
            }
        });
    };

    const updateFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (user?.accessToken && files && userMetadata?.user_id) {
            const file = files[0];
            const fileExtension = file?.name?.split('.')?.at(-1)?.toLowerCase() as "png" | "jpg";

            const { result, error } = await FileService().createFile({
                token: user.accessToken as string,
                file,
                userId: userMetadata.user_id,
                type: 'restaurant',
                format: fileExtension,
                typeId: restaurant.id
            });

            if (result) {
                const newImageUrl = `${supagaseConfig.url}/storage/v1/object/public/food-truck/${userMetadata?.user_id}/restaurant_${restaurant.id}.${fileExtension}`;
                await fetch(`/api/restaurants/${restaurant.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ imageUrl: newImageUrl })
                }).then(response => {
                    if (response.ok) setImageUrl(newImageUrl);
                });
            }
        }
    };

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <header className={styles.pageHeader}>
                    <Text as='h1' variant='h1' bold>
                        {restaurant.name}
                    </Text>
                    <div className={styles.buttonContainer}>
                        <Button
                            variant="outlined"
                            onClick={onRemove}
                            color='error'
                        >
                            REMOVE
                        </Button>
                    </div>
                </header>
                <section className={styles.bodyContainer}>
                    <div className={cc([ styles.container, styles.sideColumn ])}>
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
                        <MyFoodTruckReviews
                            reviews={restaurant.reviews}
                            currentUserId={restaurant.userId}
                        />
                    </div>
                    <div className={cc([ styles.container, styles.mainColumn ])}>
                        <MyFoodTruckRestaurant
                            restaurant={restaurant}
                            allCategories={categories}
                        />
                        <MyFoodTruckMenu
                            menu={restaurant.menu}
                            restaurantid={restaurant.id}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
