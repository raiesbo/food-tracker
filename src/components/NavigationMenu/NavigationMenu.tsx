import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { paths } from '../../utils/paths';

type Props = {
    role?: 'SP' | 'CUSTOMER'
};

const urls = paths.components.NavigtionMenu;

export default function NavigationMenu({ role }: Props) {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FOOD TRACKER
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                (urls[role === 'SP'
                                    ? 'serviceProvider'
                                    : role === 'CUSTOMER'
                                        ? 'customer'
                                        : 'visitor']).map(({ name, url }) => (
                                            <MenuItem key={name}>
                                                <Link href={url}>
                                                    <Typography textAlign="center">
                                                        {name}
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                        ))
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            (urls[role === 'SP'
                                ? 'serviceProvider'
                                : role === 'CUSTOMER'
                                    ? 'customer'
                                    : 'visitor']).map(({ name, url }) => (
                                        <MenuItem key={name}>
                                            <Link href={url}>
                                                <Typography textAlign="center" sx={{ color: 'white', display: 'block' }}>
                                                    {name}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
