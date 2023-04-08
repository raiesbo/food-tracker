import { Restaurant } from "@/types";
import { Button, Checkbox, FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
import { Category } from "@prisma/client";
import { useState } from "react";
import { InfoSection } from "../InfoSection";
import { Text } from "../Text";
import styles from './MyFoodTruckRestaurant.module.scss';

type Props = {
    restaurant: Restaurant,
    categories: Array<Category>
}

export default function MyFoodTruckRestaurant({ restaurant, categories }: Props) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState(restaurant.name || '');
    const [slogan, setSlogan] = useState(restaurant.slogan || '');
    const [description, setDescription] = useState(restaurant.description || '');
    const [categoryId, setCategoryId] = useState(restaurant.categoryId || '');
    const [isCashOnly, setIsCashOnly] = useState(restaurant.isCashOnly || false);

    const onCancel = () => {
        setName(restaurant.name || '');
        setSlogan(restaurant.slogan || '');
        setDescription(restaurant.description || '');
        setCategoryId(restaurant.categoryId || '');
        setIsCashOnly(restaurant.isCashOnly || false);

        setIsUpdate(false);
    }

    const onSave = () => {
        setIsLoading(true);

        fetch(`/api/restaurants/${restaurant.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                slogan,
                description,
                isCashOnly,
                categoryId
            })
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
        <InfoSection
            title="Food Truck Information"
            childrenClassName={styles.root}
        >
            <div>
                <Text variant={'h4'} bold>
                    Name
                </Text>
                {isUpdate ? (
                    <TextField
                        value={name}
                        label=''
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        sx={{ mt: 1, backgroundColor: 'white' }}
                    />
                ) : (
                    <Text variant={'h3'} thin>
                        {name}
                    </Text>
                )}
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Food Truck Slogan
                </Text>
                {isUpdate ? (
                    <TextField
                        value={slogan}
                        label=''
                        onChange={(e) => setSlogan(e.target.value)}
                        fullWidth
                        sx={{ mt: 1, backgroundColor: 'white' }}
                    />
                ) : (
                    <Text variant={'h3'} thin>
                        {slogan}
                    </Text>
                )}
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Food Type
                </Text>
                {isUpdate ? (
                    <Select
                        id="demo-simple-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        fullWidth
                        sx={{ mt: 1, backgroundColor: 'white' }}
                    >
                        {categories.map(category => {
                            return (
                                <MenuItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                ) : (
                    <Text variant={'h3'} thin>
                        {categories.find(({ id }) => id === categoryId)?.name || 'None'}
                    </Text>
                )}
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Description
                </Text>
                {isUpdate ? (
                    <TextField
                        value={description}
                        label=''
                        multiline
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        sx={{ mt: 1, backgroundColor: 'white' }}
                    />
                ) : (
                    <Text variant={'h3'} thin>
                        {description}
                    </Text>
                )}
            </div>
            <div>
                <FormControlLabel control={
                    <Checkbox
                        disabled={!isUpdate}
                        checked={isCashOnly || false}
                        onChange={(e) => setIsCashOnly(e.target.checked)}
                    />
                } label="Cash Only" />
            </div>
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
        </InfoSection>
    )
}