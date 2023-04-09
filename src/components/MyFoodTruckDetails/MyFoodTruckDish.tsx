import { Dish } from '@/types';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './MyFoodTruckDish.module.scss';

type Props = {
    dish: Dish
}

export default function MyGoodTruckDish({ dish }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [name, setName] = useState(dish.name || '');
    const [price, setPrice] = useState(dish.price || 0);
    const [description, setDescription] = useState(dish.description || '');
    const [isVegan, setIsVegan] = useState(dish.isVegan || false);
    const [isGlutenFree, setIsGlutenFree] = useState(dish.isGlutenFree || false);
    const [ingredients, setIngredients] = useState(dish.ingredients || []);

    const onCancelUpdate = () => {
        setName(dish.name || '');
        setPrice(dish.price || 0);
        setDescription(dish.description || '');
        setIsVegan(dish.isVegan || false);
        setIsGlutenFree(dish.isGlutenFree || false);
        setIngredients(dish.ingredients || []);

        setIsUpdate(false)
    }

    const onRemoveDish = () => {
        setIsLoading(true);

        fetch(`/api/dishes/${dish.id}`, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                alert('Server Error')
            } else {
                router.reload();
            }
        }).finally(() => setIsLoading(false));
    }

    const onUpdateDish = () => {
        setIsLoading(true);

        fetch(`/api/dishes/${dish.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, description, isVegan, isGlutenFree })
        }).then(response => {
            if (!response.ok) {
                alert('Server Error');
                return;
            }
            return fetch(`/api/dishes/${dish.id}/ingredients`, {
                method: 'PUT',
                body: JSON.stringify({ ingredients })
            })
        }).then(response => {
            if (!response?.ok) {
                alert('Server Error');
                return;
            }
        }).finally(() => {
            setIsLoading(false);
            setIsUpdate(false);
        });
    }

    return (
        <Card key={dish.id} className={styles.root}>
            <div className={styles.inputsContainer}>
                <div>
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
                <div>
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
        </Card>
    )
}