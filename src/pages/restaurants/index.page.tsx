import { NavigationMenu } from "@/components/NavigationMenu";
import { auth0Config } from "@/utils/settings";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function RestaurantPage() {
    const { user } = useUser();

    const userRole = user && user[auth0Config.metadata] as {
        role: 'SP' | 'CUSTOMER',
        user_id: string
    };

    return (
        <div>
            <NavigationMenu role={userRole?.role} />
            <div>
                Restaurant Page
            </div>
        </div>
    )
}