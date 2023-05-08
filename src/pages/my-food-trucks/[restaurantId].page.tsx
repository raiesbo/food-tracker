import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import { MyFoodTruckDetails } from "@/components/MyFoodTruckDetails";
import services from "@/services";
import { Category, Restaurant } from "@/types";
import { paths } from "@/utils/paths";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { ReactElement } from "react";
import useSWR from "swr";

const { restaurantService, categoriesService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { restaurantId } = context.query;

	const {
		result: restaurant,
		error
	} = await restaurantService.getRestaurant({ query: { restaurantId } } as unknown as NextApiRequest);

	const {
		result: categories,
		error: categoryError
	} = await categoriesService.getAllCategories();

	if (error || categoryError) return {
		redirect: {
			permanent: true,
			destination: paths.myFoodTrucks
		}
	};

	const url = `/api/restaurants/${restaurantId}`;

	return {
		props: {
			categories: categories.map(cat => ({
				...cat,
				createdAt: cat.createdAt.toISOString()
			})),
			restaurant,
			fallback: {
				[url]: restaurant
			},
			url
		}
	};
}

MyNewFoodTruckPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	fallback: { [key: string]: Restaurant },
	categories: Array<Category>,
	url: string
}

export default function MyNewFoodTruckPage({ fallback, categories, url }: Props) {
	const fetcher = (url: string) => {
		return fetch(url).then(response => response.json()).then(({ restaurant }) => restaurant);
	};

	const { data } = useSWR((url ?? ''), fetcher, {
		revalidateOnMount: false,
		fallback: (fallback ?? null)
	});

	return (
		<MyFoodTruckDetails restaurant={data} categories={categories}/>
	);
}
