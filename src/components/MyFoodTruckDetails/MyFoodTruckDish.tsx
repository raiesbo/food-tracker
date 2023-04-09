import { Dish } from '@/types';
import styles from './MyFoodTruckDish.module.scss';

type Props = {
    dish: Dish
}

export default function MyGoodTruckDish({ dish }: Props) {

    return (
        <div key={dish.id} className={styles.root}>
            {dish.name}
        </div>
    )
}