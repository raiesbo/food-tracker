import { auth0Config } from '@/utils/settings';
import { useUser } from '@auth0/nextjs-auth0/client';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { paths } from '@/utils/paths';
import styles from './NavigationMenu.module.scss';

const urls = paths.components.NavigtionMenu;

export default function NavigationMenu() {
    const { user } = useUser();

    const userRole = user && user[auth0Config.metadata] as {
        role: 'SP' | 'CUSTOMER',
        user_id: string
    };

    const [ anchorElNav, setAnchorElNav ] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container component='div' maxWidth="xl">
                <Toolbar disableGutters>
                    <Link href={paths.home}>
                        <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fill: 'black' }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
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
                                                <Typography textAlign="center" sx={{ color: 'black', display: 'block' }}>
                                                    {name}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {(urls[userRole?.role === 'SP'
                            ? 'serviceProvider'
                            : userRole?.role === 'CUSTOMER'
                                ? 'customer'
                                : 'visitor']).map(({ name, url }) => (
                                    <MenuItem key={name}>
                                        <Link href={url} className={styles.link}>
                                            <Typography textAlign="center" sx={{ color: 'black', display: 'block' }}>
                                                {name}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
