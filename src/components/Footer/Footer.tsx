import Link from 'next/link';
import styles from './Footer.module.scss';
import cc from 'classcat';
import { paths } from "@/utils/paths";
import { Text } from '@/components/Text';
import GitHubIcon from '@mui/icons-material/GitHub';

const footerPaths = paths.components.footer;

type Props = {
	withSideBar?: boolean
}
export default function Footer({ withSideBar = false }: Props) {

	return (
		<footer className={cc([styles.root, withSideBar && styles.root_withSideBar])}>
			<div className={styles.footerContent}>
				<div className={styles.footerContentColumn}>
					<Text bold variant={'h4'}>
						Relevant Information
					</Text>
					<div className={styles.linksContainer}>
						{footerPaths?.map(path => (
							<Link key={path.name} href={path.url} className={styles.link}>
								{path.name}
							</Link>
						))}
					</div>
				</div>
				<div className={styles.footerContentColumn}>
					<Text bold variant={'h4'}>
						Check out the Code
					</Text>
					<div className={styles.linksContainer}>
						<Link href='https://github.com/raiesbo/food-tracker' className={styles.link}>
							<GitHubIcon />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
