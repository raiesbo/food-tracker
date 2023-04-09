import { Ingredient } from "@prisma/client"

type Props = {
    ingredients: Array<Ingredient>
}

export default function MyFoodTruckIngredients({ ingredients }: Props) {
    return (
        <div>
            hi
        </div>
    )
}