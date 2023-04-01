import { NavigationMenu } from "@/components/NavigationMenu";
import { Container, CssBaseline } from "@mui/material";

export default function RestaurantPage() {

    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    User Profile
                </div>
            </Container>
        </>
    )
}