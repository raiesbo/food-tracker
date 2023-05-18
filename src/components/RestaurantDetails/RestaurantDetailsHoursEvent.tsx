import { Card } from "@/components/Card";
import styles from "./RestaurantDetailsHoursEvent.module.scss";
import { Text } from "@/components/Text";
import formatTime from "@/utils/formatTime";
import { createGoogleMapsUrl } from "@/utils";
import { Event, Location } from "@prisma/client";
import { useState } from "react";

type Props = {
	day: string,
	event: Partial<Event & { location: Location }>
}

export default function RestaurantDetailsHoursEvent({ day, event }: Props) {
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<div
			className={styles.root}
			onClick={() => setIsCollapsed(!isCollapsed)}
		>
			<div className={styles.eventCard}>
				<header>
					<Text grey className={styles.subHeader}>
						Event
					</Text>
					<Text bold variant={'smallest'}>
						{day}
					</Text>
				</header>
				<Text variant={'smallest'}>
					{`${formatTime(event.opening_hour)} ${formatTime(event.closing_hour)}`}
				</Text>
			</div>
			{isCollapsed && (
				<div className={styles.footer}>
					<Text grey className={styles.subHeader}>
						Address
					</Text>
					<a
						target="_blank"
						rel="noreferrer noopener"
						href={createGoogleMapsUrl({
							streetName: event.location?.streetName || '',
							streetNumber: event.location?.streetNumber,
							city: event.location?.city,
							zip: event.location?.zip
						})}
					>
						<Text variant={'small'}>
							{`${event.location?.streetName} ${event.location?.streetNumber} ${event.location?.city || ''} ${event.location?.country || ''}`}
						</Text>
					</a>
				</div>
			)}
		</div>
	);
}
