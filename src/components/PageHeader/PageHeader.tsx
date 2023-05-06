'use client';

import { Text } from "@/components/Text";
import { ReactNode } from "react";
import styles from './PageHeader.module.scss';
import cc from 'classcat';

type Props = {
	title: string;
	children?: ReactNode,
	className?: string,
	childrenClassName?: string
}

export default function PageHeader({ children, title, className, childrenClassName }: Props) {
	return (
		<header className={cc([styles.root, className])}>
			<Text as='h1' variant={{ small: 'h2', large: 'h1' }} bold>
				{title}
			</Text>
			<div className={cc([childrenClassName])}>
				{children}
			</div>
		</header>
	);
}
