'use client';

import { paths } from '@/utils/paths';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import MenuIcon from '@mui/icons-material/Menu';
import MUIAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import cc from 'classcat';
import Link from 'next/link';
import { useState } from 'react';
import SideBarIcon from '../SideBar/SideBarIcon';
import { Text } from '../Text';
import styles from './AppBar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
	window?: () => Window,
	withBackground?: boolean
	withFullNavigation?: boolean
}

export default function AppBar({ window, withBackground = false, withFullNavigation = false }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useUser();

	const userRole = user && user[auth0Config.metadata] as {
		role: 'SP' | 'CUSTOMER',
		user_id: string
	};

	const isSP = userRole?.role === 'SP';

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined
	});

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const [anchorElAv, setAnchorElAv] = useState<null | HTMLElement>(null);

	const handleOpenAvMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElAv(event.currentTarget);
	};

	const handleCloseAvMenu = () => {
		setAnchorElAv(null);
	};

	return (
		<MUIAppBar className={cc([
			styles.root,
			trigger && styles.root_scroll,
			withBackground && styles.root_withBackground
		])}>
			<div className={styles.appBarContainer}>
				<div className={styles.mobileItems}>
					{withFullNavigation && (
						<>
							<IconButton
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon sx={{ fill: 'black' }}/>
							</IconButton>
							<Drawer
								anchor={'left'}
								open={!!anchorElNav}
								onClose={handleCloseNavMenu}
							>
								<div className={styles.topContainer}>
									<Link href={paths.home}>
										<Image
											src={'/images/icon.svg'}
											alt='food tracker icon'
											width={140}
											height={38}
											priority
											loading='eager'
										/>
									</Link>
								</div>
								<Divider/>
								<List>
									{paths.components.Dashboard.basic?.map(item => (
										<ListItemButton key={item.name} component='li'>
											<Link href={item.url} className={styles.listItemLink}>
												<SideBarIcon url={item.url} size='small'/>
												<Text
													bold={pathname === item.url}
													as='span'
													variant={'p'}
												>
													{item.name}
												</Text>
											</Link>
										</ListItemButton>
									))}
								</List>
								{isSP && (
									<>
										<Divider/>
										<List>
											{paths.components.Dashboard.business?.map(item => (
												<ListItemButton key={item.name} component='li'>
													<Link href={item.url} className={styles.listItemLink}>
														<SideBarIcon url={item.url} size='small'/>
														<Text
															bold={pathname === item.url}
															as='span'
															variant={'p'}
														>
															{item.name}
														</Text>
													</Link>
												</ListItemButton>
											))}
										</List>
									</>
								)}
								<Divider/>
								<List>
									<ListItemButton component='li' >
										<Link href={paths.auth0.logout} className={styles.listItemLink}>
											<SideBarIcon url='/api/auth/logout' size='small'/>
											<Text variant={'p'} as='span'>
												Logout
											</Text>
										</Link>
									</ListItemButton>
								</List>
							</Drawer>
						</>
					)}
				</div>
				<IconButton
					onClick={handleOpenAvMenu}
					color="inherit"
				>
					{user ? (
						<Avatar
							sx={{ width: 45, height: 45 }}
							alt="user image"
							src={user.picture || ''}
						/>
					) : (
						<Avatar sx={{ width: 45, height: 45 }}>
							<AccountCircleIcon/>
						</Avatar>
					)}
				</IconButton>
				<Menu
					id="menu-avatar"
					anchorEl={anchorElAv}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					keepMounted
					transformOrigin={{ vertical: 'top', horizontal: 'left' }}
					open={Boolean(anchorElAv)}
					onClose={handleCloseAvMenu}
				>
					{user && (
						<li className={styles.avatarText}>
							<Text semiBold>
								{`${user.name}`}
							</Text>
							<Text grey variant='small'>
								{`${user.email}`}
							</Text>
							<Divider/>
						</li>
					)}
					{(paths.components.AppBar[user ? 'customer' : 'visitor']).map(({ name, url }) => (
						<ListItemButton component={'li'} key={name} onClick={() => router.push(url)}
										className={styles.link}>
							<SideBarIcon url={url}/>
							<Text semiBold className={styles.menuItem} variant='smallest'>
								{name}
							</Text>
						</ListItemButton>
					))}
				</Menu>
			</div>
		</MUIAppBar>
	);
}
