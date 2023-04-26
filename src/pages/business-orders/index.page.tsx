import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./BusinessOrders.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function BusinessOrders() {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'Food Truck Orders'} ></PageHeader>
                <div>
                    Content Comes here
                </div>
            </div>
        </LayoutWithSideBar>
    );
}
