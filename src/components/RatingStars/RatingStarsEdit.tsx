import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';
import { ReactNode } from 'react';

type Props = {
    rating?: number,
    onChange: (e: number) => void
}

export default function RatingStars({ rating = 0, onChange }: Props) {
    let stars: Array<ReactNode> = [];

    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) {
            stars.push(
                <IconButton key={i} onClick={() => onChange(i + 1)}>
                    <StarIcon />
                </IconButton>
            );
        }
        if (i >= Math.floor(rating) && i < 5) {
            stars.push(
                <IconButton key={i} onClick={() => onChange(i + 1)}>
                    <StarOutlineIcon />
                </IconButton >
            );
        }
    }

    return (
        <div>
            {stars}
        </div>
    );
}
