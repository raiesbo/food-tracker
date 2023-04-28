import { Text } from "@/components/Text";
import Link from "next/link";
import styles from './Breadcrumbs.module.scss';
import cc from 'classcat';

type Props = {
	items: Array<{ label: string, url?: string }>,
	className?: string
}

export default function Breadcrumbs({ items, className }: Props) {
	return (
		<div className={cc([styles.root, className])}>
			{items?.map(item => {
				if (item?.url) {
					return (
						<>
							<Link
								href={item.url}
								key={item.label}
								className={styles.link}
							>
								<Text variant={'small'} >
									{item.label}
								</Text>
							</Link>
							<Text grey variant={'small'} >
								/
							</Text>
						</>
					);
				} else {
					return (
						<div key={item.label}>
							<Text variant={'small'} grey>
								{item.label}
							</Text>
						</div>
					);
				}
			})}
		</div>
	);
}
