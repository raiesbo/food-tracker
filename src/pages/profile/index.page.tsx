import { NavigationMenu } from "@/components/NavigationMenu";
import { CssBaseline } from "@mui/material";
import styles from './profile.module.scss';

export default function RestaurantPage() {

    return (
        <>
            <NavigationMenu />
            <main className={styles.root} >
                <CssBaseline />
                <div>
                    User Profile
                </div>
            </main>
        </>
    )
}