import { Dish, Restaurant } from "@/types";
import { Button } from "@mui/material";
import { useState } from "react";
import { InfoSection } from "../InfoSection";
import MyFoodTruckDish from "./MyFoodTruckDish";
import styles from './MyFoodTruckMenu.module.scss';

type Props = {
    menu: Array<Dish>,
    restaurantid: Restaurant['id']
}

export default function MyFoodTruckMenu({ menu, restaurantid }: Props) {
    const [ restaurantMenu, setRestaurantMenu ] = useState(menu);
    const [ isLoading, setIsLoading ] = useState(false);

    const onCreateDish = () => {
        setIsLoading(true);

        fetch(`/api/restaurants/${restaurantid}/dishes`, {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            alert('Server Error');
        }).then(({ dish }) => {
            setRestaurantMenu((state => ([ ...state, dish ])));
        }).finally(() => setIsLoading(false));
    };

    return (
        <InfoSection
            title='Menu'
            childrenClassName={styles.root}
        >
            <div className={styles.dishes}>
                {restaurantMenu.map((dish) => (
                    <MyFoodTruckDish key={dish.id} dish={dish} />
                ))}
            </div>
            <Button
                variant="contained"
                onClick={onCreateDish}
                disabled={isLoading}
            >
                ADD NEW DISH
            </Button>
        </InfoSection>
    );
}
