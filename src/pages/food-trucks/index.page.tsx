import { Layout } from "@/components/Layout";
import { RestaurantListItem } from "@/components/RestaurantList";
import { Text } from "@/components/Text";
import PrismaDBClient from "@/repositories/prismaClient";
import homepageService from "@/services/homepage.service";
import { Restaurant } from "@/types";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Category } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import styles from './restaurants.module.scss';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Switch } from "@mui/material";

const service = homepageService(PrismaDBClient);

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
	const { result, error } = await service.getLocationsAndCategories();

	if (error) return {
		props: { locations: [], categories: [] }
	};

	return {
		props: {
			locations: result.locations,
			categories: result.categories,
			queryCity: query?.city || '',
			queryCategory: query?.category || ''
		}
	};
}

type Props = {
	locations: Array<string>,
	categories: Array<Category>,
	queryCity: string,
	queryCategory: string
}

export default function RestaurantPage({
	locations,
	categories,
	queryCity,
	queryCategory
}: Props) {
	const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
	const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
	const [isLoading, setIsLoading] = useState(false);

	const [name, setName] = useState('');
	const [city, setCity] = useState(queryCity);
	const [category, setCategory] = useState(queryCategory);
	const [vegan, setVegan] = useState(false);
	const [creditcard, setCreditcard] = useState(false);

	useEffect(() => {
		const getRestaurants = () => {
			setIsLoading(true);

			const searchParams = new URLSearchParams({
				name: name,
				city: city.replace('All', ''),
				category: category.replace('All', ''),
				vegan: vegan ? 'true' : '',
				creditcard: creditcard ? 'true' : ''
			});

			fetch(`/api/restaurants/filters?${searchParams}`)
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						return { restaurants: null };
					}
				})
				.then(({ restaurants }) => {
					restaurants && setRestaurants(restaurants);
				}).finally(() => setIsLoading(false));
		};

		clearTimeout(timeoutId);
		setTimeoutId(setTimeout(getRestaurants, 500));
	}, [city, category, vegan, creditcard, name]);

	const breadcrumbList = [
		{ label: "Home", url: '/' },
		{ label: "Restaurants" }
	];

	return (
		<Layout>
			<div className={styles.imageContainer}>
				<Image
					src={'/images/background-food-list-1500px.webp'}
					alt="Food truck background | image from Unsplash"
					blurDataURL={'/images/homepage_background_800px.webp'}
					placeholder='blur'
					fill
					loading='eager'
				/>
			</div>
			<div className={styles.root}>
				<Card className={styles.headerCard}>
					<Text as='h1' variant={{ small: 'h3', medium: 'h2' }} bold>
						Food Trucks
					</Text>
				</Card>
				<Breadcrumbs items={breadcrumbList}/>
				<div className={styles.bodyContainer}>
					<Card className={styles.filtersContainer}>
						<Text as='h1' variant={{ small: 'h4', medium: 'h3' }} bold>
							Filters
						</Text>
						<TextField
							id="restaurant-name"
							label="Restaurant's name"
							variant="outlined"
							sx={{ backgroundColor: 'white' }}
							onChange={(e) => setName(e.target.value)}
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
						<FormControlLabel
							control={
								<Switch
									onChange={(e) => setVegan(e.target.checked)}
									value={vegan}
								/>
							}
							label="with Vegan options"
						/>
						<FormControlLabel
							control={
								<Switch
									onChange={(e) => setCreditcard(e.target.checked)}
									value={creditcard}
								/>
							}
							label="accepts Credit Card"
						/>
					</Card>
					<div className={styles.listContainer}>
							{isLoading ? (
								<div className={styles.spinnerContainer}>
									<CircularProgress/>
								</div>
							) : (
								restaurants.length > 0 ? (
									restaurants?.map((restaurant: Restaurant) => (
										<RestaurantListItem
											key={restaurant.name}
											restaurant={restaurant}
										/>
									))
								) : (
									<div>
										<Text>No Food Trucks found</Text>
									</div>
								)
							)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
