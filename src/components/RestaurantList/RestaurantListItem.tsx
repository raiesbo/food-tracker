import { paths } from "@/utils/paths"
import { Card } from "@mui/material"
import { Restaurant } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import styles from './restaurantListItem.module.scss'

type Props = {
    restaurant: Restaurant
}

const imagePlaceholder = 'https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2048&q=80'

export default function RestaurantListItem({ restaurant }: Props) {

    return (
        <Card>
            <Link
                href={`${paths.restaurants}/${restaurant.id}`}
                className={styles.root}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={imagePlaceholder}
                        alt='Restaurant image'
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.description}</p>
                    <p>{restaurant.description}</p>
                </div>
            </Link>
        </Card>
    )
}