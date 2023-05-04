import { InfoSection } from "@/components/InfoSection";
import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { Text } from "@/components/Text";
import { ToastAction } from "@/components/ToastContext";
import services from "@/services";
import FileService from "@/services/file.service";
import { uploadImage, useToast } from "@/utils";
import { auth0Config, imagesConfig } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import styles from './profile.module.scss';
import { PageHeader } from "@/components/PageHeader";

const { userService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context.req, context.res);
    const userId = session && session.user[auth0Config.metadata]?.user_id;

    const {
        result: user,
        error
    } = await userService.getUser(userId);

    if (error) return {
        redirect: {
            permanent: true,
            destination: '/'
        }
    };

    return {
        props: { user, auth0User: session?.user }
    };
}

type Props = {
    user: User,
    auth0User: UserProfile
}

export default function Profile({ user, auth0User }: Props) {
    const { dispatch } = useToast();

    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastname] = useState(user.lastName || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [imageUrl, setImageUrl] = useState(user.imageUrl || '');

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
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'User Profile'} childrenClassName={styles.buttonContainer}>
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
                    <InfoSection
                        title='Personal Information'
                        childrenClassName={styles.userInfo}
                    >
                        <div>
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
                        <div>
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
                </section>
            </div>
        </LayoutWithSideBar>
    );
}
