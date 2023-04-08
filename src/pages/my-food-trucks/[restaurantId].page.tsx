import { Card } from "@/components/Card";
import { InfoSection } from "@/components/InfoSection";
import { NavigationMenu } from "@/components/NavigationMenu";
import { ProfileReviews } from "@/components/Profile";
import services from "@/services";
import { Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { Button, TextField } from "@mui/material";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Image from "next/image";
import { useState } from "react";
import { Text } from '../../components/Text';
import styles from './MyFoodTrucksDetails.module.scss';

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80';

const { restaurantService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { restaurantId } = context.query;

    const {
        result: restaurant,
        error
    } = await restaurantService.getRestaurant({ query: { restaurantId } } as unknown as NextApiRequest)

    if (error) return {
        redirect: {
            permanent: true,
            destination: paths.myFoodTrucks
        }
    }

    return { props: { restaurant } }
}

type Props = {
    restaurant: Restaurant
}

export default function MyNewRestaurant({ restaurant }: Props) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState(restaurant.name || '');
    const [slogan, setSlogan] = useState(restaurant.slogan || '');
    const [description, setDescription] = useState(restaurant.description || '');
    const [cashOnly, setCashOnly] = useState(restaurant.isCashOnly || false);

    const onCancel = () => {
        setName(restaurant.name || '');
        setSlogan(restaurant.slogan || '');
        setDescription(restaurant.description || '');
        setCashOnly(restaurant.isCashOnly || false);

        setIsUpdate(false);
    }

    const onSave = () => {
        // setIsLoading(true);

        // fetch(`/api/users/${user.id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify({ firstName, lastName, email, phone })
        // }).then(response => {
        //     if (response.ok) return;
        //     onCancel();
        //     alert('There has been server error, please try again later.');
        // }).finally(() => {
        //     setIsLoading(false);
        //     setIsUpdate(false);
        // })
    }

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <header className={styles.pageHeader}>
                    <Text as='h1' variant='h1' bold>
                        {name}
                    </Text>
                    <div className={styles.buttonContainer}>
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
                    </div>
                </header>
                <section>
                    <div className={styles.bodyContainer}>
                        <div className={styles.restaurantInfo}>
                            <InfoSection title="Food Truck Thumbnail">
                                <Card className={styles.imageContainer}>
                                    <Image
                                        alt='Users image'
                                        src={imagePlaceholder}
                                        fill
                                        className={styles.image}
                                    />
                                </Card>
                            </InfoSection>
                            <InfoSection title="Received Reviews">
                                'hi'
                            </InfoSection>
                            <ProfileReviews
                                reviews={restaurant.reviews}
                            />
                        </div>
                        <div className={styles.restaurantInfo}>
                            <InfoSection title="Food Truck Information">
                                <div>
                                    <Text variant={'h4'} bold>
                                        First Name
                                    </Text>
                                    {isUpdate ? (
                                        <TextField
                                            value={name}
                                            label=''
                                            onChange={(e) => setName(e.target.value)}
                                            fullWidth
                                            sx={{ mt: 1, backgroundColor: 'white' }}
                                        />
                                    ) : (
                                        <Text variant={'h2'} thin>
                                            {name}
                                        </Text>
                                    )}
                                </div>
                                <div>
                                    <Text variant={'h4'} bold>
                                        Food Truck Slogan
                                    </Text>
                                    {isUpdate ? (
                                        <TextField
                                            value={slogan}
                                            label=''
                                            onChange={(e) => setSlogan(e.target.value)}
                                            fullWidth
                                            sx={{ mt: 1, backgroundColor: 'white' }}
                                        />
                                    ) : (
                                        <Text variant={'h2'} thin>
                                            {slogan}
                                        </Text>
                                    )}
                                </div>
                                <div>
                                    <Text variant={'h4'} bold>
                                        Description
                                    </Text>
                                    {isUpdate ? (
                                        <TextField
                                            value={description}
                                            label=''
                                            multiline
                                            onChange={(e) => setDescription(e.target.value)}
                                            fullWidth
                                            sx={{ mt: 1, backgroundColor: 'white' }}
                                        />
                                    ) : (
                                        <Text variant={'h2'} thin>
                                            {description}
                                        </Text>
                                    )}
                                </div>
                            </InfoSection>
                            <InfoSection title="Menu">
                                {restaurant.menu.map(dish => {
                                    return (
                                        <div key={dish.id}>{dish.name}</div>
                                    )
                                })}
                            </InfoSection>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
