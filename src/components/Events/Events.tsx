'use client';

import styles from './Events.module.scss';
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import { PageHeader } from "@/components/PageHeader";
import Button from "@mui/material/Button";
import { Suspense, useState } from "react";
import EventsCreateModal from "@/components/Events/EventsCreateModal";
import { Text } from "@/components/Text";
import { useSWRConfig } from "swr";
import EventsTable from "@/components/Events/EventsTable";

type Props = {
	restaurants: Array<RestaurantWithEvents>,
	url: string
}

export default function Events({ restaurants, url }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { mutate } = useSWRConfig();

	const onSetModal = () => {
		setIsModalOpen(!isModalOpen);
		mutate(url);
	};

	return (
		<main className={styles.root}>
			<PageHeader title={'Events'}>
				<Button variant='contained' onClick={onSetModal}>
					Create Event
				</Button>
			</PageHeader>
			<div>
				{restaurants?.length > 0 ? restaurants?.map(restaurant => (
					<div key={restaurant.id} className={styles.restaurantSection}>
						<Text bold variant='h3'>
							{restaurant.name}
						</Text>
						<div className={styles.eventsContainer}>
							<EventsTable
								title={'Current Events'}
								events={restaurant.events}
								url={url}
							/>
						</div>
					</div>
				)) : (
					<div>
						No Food Trucks found
					</div>
				)}
			</div>
			<Suspense fallback={<p>Loading the Modal</p>}>
				<EventsCreateModal
					isOpen={isModalOpen}
					onClose={onSetModal}
					restaurants={restaurants}
				/>
			</Suspense>
		</main>
	);
}
