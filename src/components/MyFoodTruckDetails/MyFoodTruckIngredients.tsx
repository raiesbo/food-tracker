import { Dish } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton } from "@mui/material";
import { Ingredient } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Text } from '../Text';
import styles from './MyFoodTruckIngredients.module.scss';

type Props = {
    ingredients: Array<Ingredient>
    dishId: Dish['id']
    isUpdate?: boolean,
    onUpdate: (e: Array<Ingredient>) => void
}

export default function MyFoodTruckIngredients({ dishId, ingredients, isUpdate, onUpdate }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const onRemoveOne = (ingredientId: Ingredient['id']) => {
        setIsLoading(true);

        fetch(`/api/ingredients/${ingredientId}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                onUpdate([...ingredients.filter(({ id }) => id !== ingredientId)])
            } else {
                alert('Server Error')
            }
        }).finally(() => setIsLoading(false))
    }

    const onAddOne = () => {
        setIsLoading(true);

        fetch(`/api/dishes/${dishId}/ingredients`, {
            method: 'PUT'
        }).then(response => {
            if (!response.ok) {
                alert('Server Error');
                return;
            }
            return response.json()
        }).then(({ ingredient }) => {
            onUpdate([...ingredients, ingredient])
        }).finally(() => setIsLoading(false))
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const newArray = [...ingredients.map(ingredient => {
            return ingredient.id === name ? { ...ingredient, name: value } : ingredient
        })]

        console.log({ name, value, newArray })

        onUpdate([...ingredients.map(ingredient => {
            return ingredient.id === name ? { ...ingredient, name: value } : ingredient
        })])
    }

    return (
        <div className={styles.root}>
            {ingredients.map(ingredient => (
                <div key={ingredient.id} className={styles.chip} >
                    {isUpdate ? (
                        <>
                            <input
                                onChange={onInputChange}
                                type="text"
                                name={ingredient.id}
                                value={ingredient.name}
                                className={styles.ingredientInput}
                            />
                            <IconButton
                                onClick={() => onRemoveOne(ingredient.id)}
                                disabled={isLoading}
                                size='small'
                            >
                                <RemoveCircleIcon fontSize="small" />
                            </IconButton>
                        </>

                    ) : (
                        <Text>{ingredient.name}</Text>
                    )}
                </div>
            ))}
            {isUpdate && (
                <div className={styles.chipIcon} >
                    <IconButton
                        onClick={onAddOne}
                        disabled={isLoading}
                        size='small'
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </div>
            )}
        </div>
    )
}