import { NavigationMenu } from "@/components/NavigationMenu";
import { CssBaseline } from "@mui/material";


export default function MyNewRestaurant() {

    return (
        <>
            <NavigationMenu />
            <main>
                <CssBaseline />
                <div>
                    New Restaurant Page
                </div>
            </main>
        </>
    )
}