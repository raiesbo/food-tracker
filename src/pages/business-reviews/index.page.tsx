import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./BusinessReviews.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function BusinessReviews() {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'Food Truck Reviews'} ></PageHeader>
                <div>
                    Content Comes here
                </div>
            </div>
        </LayoutWithSideBar>
    );
}
