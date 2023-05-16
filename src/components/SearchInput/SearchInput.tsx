import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import styles from './SearchInput.module.scss';

type Props = {
	value: string,
	onUpdate: (e: string) => void,
	placeholder?: string
}

export default function SearchInput({ value, onUpdate, placeholder }: Props) {
	return (
		<div className={styles.root}>
			<SearchIcon/>
			<InputBase
				value={value}
				onChange={e => onUpdate(e.target.value)}
				placeholder={placeholder || "Search…"}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</div>
	);
}
