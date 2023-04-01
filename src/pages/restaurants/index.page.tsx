import { NavigationMenu } from "@/components/NavigationMenu";
import { RestaurantListItem } from "@/components/RestaurantList";
import services from "@/services";
import { paths } from "@/utils/paths";
import { Container, CssBaseline, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Category, Location, Restaurant } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './restaurants.module.scss';

const { restaurantService, categoriesService, locationsService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const query = context.query as { city: string, category: string };

    let filters = {}

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

    const { result: restaurants, error } = await restaurantService.getAllRestaurantByFilter(filters);

    const {
        result: categories,
        error: getAllCategoriesError
    } = await categoriesService.getAllCategories();

    const {
        result: locations,
        error: getAllLocationsError
    } = await locationsService.getAllLocations();

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
    locations: Array<Location>,
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

    const handleButtonClick = () => {
        const searchParams = new URLSearchParams({
            city: city.replace('All', ''),
            category: category.replace('All', '')
        })

        router.replace(`${paths.restaurants}?${searchParams}`);
    }

    useEffect(() => {
        handleButtonClick();
    }, [city, category])

    return (
        <>
            <NavigationMenu />
            <Container component="main" className={styles.root}>
                <CssBaseline />
                <h1>
                    Restaurants
                </h1>
                <div className={styles.filtersContainer}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>
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
                            {locations.map(({ city }: Location) => (
                                <MenuItem key={city} value={city || ''}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>
                            Food Type
                        </InputLabel>
                        <Select
                            labelId="City"
                            id="category"
                            value={category}
                            label="City"
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
                <div className={styles.listContainer}>
                    {restaurants?.map(restaurant => (
                        <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
            </Container>
        </>
    )
}