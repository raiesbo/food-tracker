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
import { ReactElement, ReactNode, useEffect, useState } from "react";
import styles from './restaurants.module.scss';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Image from "next/image";
import { Card } from "@/components/Card";
import { Slider, Switch } from "@mui/material";
import useLocation from "@/utils/hooks/useLocation";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import userService from "@/services/user.serviceClient";
import User from "@/types/User";
import { LocationAction } from "@/components/LocationContext";
import calcCrow from "@/utils/calcCoordsDistance";

const homepageServiceInstance = homepageService(PrismaDBClient);
const userServiceInstance = userService(PrismaDBClient);

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { result, error } = await homepageServiceInstance.getLocationsAndCategories();

	if (error) return { props: { locations: [], categories: [] } };

	const session = await getSession(context.req, context.res);

	if (!session) {
		return {
			props: {
				locations: result.locations,
				categories: result.categories,
				queryCity: context.query?.city || '',
				queryCategory: context.query?.category || ''
			}
		};
	}

	const userId = session.user[auth0Config.metadata]?.user_id;
	const { result: user } = await userServiceInstance.getUser(userId);

	return {
		props: {
			user,
			locations: result.locations,
			categories: result.categories,
			queryCity: context.query?.city || '',
			queryCategory: context.query?.category || ''
		}
	};
}

RestaurantPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

type Props = {
	locations: Array<string>,
	categories: Array<Category>,
	queryCity: string,
	queryCategory: string,
	user?: User
}

export default function RestaurantPage({ locations, categories, queryCity, queryCategory, user }: Props) {
	const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
	const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [distanceFilter, setDistanceFilter] = useState(25);

	const [name, setName] = useState('');
	const [city, setCity] = useState(queryCity);
	const [category, setCategory] = useState(queryCategory);
	const [vegan, setVegan] = useState(false);
	const [creditCard, setCreditCard] = useState(false);

	const { locationState, dispatch } = useLocation();

	useEffect(() => {
		const updateLocationContext = () => {
			if (!user) return;
			if (user?.location?.lat) {
				dispatch({
					type: LocationAction.UPDATE_LOCATION, payload: {
						lat: user?.location?.lat || '',
						lon: user?.location?.lon || '',
						zip: user?.location?.zip || ''
					}
				});
			}
		};

		updateLocationContext();
	}, []);

	useEffect(() => {
		const getRestaurants = () => {
			const searchParams = new URLSearchParams({
				name: name,
				city: city.replace('All', ''),
				category: category.replace('All', ''),
				vegan: vegan ? 'true' : '',
				creditCard: creditCard ? 'true' : ''
			});

			fetch(`/api/restaurants/filters?${searchParams}`)
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						return { restaurants: null };
					}
				}).then(({ restaurants }) => {
				restaurants && setRestaurants(restaurants);
			});
		};

		clearTimeout(timeoutId);
		setTimeoutId(setTimeout(getRestaurants, 500));
	}, [city, category, vegan, creditCard, name]);

	const breadcrumbList = [
		{ label: 'Home', url: '/' },
		{ label: 'Restaurants' }
	];

	return (
		<>
			<div className={styles.imageContainer}>
				<Image
					src={'/images/background-food-list-1500px.webp'}
					alt='Food truck background | image from Unsplash'
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
						{user?.id && (
							<div>
								<Text grey variant={'small'}>Distance (km):</Text>
								<Slider
									step={1}
									value={distanceFilter}
									onChange={(e, value) => setDistanceFilter(value as number)}
									// @ts-ignore
									valueLabelFormat={((value: string) => `${value} km`) as unknown as ReactNode}
									valueLabelDisplay="auto"
									max={50}
									min={1}
								/>
							</div>

						)}
						<TextField
							id="restaurant-name"
							label="Food Truck's name"
							variant="outlined"
							sx={{ backgroundColor: 'white' }}
							onChange={(e) => setName(e.target.value)}
						/>
						<FormControl>
							<InputLabel>
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
							<InputLabel>
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
									onChange={(e) => setCreditCard(e.target.checked)}
									value={creditCard}
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
								restaurants?.map((restaurant: Restaurant) => {
									const location = restaurant.locations[0];
									const distance = calcCrow(
										Number(locationState.lat),
										Number(locationState.lon),
										Number(location.lat),
										Number(location.lon)
									);

									if (
										!user
										|| distance === 0
										|| user && distance && distance < distanceFilter
									) {
										return (
											<RestaurantListItem
												key={restaurant.id}
												restaurant={restaurant}
												distance={distance}
											/>
										);
									}
								})
							) : (
								<div>
									<Text>No Food Trucks found</Text>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
}
