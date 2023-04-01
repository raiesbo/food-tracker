import { NavigationMenu } from "@/components/NavigationMenu";
import { Container, CssBaseline } from "@mui/material";


export default function MyNewRestaurant() {

    return (
        <>
            <NavigationMenu />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                    New Restaurant Page
                </div>
            </Container>
        </>
    )
}