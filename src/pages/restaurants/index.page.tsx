import { NavigationMenu } from "@/components/NavigationMenu";
import { RestaurantListItem } from "@/components/RestaurantList";
import { Text } from "@/components/Text";
import services from "@/services";
import { Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Category } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './restaurants.module.scss';

const { restaurantService, categoriesService, locationsService } = services;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    let filters = {}

    if (!!query.vegan) {
        filters = {
            ...filters,
            menu: {
                some: {
                    isVegan: true
                }
            }
        }
    }

    if (!!query.creditcard) {
        filters = {
            ...filters,
            isCashOnly: false
        }
    }

    if (query.category) {
        filters = {
            ...filters,
            category: {
                is: {
                    name: query.category
                }
            }
        }
    }

    if (query.city) {
        filters = {
            ...filters,
            locations: {
                some: {
                    city: query.city
                }
            }
        }
    }

    const {
        result: restaurants,
        error
    } = await restaurantService.getAllRestaurantByFilter(filters);

    const {
        result: categories,
        error: getAllCategoriesError
    } = await categoriesService.getAllCategories();

    const {
        result: locations,
        error: getAllLocationsError
    } = await locationsService.getAllUniqueCities();

    if (getAllCategoriesError || getAllLocationsError) return {
        props: { getAllCategoriesError, getAllLocationsError }
    }

    if (error || getAllCategoriesError || getAllLocationsError) return {
        props: { restaurants: [], locations: [], categories: [] }
    }

    return {
        props: {
            restaurants,
            locations,
            categories,
            queryCity: query.city || '',
            queryCategory: query.category || ''
        }
    }
}

type Props = {
    restaurants: Array<Restaurant>,
    locations: Array<string>,
    categories: Array<Category>,
    queryCity: string,
    queryCategory: string
}

export default function RestaurantPage({
    restaurants,
    locations,
    categories,
    queryCity,
    queryCategory
}: Props) {
    const router = useRouter();

    const [city, setCity] = useState(queryCity);
    const [category, setCategory] = useState(queryCategory);
    const [vegan, setVegan] = useState(false);
    const [creditcard, setCreditcard] = useState(false);

    useEffect(() => {
        const handleButtonClick = () => {
            const searchParams = new URLSearchParams({
                city: city.replace('All', ''),
                category: category.replace('All', ''),
                vegan: vegan ? 'true' : '',
                creditcard: creditcard ? 'true' : ''
            })

            router.replace(`${paths.restaurants}?${searchParams}`);
        }

        handleButtonClick();
    }, [city, category, vegan, creditcard])

    return (
        <>
            <NavigationMenu />
            <main className={styles.root}>
                <Text as='h1' variant='h1' bold>
                    Restaurants
                </Text>
                <div className={styles.filtersContainer}>
                    <TextField
                        id="restaurant-name"
                        label="Restaurant's name"
                        variant="outlined"
                        sx={{ backgroundColor: 'white' }}
                    />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            City
                        </InputLabel>
                        <Select
                            labelId="City"
                            id="location"
                            value={city}
                            label="City"
                            onChange={(e) => setCity(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {locations.map(city => (
                                <MenuItem key={city} value={city || ''}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            Food Type
                        </InputLabel>
                        <Select
                            labelId="Food Type"
                            id="category"
                            value={category}
                            label="Food Type"
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{ backgroundColor: 'white' }}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {categories.map(({ name }: Category) => (
                                <MenuItem key={name} value={name || ''}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.additionalFilters}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => setVegan(e.target.checked)}
                                value={vegan}
                            />
                        }
                        label="with Vegan options"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => setCreditcard(e.target.checked)}
                                value={creditcard}
                            />
                        }
                        label="accepts Credit Card"
                    />
                </div>
                <div className={styles.listContainer}>
                    {restaurants?.map((restaurant: Restaurant) => (
                        <RestaurantListItem
                            key={restaurant.id}
                            restaurant={restaurant}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}
