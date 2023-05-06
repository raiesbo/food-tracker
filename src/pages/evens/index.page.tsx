import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./Events.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function Events() {
    return (
        <LayoutWithSideBar>
            <div className={styles.root}>
                <PageHeader title={'Events'} ></PageHeader>
                <div>
                    Content Comes here
                </div>
            </div>
        </LayoutWithSideBar>
    );
}
