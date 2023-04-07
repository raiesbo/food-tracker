import { Restaurant } from '@/types';
import { createGoogleMapsUrl } from '@/utils';
import { Location } from '@prisma/client';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './RestaurantDetailsContact.module.scss';

type Props = {
    user: Restaurant['user'],
    location: Location,
}

export default function RestaurantDetailsContact({ user, location }: Props) {
    return (
        <Card className={styles.root} withHover={false}>
            <Text as='h3'>
                Contact Information
            </Text>

            <div className={styles.infoSlot}>
                <Text as='h4' variant='smallest' bold>
                    Manager
                </Text>
                <Text>
                    {`${user?.firstName} ${user?.lastName}`}
                </Text>
            </div>
            <div className={styles.infoSlot}>
                <Text as='h4' variant='smallest' bold>
                    Email
                </Text>
                <Text>
                    {`${user?.email}`}
                </Text>
            </div>
            {user?.phone && (
                <div className={styles.infoSlot}>
                    <Text as='h4' variant='smallest' bold>
                        Phone Number
                    </Text>
                    <Text>
                        {`${user?.phone}`}
                    </Text>
                </div>
            )}
            {location && (
                <div className={styles.infoSlot}>
                    <Text as='h4' variant='smallest' bold>
                        Address
                    </Text>
                    <a
                        target="_blank"
                        rel="noreferrer noopener"
                        href={createGoogleMapsUrl({
                            streetName: location.streetName || '',
                            streetNumber: location.streetNumber,
                            city: location.city,
                            zip: location.zip,
                        })}
                    >
                        <Text>
                            {`${location.streetName} ${location.streetNumber}`}
                        </Text>
                        <Text>
                            {`${location.city}, ${location.country}`}
                        </Text>
                    </a>
                </div>
            )}
        </Card>
    )
}