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
import { usePathname } from "next/navigation";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import useSWR from "swr";

export default function SideBar() {
	const pathname = usePathname();
	const { user } = useUser() as { user: { [key: string]: { user_id: string } } };

	const userId = user && user[auth0Config.metadata as string].user_id;

	const userRole = user && user[auth0Config.metadata] as {
		role: 'SP' | 'CUSTOMER',
		user_id: string
	};

	const isSP = userRole?.role === 'SP';

	const { data } = useSWR(`/api/users/${userId}/orders/count`, (url: string) => {
		if (!isSP) return 0;
		return fetch(url).then(response => response.json());
	});

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
					<li key={item.name}>
						<Link href={item.url} className={styles.listItemLink}>
							<ListItemButton className={styles.listItemButton}>
								<SideBarIcon url={item.url} size='small'/>
								<Text
									bold={pathname === item.url}
									variant={'p'}
								>
									{item.name}
								</Text>
							</ListItemButton>
						</Link>
					</li>
				))}
			</List>
			{isSP && (
				<>
					<Divider/>
					<List>
						{paths.components.Dashboard.business?.map(item => (
							<li key={item.name}>
								<Link
									href={item.url.replaceAll('{userId}', userRole?.user_id)}
									key={item.name}
									className={styles.listItemLink}
								>
									<ListItemButton className={styles.listItemButton}>
										{item.name === 'Orders' ? (
											<Badge badgeContent={data} color="error">
												<SideBarIcon url={item.url} size='small'/>
											</Badge>
										) : (
											<SideBarIcon url={item.url} size='small'/>
										)}
										<Text
											bold={pathname === item.url.replaceAll('{userId}', userRole?.user_id)}
											variant={'p'}
										>
											{item.name}
										</Text>
									</ListItemButton>
								</Link>
							</li>
						))}
					</List>
				</>
			)}
			<Divider/>
			<List>
				<li>
					<Link href={paths.auth0.logout} className={styles.listItemLink}>
						<ListItemButton className={styles.listItemButton}>
							<SideBarIcon url='/api/auth/logout' size='small'/>
							<Text variant={'p'}>
								Logout
							</Text>
						</ListItemButton>
					</Link>
				</li>
			</List>
		</Drawer>
	);
}
