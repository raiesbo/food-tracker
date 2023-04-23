import { paths } from '@/utils/paths';
import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cc from 'classcat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Text } from '../Text';
import styles from './NavigationMenu.module.scss';

const urls = paths.components.NavigtionMenu;

export default function NavigationMenu() {
    const { user } = useUser();
    const router = useRouter()

    const userRole = user && user[auth0Config.metadata] as {
        role: 'SP' | 'CUSTOMER',
        user_id: string
    };

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <div className={styles.appBarContainer}>
                <Link href={paths.home}>
                    <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fill: 'black' }} />
                </Link>
                <div className={styles.mobileItems}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon sx={{ fill: 'black' }} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' }
                        }}
                    >
                        {(urls[userRole?.role === 'SP'
                            ? 'serviceProvider'
                            : userRole?.role === 'CUSTOMER'
                                ? 'customer'
                                : 'visitor']).map(({ name, url }) => (
                                    <MenuItem key={name}>
                                        <Link href={url} className={styles.link}>
                                            <Text bold={url === router.pathname} className={styles.menuItem}>
                                                {name}
                                            </Text>
                                        </Link>
                                    </MenuItem>
                                ))}
                    </Menu>
                </div>
                <nav className={styles.desktopItems}>
                    {(urls[userRole?.role === 'SP'
                        ? 'serviceProvider'
                        : userRole?.role === 'CUSTOMER'
                            ? 'customer'
                            : 'visitor']).map(({ name, url }) => (
                                <MenuItem key={name}>
                                    <Link href={url} className={styles.link}>
                                        <Text className={cc([
                                            styles.menuItem,
                                            url === router.pathname && styles.menuItem_bold
                                        ])}>
                                            {name}
                                        </Text>
                                    </Link>
                                </MenuItem>
                            ))}
                </nav>
            </div>
        </AppBar>
    );
}
