import { Restaurant } from "@/types";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Category } from "@prisma/client";
import { useState } from "react";
import { InfoSection } from "../InfoSection";
import { Text } from "../Text";
import styles from './MyFoodTruckRestaurant.module.scss';

type Props = {
    restaurant: Restaurant,
    allCategories: Array<Category>
}

export default function MyFoodTruckRestaurant({ restaurant, allCategories }: Props) {
    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const [ name, setName ] = useState(restaurant.name || '');
    const [ slogan, setSlogan ] = useState(restaurant.slogan || '');
    const [ imageUrl, setImageUrl ] = useState(restaurant.imageUrl || '');
    const [ description, setDescription ] = useState(restaurant.description || '');
    const [ categories, setCategories ] = useState(restaurant.categories || '');
    const [ isCashOnly, setIsCashOnly ] = useState(restaurant.isCashOnly || false);

    const onCategorySelect = (e: SelectChangeEvent) => {
        const { value } = e.target;

        setCategories([
            ...allCategories.filter(({ id }) => (value as unknown as Array<number>).includes(id))
        ]);
    };

    const onCancel = () => {
        setName(restaurant.name || '');
        setSlogan(restaurant.slogan || '');
        setDescription(restaurant.description || '');
        setCategories(restaurant.categories || '');
        setIsCashOnly(restaurant.isCashOnly || false);

        setIsUpdate(false);
    };

    const onSave = () => {
        setIsLoading(true);

        fetch(`/api/restaurants/${restaurant.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                slogan,
                description,
                isCashOnly,
                categories
            })
        }).then(response => {
            if (response.ok) return;
            onCancel();
            alert('There has been server error, please try again later.');
        }).finally(() => {
            setIsLoading(false);
            setIsUpdate(false);
        });
    };

    return (
        <InfoSection
            title="Food Truck Information"
            childrenClassName={styles.root}
        >
            <div>
                <Text variant={'h4'} bold>
                    Name
                </Text>
                <TextField
                    value={name}
                    label=''
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ mt: 1, backgroundColor: 'white' }}
                    disabled={!isUpdate || isLoading}
                />
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Food Truck Slogan
                </Text>
                <TextField
                    value={slogan}
                    label=''
                    onChange={(e) => setSlogan(e.target.value)}
                    fullWidth
                    sx={{ mt: 1, backgroundColor: 'white' }}
                    disabled={!isUpdate || isLoading}
                />
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Food Type
                </Text>
                <Select
                    id="demo-simple-select"
                    value={categories.map(cat => cat?.id) as unknown as string}
                    onChange={onCategorySelect}
                    fullWidth
                    sx={{ mt: 1, backgroundColor: 'white' }}
                    disabled={!isUpdate || isLoading}
                    multiple
                >
                    {allCategories.map(category => {
                        return (
                            <MenuItem
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Thumbnail URL
                </Text>
                <TextField
                    value={imageUrl}
                    label=''
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                    multiline={isUpdate}
                    disabled={!isUpdate || isLoading}
                    sx={{ mt: 1, backgroundColor: 'white', wordBreak: 'break-all', maxWidth: '100%' }}
                />
            </div>
            <div>
                <Text variant={'h4'} bold>
                    Description
                </Text>
                <TextField
                    value={description}
                    multiline
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    sx={{ mt: 1, backgroundColor: 'white' }}
                    disabled={!isUpdate || isLoading}
                />
            </div>
            <div className={styles.footerContainer}>
                <FormControlLabel control={
                    <Checkbox
                        disabled={!isUpdate || isLoading}
                        checked={isCashOnly || false}
                        onChange={(e) => setIsCashOnly(e.target.checked)}
                    />
                } label="Cash Only" />
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
            </div>

        </InfoSection >
    );
}
