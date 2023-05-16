import { Text } from "@/components/Text";
import { ReactNode } from "react";
import styles from './PageHeader.module.scss';
import cc from 'classcat';

type Props = {
	title: string;
	description?: string;
	children?: ReactNode,
	className?: string,
	childrenClassName?: string
}

export default function PageHeader({ children, title, description, className, childrenClassName }: Props) {
	return (
		<header className={cc([styles.root, className])}>
			<div>
				<Text as='h1' variant={{ small: 'h2', large: 'h1' }} bold>
					{title}
				</Text>
				{description && (
					<Text variant={'smallest'}>
						{description}
					</Text>
				)}
			</div>
			<div className={cc([childrenClassName])}>
				{children}
			</div>
		</header>
	);
}
