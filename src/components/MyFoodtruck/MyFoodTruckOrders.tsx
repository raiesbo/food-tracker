import { User } from "@prisma/client";
import { useEffect, useState } from "react";

type Props = {
    userId: User['id']
}

export default function MyFoodTruckOrders({ userId }: Props) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch(`/api/users/${userId}/orders`).then(response => {
            console.log(response);
            if (response.ok) {
                return response.json();
            } else {
                return { restaurants: [] };
            }
        }).then(({ restaurants }) => {
            setRestaurants(restaurants);
            console.log({ restaurants });
        });
    }, [userId]);

    return (
        <div>
            Comming soon...
            {/* {restaurants.map((res: Restaurant & { orders: Array<Order> }) => {
                return (
                    <div key={res.id}>
                        {res.name}
                        {res.orders.map((order) => {
                            return (
                                <div key={order.id}>
                                    {order.userId}
                                </div>
                            )
                        })}
                    </div>
                )
            })} */}
        </div>
    );
}
