import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ReactNode } from 'react';

type Props = {
    rating?: number,
    size?: "small" | "inherit" | "large" | "medium"
}

export default function RatingStars({ rating = 0, size = 'medium' }: Props) {
    const stars: Array<ReactNode> = [];

    for (let i = 0; i < Math.floor(rating); i++) {
        stars.push(<StarIcon key={stars.length} fontSize={size} />);
    }

    if (stars.length < 5 && !Number.isInteger(rating)) {
        stars.push(<StarHalfIcon key={stars.length} fontSize={size} />);
    }

    for (let i = stars.length; i < 5; i++) {
        stars.push(<StarOutlineIcon fontSize={size} key={stars.length} />);
    }

    return (
        <div>
            {stars}
        </div>
    );
}
