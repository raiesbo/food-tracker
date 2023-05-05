import { paths } from '@/utils/paths';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Link from 'next/link';
import { Text } from '../Text';
import styles from './SideBar.module.scss';
import SideBarIcon from './SideBarIcon';
import { useRouter } from "next/router";
import Image from "next/image";

export default function SideBar() {
	const router = useRouter();
	const { user } = useUser();

	const userRole = user && user[auth0Config.metadata] as {
		role: 'SP' | 'CUSTOMER',
		user_id: string
	};

	const isSP = userRole?.role === 'SP';

	return (
		<Drawer
			className={styles.root}
			variant="permanent"
			anchor="left"
			sx={{ display: { xs: 'none', md: 'flex' } }}
		>
			<div className={styles.topContainer}>
				<Link href={paths.home}>
					<Image
						src={'/images/icon.svg'}
						alt='food tracker icon'
						width={140}
						height={38}
					/>
				</Link>
			</div>
			<Divider/>
			<List>
				{paths.components.Dashboard.basic?.map(item => (
					<Link href={item.url} key={item.name} className={styles.listItemLink}>
						<ListItemButton className={styles.listItemButton}>
							<SideBarIcon url={item.url} size='small'/>
							<Text bold={router.pathname === item.url} variant={'p'}>
								{item.name}
							</Text>
						</ListItemButton>
					</Link>
				))}
			</List>
			{isSP && (
				<>
					<Divider/>
					<List>
						{paths.components.Dashboard.business?.map(item => (
							<Link href={item.url} key={item.name} className={styles.listItemLink}>
								<ListItemButton className={styles.listItemButton}>
									<SideBarIcon url={item.url} size='small'/>
									<Text bold={router.pathname === item.url} variant={'p'}>
										{item.name}
									</Text>
								</ListItemButton>
							</Link>
						))}
					</List>
				</>
			)}
			<Divider/>
			<List>
				<Link href='/api/auth/logout' className={styles.listItemLink}>
					<ListItemButton className={styles.listItemButton}>
						<SideBarIcon url='/api/auth/logout' size='small'/>
						<Text variant={'p'}>
							Logout
						</Text>
					</ListItemButton>
				</Link>
			</List>
		</Drawer>
	);
}
