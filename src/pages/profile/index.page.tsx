import { InfoSection } from "@/components/InfoSection";
import { NavigationMenu } from "@/components/NavigationMenu";
import { ProfileReviews } from "@/components/Profile";
import { Text } from "@/components/Text";
import services from "@/services";
import { Review } from "@/types";
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Button, TextField } from "@mui/material";
import { User } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import Image from "next/image";
import { useState } from "react";
import styles from './profile.module.scss';

const { userService, reviewsService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context.req, context.res);

    if (!session?.user) return {
        redirect: {
            permanent: true,
            destination: '/'
        },
    }

    const userId = session.user[auth0Config.metadata]?.user_id

    const {
        result: user,
        error
    } = await userService.getUser(userId);

    const {
        result: reviews,
        error: reviewsError
    } = await reviewsService.getAllReviewsByUserId({ query: { userId } } as unknown as NextApiRequest);

    if (error || reviewsError) return {
        redirect: {
            permanent: true,
            destination: '/'
        },
    }

    return {
        props: {
            user,
            reviews,
            auth0User: session.user
        }
    }
}

type Props = {
    user: User,
    reviews: Array<Review>,
    auth0User: UserProfile
}

export default function Profile({ user, auth0User, reviews }: Props) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastname] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');

    const onCancel = () => {
        setFirstName(user.firstName || '');
        setLastname(user.lastName || '');
        setEmail(user.email || '');
        setPhone(user.phone || '');

        setIsUpdate(false);
    }

    const onSave = async () => {
        setIsLoading(true);

        fetch(`/api/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({ firstName, lastName, email, phone })
        }).then(response => {
            if (response.ok) return;
            onCancel();
            alert('There has been server error, please try again later.');
        }).finally(() => {
            setIsLoading(false);
            setIsUpdate(false);
        })
    }

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <header className={styles.pageHeader}>
                    <Text as='h1' variant='h1' bold>
                        User Porfile
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
                <section className={styles.bodyContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            alt='Users image'
                            src={auth0User?.picture || ""}
                            fill
                            className={styles.image}
                        />
                    </div>
                    <InfoSection
                        title='Personal Information'
                        childrenClassName={styles.userInfo}
                    >
                        <div>
                            <Text variant={'h4'} bold>
                                First Name
                            </Text>
                            {isUpdate ? (
                                <TextField
                                    value={firstName}
                                    label=''
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 1, backgroundColor: 'white' }}
                                />
                            ) : (
                                <Text variant={'h2'} thin>
                                    {firstName}
                                </Text>
                            )}
                        </div>
                        <div>
                            <Text variant={'h4'} bold>
                                Last Name
                            </Text>
                            {isUpdate ? (
                                <TextField
                                    value={lastName}
                                    label=''
                                    onChange={(e) => setLastname(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 1, backgroundColor: 'white' }}
                                />
                            ) : (
                                <Text variant={'h2'} thin>
                                    {lastName}
                                </Text>
                            )}
                        </div>
                        <div>
                            <Text variant={'h4'} bold>
                                Email
                            </Text>
                            {isUpdate ? (
                                <TextField
                                    value={email}
                                    label=''
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 1, backgroundColor: 'white' }}
                                />
                            ) : (
                                <Text variant={'h2'} thin>
                                    {email}
                                </Text>
                            )}
                        </div>
                        <div>
                            <Text variant={'h4'} bold>
                                Phone Number
                            </Text>
                            {isUpdate ? (
                                <TextField
                                    value={phone}
                                    label=''
                                    onChange={(e) => setPhone(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 1, backgroundColor: 'white' }}
                                />
                            ) : (
                                <Text variant={'h2'} thin>
                                    {phone}
                                </Text>
                            )}
                        </div>
                    </InfoSection>
                    <ProfileReviews
                        reviews={reviews}
                        currentUserId={user.id}
                        className={styles.revews}
                    />
                </section>
            </main>
        </>
    )
}
