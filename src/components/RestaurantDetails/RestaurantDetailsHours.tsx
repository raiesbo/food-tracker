import { Restaurant } from '@/types';
import { Schedule, Event } from '@prisma/client';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './RestaurantDetailsHours.module.scss';
import matchesWeekAndDay from "@/utils/matchesWeekAndDay";
import formatTime from "@/utils/formatTime";
import { createGoogleMapsUrl } from "@/utils";
import RestaurantDetailsHoursEvent from "@/components/RestaurantDetails/RestaurantDetailsHoursEvent";

type Props = {
    schedules: Restaurant['schedules'],
    events: Restaurant['events']
}

export default function RestaurantDetailsHours({ schedules, events }: Props) {
    return (
        <Card className={styles.root} withHover={false}>
            <Text as='h3'>
                Opening Hours
            </Text>
            <div className={styles.scheduleList}>
                {schedules?.map((schedule: Schedule) => {
                    const event = events.find(event => matchesWeekAndDay({
                        scheduleDay: schedule.day,
                        eventDate: event.date
                    }));
                    return event ? (
                        <RestaurantDetailsHoursEvent
                            day={schedule.day || ''}
                            event={event as Partial<Event>}
                        />
                        ) : (
                        <div key={schedule.id} className={styles.scheduleListItem}>
                            <Text bold variant={'smallest'}>
                                {schedule.day}
                            </Text>
                            {schedule.isOpen ? (
                                <Text variant={'smallest'}>
                                    {`${schedule.opening_hour} ${schedule.closing_hour}`}
                                </Text>
                            ) : (
                                <Text variant={'smallest'}>
                                    Closed
                                </Text>
                            )}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}
