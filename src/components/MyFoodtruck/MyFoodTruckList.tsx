import { Restaurant } from "@/types";
import { findMainLocation } from "@/utils";
import { paths } from "@/utils/paths";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card } from "../Card";
import { Text } from "../Text";
import styles from './MyFoodTruckList.module.scss';

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80';

type Props = {
    restaurants: Array<Restaurant>
}

export default function MyFoodTruckList({ restaurants }: Props) {
    const router = useRouter();

    const onCreateNewRestaurant = () => {
        fetch('/api/restaurants', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                console.log({ data })
                // router.push(`/api/restaurants/${data.id}`)
            })
    }
    return (
        <div className={styles.root}>
            {restaurants.map((restaurant: Restaurant) => {
                const mainLocation = findMainLocation(restaurant.locations);

                return (
                    <Card
                        key={restaurant.id}
                        className={styles.card}
                        withHover
                    >
                        <Link
                            href={`${paths.myFoodTrucks}/${restaurant.id}`}
                            className={styles.cardLink}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={imagePlaceholder}
                                    alt='Restaurant image'
                                    fill
                                    className={styles.backgroundImage}
                                />
                            </div>
                            <div className={styles.cardText}>
                                <Text variant={'h4'} bold className={styles.name}>
                                    {restaurant.name}
                                </Text>
                                <Text className={styles.description}>
                                    {`${mainLocation.streetName} ${mainLocation.streetNumber}, ${mainLocation.city}`}
                                </Text>
                            </div>
                        </Link>
                    </Card>
                )
            })}
            <Card
                withHover
                className={styles.cardLinkPlus}
            >
                <IconButton
                    className={styles.cardLinkPlus}
                    title='Create a new Restaurant'
                    onClick={onCreateNewRestaurant}
                >
                    <AddIcon />
                </IconButton>
            </Card>
        </div>
    )
}