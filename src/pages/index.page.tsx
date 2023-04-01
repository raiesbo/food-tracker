import { NavigationMenu } from '@/components/NavigationMenu';
import services from '@/services';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Category } from '@prisma/client';

const { categoriesService, locationsService } = services;

type Props = {
  categories: Array<Category>,
  locations: Array<Location>
}

export async function getServerSideProps() {
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

  return {
    props: { categories, locations }
  }
}

export default function Home({ categories, locations }: Props) {

  console.log({ locations, categories })

  return (
    <>
      <NavigationMenu />
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
    </>
  );
}