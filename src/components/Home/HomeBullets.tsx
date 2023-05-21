import styles from './HomeBullets.module.scss';
import { Text } from "@/components/Text";

export default function HomeBullets() {
	return (
		<div className={styles.root}>
			<div className={styles.bulletsContainer}>
				<article className={styles.item}>
					<Text semiBold variant={'h4'}>Effortless Exploration</Text>
					<Text grey variant={'smallest'}>
						Discover nearby food trucks, ensuring they never miss out on their favorite flavors or
						exciting new options.
					</Text>
				</article>
				<article className={styles.item}>
					<Text semiBold variant={'h4'}>Global Coverage</Text>
					<Text grey variant={'smallest'}>
						Wherever you go, find and discover food trucks with ease, ensuring a reliable and enjoyable
						culinary experience no matter your location.
					</Text>
				</article>
				<article className={styles.item}>
					<Text semiBold variant={'h4'}>Trusted Ratings</Text>
					<Text grey variant={'smallest'}>
						With our comprehensive rating system, you can access real-time reviews and ratings for food trucks.
					</Text>
				</article>
			</div>
		</div>
	);
}
