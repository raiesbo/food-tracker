import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import CategoryIcon from "@mui/icons-material/Category";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function SideBarIcon({ url, size = 'inherit' }: {
    url: string,
    size?: "small" | "inherit" | "large" | "medium"
}) {
    if (url === '/profile') return <AccountBoxIcon fontSize={size} />;
    if (url === '/my-food-trucks') return <StorefrontIcon fontSize={size} />;
    if (url === '/reviews') return <RateReviewIcon fontSize={size} />;
    if (url === '/orders') return <ShoppingCartIcon fontSize={size} />;
    if (url === '/business-reviews') return <RateReviewIcon fontSize={size} />;
    if (url === '/categories') return <CategoryIcon fontSize={size} />;
    if (url === '/business-orders') return <FilterFramesIcon fontSize={size} />;
    if (url === '/events') return <EventAvailableIcon fontSize={size} />;
    if (url === '/api/auth/logout') return <LogoutIcon fontSize={size} />;
    if (url === '/api/auth/login') return <LoginIcon fontSize={size} />;
    if (url === '/signup') return <AppRegistrationIcon fontSize={size} />;
    return <HomeIcon fontSize={size} />;
}
