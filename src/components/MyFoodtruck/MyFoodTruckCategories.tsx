import { Category } from '@/types';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { InfoSection } from "../InfoSection";
import { Text } from '../Text';
import styles from './MyFoodTruckCategories.module.scss';

type Props = {
    categories: Array<Category>,
    userId: User['id']
}

export default function MyFoodTruckCategories({ categories, userId }: Props) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ categoryList, setCategoryList ] = useState(categories);

    const onAddCategory = () => {
        setCategoryList(state => ([
            ...state,
            { id: Math.ceil(Math.random() * 100000), name: 'New Category' }
        ] as Array<Category>));
    };

    const onRemoveCategory = (catId: Category['id']) => {
        setIsLoading(true);

        fetch(`/api/categories/${catId}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                setCategoryList([ ...categoryList.filter(({ id }) => id !== catId) ]);
            } else {
                alert('Server Error');
            }
        }).finally(() => setIsLoading(false));
    };

    const onSaveNewCategory = (catId: Category['id']) => {
        setIsLoading(true);

        const catToSave = categoryList.find(({ id }) => id === catId);

        fetch(`/api/categories`, {
            method: 'POST',
            body: JSON.stringify({ name: catToSave?.name, userId })
        }).then(response => response.json()).then(({ category }) => {
            if (category.id) {
                setCategoryList([ ...categoryList.map(cat => cat.name === category.name ? category : cat) ]);
            } else {
                alert('Server Error');
            }
        }).finally(() => setIsLoading(false));
    };

    const onCancelNewCategory = (catId: Category['id']) => {
        setCategoryList([ ...categoryList.filter(({ id }) => id !== catId) ]);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setCategoryList([ ...categoryList.map(category => (
            category.id === Number(name) ? { ...category, name: value } : category
        )) ]);
    };

    return (
        <InfoSection
            title='Categories'
            childrenClassName={styles.root}
        >
            <Text>Manage here the food types of categories that later will be shared across all your business</Text>
            <div className={styles.cateogiryList}>
                {categoryList.map((category) => {
                    if (category?.userId) {
                        return (
                            <div className={styles.cateogiryItem} key={category.id}>
                                <Text variant={'h4'} bold>{category.name}</Text>
                                {!category._count.restaurants && (
                                    <IconButton
                                        size='small'
                                        onClick={() => onRemoveCategory(Number(category.id))}
                                        disabled={isLoading}
                                    >
                                        <DeleteIcon fontSize='small' />
                                    </IconButton>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <div className={styles.cateogiryItem} key={category.id}>
                                <input
                                    name={`${category.id}`}
                                    value={category.name}
                                    onChange={onChange}
                                    disabled={isLoading}
                                />
                                <div>
                                    <IconButton
                                        size='small'
                                        onClick={() => onSaveNewCategory(Number(category.id))}
                                        disabled={isLoading}
                                    >
                                        <SaveIcon fontSize='small' color='success' />
                                    </IconButton>
                                    <IconButton
                                        size='small'
                                        onClick={() => onCancelNewCategory(Number(category.id))}
                                        disabled={isLoading}
                                    >
                                        <CancelIcon fontSize='small' color='error' />
                                    </IconButton>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
            <Button
                variant="outlined"
                onClick={onAddCategory}
                disabled={isLoading}
            >
                Add new category
            </Button>
        </InfoSection>
    );
}
