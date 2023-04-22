import FileService from '@/services/file.service';
import { Dish } from '@/types';
import { uploadImage, useToast } from '@/utils';
import { auth0Config, imagesConfig } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import cc from 'classcat';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import { ToastAction } from '../ToastContext';
import styles from './MyFoodTruckDish.module.scss';
import MyFoodTruckIngredients from './MyFoodTruckIngredients';

type Props = {
    dish: Dish
}

export default function MyGoodTruckDish({ dish }: Props) {
    const router = useRouter();
    const { user } = useUser();
    const { dispatch } = useToast();

    const userMetadata = user && user?.[auth0Config.metadata] as { user_id: string };

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ isCollapsed, setIsCollapsed ] = useState(true);

    const [ name, setName ] = useState(dish.name || '');
    const [ price, setPrice ] = useState(dish.price || 0);
    const [ description, setDescription ] = useState(dish.description || '');
    const [ imageUrl, setImageUrl ] = useState(dish.imageUrl || '');
    const [ isVegan, setIsVegan ] = useState(dish.isVegan || false);
    const [ isGlutenFree, setIsGlutenFree ] = useState(dish.isGlutenFree || false);
    const [ ingredients, setIngredients ] = useState(dish.ingredients?.split(';')?.map(ing => ({
        id: `${(Math.random() * 100000).toFixed(0)}`,
        name: ing
    })) || []);

    const onCancelUpdate = () => {
        setName(dish.name || '');
        setPrice(dish.price || 0);
        setDescription(dish.description || '');
        setIsVegan(dish.isVegan || false);
        setIsGlutenFree(dish.isGlutenFree || false);
        setIngredients(dish.ingredients?.split(';')?.map(ing => ({
            id: `${(Math.random() * 100000).toFixed(0)}`,
            name: ing
        })) || []);

        setIsUpdate(false);
    };

    const onRemoveDish = () => {
        setIsLoading(true);

        fetch(`/api/dishes/${dish.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                alert('Server Error');
            } else {
                router.reload();
            }
        }).finally(() => setIsLoading(false));
    };

    const onUpdateDish = () => {
        setIsLoading(true);

        fetch(`/api/dishes/${dish.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                price,
                description,
                isVegan,
                isGlutenFree,
                imageUrl,
                ingredients: ingredients.map(ing => ing.name).join(';')
            })
        }).then(response => {
            if (!response.ok) {
                alert('Server Error');
                return;
            }
            return fetch(`/api/dishes/${dish.id}/ingredients`, {
                method: 'PUT',
                body: JSON.stringify({ ingredients })
            });
        }).then(response => {
            if (!response?.ok) {
                alert('Server Error');
                return;
            }
        }).finally(() => {
            setIsLoading(false);
            setIsUpdate(false);
        });
    };

    const updateFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const files = event.target.files;

        if (user?.accessToken && files && userMetadata?.user_id && dish.restaurantId) {
            const file = files[0];
            const extension = file?.name?.split('.')?.at(-1)?.toLowerCase() as "png" | "jpg";
            const type = 'dishes';

            const { result, error } = await FileService().createFile({
                token: user.accessToken as string,
                file,
                userId: userMetadata.user_id,
                type,
                format: extension,
                typeId: dish.id
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
                const newImageUrl = await uploadImage({ userId: userMetadata.user_id, type, typeId: dish.id, extension });
                if (newImageUrl) setImageUrl(newImageUrl);
            }

            setIsLoading(false);
        }
    };

    return (
        <Card key={dish.id} className={styles.root}>
            <header className={styles.header}>
                <Text variant='h4' bold>
                    {name}
                </Text>
                <IconButton size='small'
                    className={cc([ isCollapsed && styles.rotateChevron ])}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ExpandMoreIcon fontSize='small' />
                </IconButton>
            </header>
            <div className={cc([
                styles.inputsContainer,
                isCollapsed && styles.inputsContainer_collapsed
            ])}>
                <div className={styles.headerContainer}>
                    <div className={styles.inputsHeader}>
                        <div className={styles.entryContainer}>
                            <Text variant={'h4'} bold>
                                Name
                            </Text>
                            <TextField
                                type='text'
                                disabled={!isUpdate}
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.entryContainer}>
                            <Text variant={'h4'} bold>
                                Price
                            </Text>
                            <TextField
                                type='number'
                                disabled={!isUpdate}
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    disabled={!isUpdate || isLoading}
                                    checked={isVegan || false}
                                    onChange={(e) => setIsVegan(e.target.checked)}
                                />
                            } label="Is Vegan" />
                            <FormControlLabel control={
                                <Checkbox
                                    disabled={!isUpdate || isLoading}
                                    checked={isGlutenFree || false}
                                    onChange={(e) => setIsGlutenFree(e.target.checked)}
                                />
                            } label="Is Gluten Free" />
                        </div>
                    </div>
                    <div className={cc([ styles.entryContainer, styles.imageHeader ])}>
                        <Text variant={'h4'} bold>
                            Thumbnail
                        </Text>
                        <div className={styles.imageContainer}>
                            <label htmlFor={`dish_${dish.id}`} className={styles.imageUploadInput}>
                                <Image
                                    alt='Dish image'
                                    src={imageUrl || imagesConfig.default}
                                    fill
                                    className={styles.image}
                                    style={{ objectFit: 'cover' }}
                                />
                            </label>
                            <input
                                id={`dish_${dish.id}`}
                                type='file'
                                accept="image/jpg,image/png"
                                onChange={updateFile}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.entryContainer}>
                    <Text variant={'h4'} bold>
                        Thumbnail URL
                    </Text>
                    <TextField
                        type='text'
                        disabled={!isUpdate}
                        fullWidth
                        multiline={isUpdate}
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className={styles.entryContainer}>
                    <Text variant={'h4'} bold>
                        Description
                    </Text>
                    <TextField
                        type='text'
                        disabled={!isUpdate}
                        fullWidth
                        value={description}
                        multiline
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.entryContainer}>
                    <Text variant={'h4'} bold>
                        Ingredients
                    </Text>
                    <MyFoodTruckIngredients
                        dishId={dish.id}
                        isUpdate={isUpdate}
                        ingredients={ingredients}
                        onUpdate={setIngredients}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        disabled={isLoading}
                        variant='outlined'
                        color='error'
                        onClick={onRemoveDish}
                    >
                        Remove
                    </Button>
                    <div className={styles.editButtonSection}>
                        {isUpdate ? (
                            <>
                                <Button
                                    disabled={isLoading}
                                    variant='contained'
                                    color='error'
                                    onClick={onCancelUpdate}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    variant='contained'
                                    color='success'
                                    onClick={onUpdateDish}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <Button
                                disabled={isLoading}
                                variant='contained'
                                onClick={() => setIsUpdate(true)}
                            >
                                Update
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
