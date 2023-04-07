import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ReactNode } from 'react';

type Props = {
    rating?: number
}

export default function RatingStars({ rating = 0 }: Props) {
    const stars: Array<ReactNode> = [];

    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<StarIcon key={stars.length} />)
    }

    if (stars.length < 5 && !Number.isInteger(rating)) {
        stars.push(<StarHalfIcon key={stars.length} />)
    }

    for (let i = stars.length; i < 5; i++) {
        stars.push(<StarOutlineIcon key={stars.length} />)
    }

    return (
        <div>
            {stars}
        </div>
    )
}