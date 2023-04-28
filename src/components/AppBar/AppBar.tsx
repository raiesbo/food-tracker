import { paths } from '@/utils/paths';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import MUIAppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import cc from 'classcat';
import Link from 'next/link';
import { useState } from 'react';
import SideBarIcon from '../SideBar/SideBarIcon';
import { Text } from '../Text';
import styles from './AppBar.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/router";

type Props = {
	window?: () => Window,
	withBackground?: boolean
	withFullNavigation?: boolean
}

export default function AppBar({ window, withBackground = false, withFullNavigation = false }: Props) {
	const router = useRouter();
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
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
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
										<FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fill: 'black' }}/>
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
								<Divider />
								<List>
									<Link href='/api/auth/logout' className={styles.listItemLink}>
										<ListItemButton className={styles.listItemButton}>
											<SideBarIcon url='/api/auth/logout' size='small' />
											<Text semiBold variant={'smallest'}>
												Logout
											</Text>
										</ListItemButton>
									</Link>
								</List>
							</Drawer>
						</>
					)}
				</div>
				<IconButton
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleOpenAvMenu}
					color="inherit"
				>
					{user ? (
						<Avatar
							sx={{ width: 35, height: 35 }}
							alt="user image"
							src={user.picture || ''}
						/>
					) : (
						<Avatar sx={{ width: 35, height: 35 }}>
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
						<div className={styles.avatarText}>
							<Text semiBold>
								{`${user.name}`}
							</Text>
							<Text variant='small'>
								{`${user.email}`}
							</Text>
							<Divider/>
						</div>
					)}
					{(paths.components.AppBar[user ? 'customer' : 'visitor']).map(({ name, url }) => (
						<MenuItem key={name}>
							<Link href={url} className={styles.link}>
								<SideBarIcon url={url}/>
								<Text semiBold className={styles.menuItem} variant='smallest'>
									{name}
								</Text>
							</Link>
						</MenuItem>
					))}
				</Menu>
			</div>
		</MUIAppBar>
	);
}
