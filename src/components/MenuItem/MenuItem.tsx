import { Dish } from "@/types";
import { imagesConfig } from "@/utils/settings";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chip, IconButton } from "@mui/material";
import cc from 'classcat';
import Image from "next/image";
import { useId, useState } from "react";
import { Card } from "../Card";
import { Text } from "../Text";
import styles from './MenuItem.module.scss';

type Props = {
    dish: Dish
}

export default function MenuItem({ dish }: Props) {
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className={styles.root}>
            <header className={styles.header}>
                <Text variant={'h4'} bold>
                    {dish.name}
                </Text>
                <div className={styles.headerDetails}>
                    {dish.price && (
                        <Text variant={'smallest'} italic semiBold>
                            {dish.price} €
                        </Text>
                    )}
                    <IconButton
                        onClick={() => setIsOpen(!isOpen)}
                        className={cc([isOpen && styles.rotateChevron])}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </header>
            <div className={styles.imageContainer}>
                <Image
                    src={dish.imageUrl || imagesConfig.default}
                    alt={dish.name + ' | default image from Unsplash'}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={cc([styles.ingredientList, !isOpen && styles.ingredientList_closed])}>
                <Text variant={'h4'} bold>
                    Ingredients
                </Text>
                <div className={styles.ingredients}>
                    {dish.ingredients?.split(';').map((ingredient) => {
                        return (
                            <Chip
                                key={ingredient}
                                label={ingredient}
                                size='small'
                            />
                        );
                    })}
                </div>
            </div>
        </Card >
    );
};
