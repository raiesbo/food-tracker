import { Dish } from '@/types';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './MyFoodTruckDish.module.scss';

type Props = {
    dish: Dish
}

export default function MyGoodTruckDish({ dish }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [name, setName] = useState(dish.name || '');
    const [price, setPrice] = useState(dish.price || 0);
    const [description, setDescription] = useState(dish.description || '');
    const [isVegan, setIsVegan] = useState(dish.isVegan || '');
    const [isGlutenFree, setIsGlutenFree] = useState(dish.isGlutenFree || '');
    const [ingredients, setIngredients] = useState(dish.ingredients || '');

    return (
        <Card key={dish.id} className={styles.root}>
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
        </Card>
    )
}