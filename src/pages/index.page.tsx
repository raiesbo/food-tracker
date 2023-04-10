import { NavigationMenu } from '@/components/NavigationMenu';
import services from '@/services';
import { paths } from '@/utils/paths';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Category } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Text } from '../components/Text';
import styles from './Home.module.scss';

const { categoriesService, locationsService } = services;

const bgImageUrl = 'https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1000';

export async function getServerSideProps() {
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

  return {
    props: { categories, locations }
  }
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
    })

    router.push(`${paths.restaurants}?${searchParams}`);
  }

  return (
    <>
      <NavigationMenu />
      <main>
        <div className={styles.searchSectionContainer}>
          <Image
            src={bgImageUrl}
            alt="Food truck background | default image from Unsplash"
            style={{ objectFit: "cover", opacity: 0.9, filter: 'brightness(15%)' }}
            priority
            fill
            className={styles.backgroundImage}
          />
          <div className={styles.headerContent}>
            <Text as='h1' variant='h1' bold>
              Food Tracker
            </Text>
            <div className={styles.headerTextContent}>
              <Text>
                Your free world wide Street Food finder tool
              </Text>
              <Text>
                Directly from the hands of the best cooks around the world
              </Text>
            </div>
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 5, md: 3 },
                alignItems: 'center',
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  transform: 'translate(10px, -25px)'
                }}>
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
                  {locations.map((city: string) => (
                    <MenuItem key={city} value={city || ''}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label" sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  transform: 'translate(10px, -25px)'
                }}>
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
            </Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleButtonClick}
            >
              Find Your Next Street Food
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}