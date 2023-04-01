import { NavigationMenu } from "@/components/NavigationMenu";
import { Container, CssBaseline } from "@mui/material";

export default function RestaurantDetailsPage() {
    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    Restaurant Details Page
                </div>
            </Container>
        </>
    )
}