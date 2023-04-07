import { Restaurant } from '@/types';
import { Schedule } from '@prisma/client';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './RestaurantDetailsHours.module.scss';

type Props = {
    schedules: Restaurant['schedules']
}

export default function RestaurantDetailsHours({ schedules }: Props) {
    return (
        <Card className={styles.root} withHover={false}>
            <Text as='h3'>
                Opening Hours
            </Text>
            <div className={styles.scheduleList}>
                {schedules?.map((schedule: Schedule) => (
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
                ))}
            </div>
        </Card>
    )
}