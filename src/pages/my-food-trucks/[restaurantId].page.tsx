import { Card } from "@/components/Card";
import { InfoSection } from "@/components/InfoSection";
import { MyFoodTruckLocations, MyFoodTruckMenu, MyFoodTruckRestaurant } from "@/components/MyFoodTruckDetails";
import MyFoodTruckReviews from "@/components/MyFoodTruckDetails/MyFoodTruckReviews";
import { NavigationMenu } from "@/components/NavigationMenu";
import services from "@/services";
import { Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { Button } from "@mui/material";
import { Category, Location } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Text } from '../../components/Text';
import styles from './MyFoodTrucksDetails.module.scss';

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80';

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
    }

    return { props: { restaurant, categories } }
}

type Props = {
    restaurant: Restaurant,
    categories: Array<Category>
}

export default function MyNewRestaurant({ restaurant, categories }: Props) {
    const router = useRouter();

    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onRemove = () => {
        fetch(`/api/restaurants/${restaurant.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                return router.push(paths.myFoodTrucks)
            } else {
                alert('Server Error')
            }
        })
    }

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
                            disabled={isLoading}
                            color='error'
                        >
                            REMOVE
                        </Button>
                    </div>
                </header>
                <section>
                    <div className={styles.bodyContainer}>
                        <div className={styles.sectionContainer}>
                            <InfoSection title="Food Truck Thumbnail">
                                <Card className={styles.imageContainer}>
                                    <Image
                                        alt='Users image'
                                        src={restaurant.imageUrl || imagePlaceholder}
                                        fill
                                        className={styles.image}
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
                        <div className={styles.sectionContainer}>
                            <MyFoodTruckRestaurant
                                restaurant={restaurant}
                                categories={categories}
                            />
                            <MyFoodTruckMenu
                                menu={restaurant.menu}
                                restaurantid={restaurant.id}
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
