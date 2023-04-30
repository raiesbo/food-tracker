import { Layout } from '@/components/Layout';
import PrismaDBClient from '@/repositories/prismaClient';
import homepageService from '@/services/homepage.service';
import { paths } from '@/utils/paths';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Category } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Text } from '../components/Text';
import styles from './Home.module.scss';
import { Card } from "@/components/Card";

const service = homepageService(PrismaDBClient);
// const bgImageUrl = 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000';

export async function getServerSideProps() {
	const { result, error } = await service.getLocationsAndCategories();

	if (error) return {
		props: { categories: [], locations: [] }
	};

	return { props: result };
}

type Props = {
	categories: Array<Category>,
	locations: Array<string>
}

export default function Home({ categories, locations }: Props) {
	const router = useRouter();

	const [city, setCity] = useState('All');
	const [category, setCategory] = useState('All');

	const handleButtonClick = () => {
		const searchParams = new URLSearchParams({
			city: city.replace('All', ''),
			category: category.replace('All', '')
		});

		router.push(`${paths.restaurants}?${searchParams}`);
	};

	return (
		<Layout>
			<div className={styles.backgroundImageContainer}>
				<Image
					src={'/images/homepage_background_2000px.webp'}
					alt="Food truck background | image from Unsplash"
					style={{ objectFit: "cover" }}
					blurDataURL={'/images/homepage_background_800px.webp'}
					placeholder='blur'
					priority
					fill
					loading='eager'
				/>
			</div>
			<Card className={styles.headerContent}>
				<div className={styles.headerTextContent}>
					<Text as='h1' variant={{ small: 'h2', medium: 'h1' }} bold>
						Food Tracker
					</Text>
					<Text italic semiBold variant={{ small: 'smallest', medium: 'label' }}>
						Your free world wide Street Food finder tool
					</Text>
					<Text italic semiBold variant={{ small: 'smallest', medium: 'label' }}>
						Directly from the hands of the best cooks around the world
					</Text>
				</div>
				<div className={styles.filterContainer}>
					<div className={styles.filterInput}>
						<Text variant='h4' bold>
							City
						</Text>
						<Select
							labelId="City"
							id="location"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						>
							<MenuItem value={'All'}>All</MenuItem>
							{locations.map((city: string) => (
								<MenuItem key={city} value={city || ''}>
									{city}
								</MenuItem>
							))}
						</Select>
					</div>
					<div className={styles.filterInput}>
						<Text variant='h4' bold>
							Food Type
						</Text>
						<Select
							labelId="City"
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
						>
							<MenuItem value={'All'}>All</MenuItem>
							{categories.map(({ name }: Category) => (
								<MenuItem key={name} value={name || ''}>
									{name}
								</MenuItem>
							))}
						</Select>
					</div>
				</div>
				<Button
					fullWidth
					variant="contained"
					onClick={handleButtonClick}
				>
					Find Your Next Street Food
				</Button>
			</Card>
		</Layout>
	);
}
