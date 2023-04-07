import { Dish } from "@/types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, IconButton } from "@mui/material";
import cc from 'classcat';
import Image from "next/image";
import { useState } from "react";
import { Card } from "../Card";
import { Text } from "../Text";
import styles from './MenuItem.module.scss';

const mockImg = 'https://images.unsplash.com/photo-1551730707-ae4fde676aae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2770&q=80'

type Props = {
    dish: Dish
}

export default function MenuItem({ dish }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className={styles.root}>
            <header className={styles.header}>
                <Text variant={'h4'} bold>
                    {dish.name}
                </Text>
                <Text>
                    {dish.price}
                </Text>
                <IconButton onClick={() => setIsOpen(!isOpen)} className={cc([isOpen && styles.rotateChevron])} >
                    <ExpandMoreIcon />
                </IconButton>
            </header>
            <div className={styles.imageContainer}>
                <Image
                    src={mockImg}
                    alt={dish.name}
                    fill
                />
            </div>
            <div className={cc([styles.ingredientList, !isOpen && styles.ingredientList_closed])}>
                <Text variant={'h4'} bold>
                    Ingredients
                </Text>
                <div className={styles.ingredients}>
                    {dish.ingredients.map(ing => {
                        return (
                            <Chip
                                key={ing.name}
                                label={ing.name}
                                size='small'
                            />
                        )
                    })}
                </div>
            </div>
        </Card >
    )
};
