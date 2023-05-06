'use client';

import styles from './Events.module.scss';
import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import { PageHeader } from "@/components/PageHeader";
import Button from "@mui/material/Button";
import { Suspense, useState } from "react";
import EventsCreateModal from "@/components/Events/EventsCreateModal";
import { Text } from "@/components/Text";

type Props = {
	restaurants: Array<RestaurantWithEvents>
}

export default function Events({ restaurants }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onSetModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<main className={styles.root}>
			<PageHeader title={'Events'}>
				<Button
					variant='contained'
					onClick={onSetModal}
				>
					Create Event
				</Button>
			</PageHeader>
			<div>
				{restaurants?.length > 0 ? restaurants?.map(restaurant => (
					<div key={restaurant.id}>
						<Text bold variant='h3'>
							{restaurant.name}
						</Text>
						<div className={styles.eventsContainer}>
							{restaurant.events?.length > 0 ? restaurant.events.map(event => {
								return (
									<div key={event.id}>
										<Text>
											{event.name}
										</Text>
										<Text>
											{`${event.date}`}
										</Text>
									</div>
								);
							}) : (
								<div>
									No Events Found
								</div>
							)}
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
