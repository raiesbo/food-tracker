import { Dish } from '@/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from "@mui/material/IconButton";
import { ChangeEvent } from "react";
import { Text } from '../Text';
import styles from './MyFoodTruckIngredients.module.scss';

type Props = {
    ingredients: Array<{ id: string, name: string }>
    dishId: Dish['id']
    isUpdate?: boolean,
    isLoading?: boolean,
    onUpdate: (e: Array<{ id: string, name: string }>) => void
}

export default function MyFoodTruckIngredients({ ingredients, isUpdate, isLoading, onUpdate }: Props) {
    const onRemoveOne = (ingredientId: string) => {
        onUpdate([ ...ingredients.filter(({ id }) => id !== ingredientId) ]);
    };

    const onAddOne = () => {
        onUpdate([ ...ingredients, { id: `${(Math.random() * 100000).toFixed(0)}`, name: '' } ]);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        onUpdate([ ...ingredients.map(ingredient => {
            return ingredient.id === name ? { ...ingredient, name: value } : ingredient;
        }) ]);
    };

    return (
        <div className={styles.root}>
            {ingredients.map((ingredient, id) => (
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
    );
}
