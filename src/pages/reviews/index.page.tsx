import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./MyReviews.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import { Review } from "@/types";
import PrismaDBClient from "@/repositories/prismaClient";
import reviewsService from "@/services/reviews.serviceClient";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import useSWR from "swr";
import { ReviewItem } from "@/components/Review";
import { Text } from "@/components/Text";
import { ReactElement } from "react";

const reviewsServiceInstance = reviewsService(PrismaDBClient.instance);

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);

	if (!session?.user) return {
		redirect: {
			permanent: true,
			destination: '/'
		}
	};

	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const {
		result: reviews,
		error
	} = await reviewsServiceInstance.getReviewsByUserId(userId);

	return {
		props: {
			fallback: {
				[`/api/users/${userId}/reviews`]: error ? [] : reviews
			},
			url: `/api/users/${userId}/reviews`,
			userId
		}
	};
};

MyReviewsPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	url: string,
	fallback: { [key: string]: string },
	userId: number
}

export default function MyReviewsPage({ fallback, url, userId }: Props) {
	const fetcher = async (url: string = '') => {
		return await fetch(url).then(res => res.json()).then(({ reviews }) => reviews);
	};

	const { data, mutate } = useSWR((url ?? ''), fetcher, { fallback: (fallback ?? null) });

	const onDelete = async () => {
		await mutate();
	};

	return (
		<div className={styles.root}>
			<PageHeader
				title={'My Reviews'}
				description={'Find here all your written reviews and update them if you want.'}
			/>
			<div className={styles.reviewsContainer}>
				{data && data.length > 0 ? (
					data?.map((review: Review) => {
						return (
							<ReviewItem
								key={review.id}
								review={review}
								onRemove={onDelete}
								currentUserId={userId}
							/>
						);
					})
				) : (
					<Text>
						No reviews found
					</Text>
				)}
			</div>
		</div>
	);
}
