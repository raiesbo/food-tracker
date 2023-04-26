import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./Orders.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function Orders() {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'My Orders'} ></PageHeader>
                <div>
                    Content Comes here
                </div>
            </div>
        </LayoutWithSideBar>
    );
}
