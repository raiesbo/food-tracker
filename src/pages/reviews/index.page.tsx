import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./MyReviews.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function MyReviews() {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'My Reviews'} ></PageHeader>
                <div>
                    Content Comes here
                </div>
            </div>
        </LayoutWithSideBar>
    );
}
