import { Layout } from "@/components/Layout";
import styles from "@/pages/orders/Orders.module.scss";
import { PageHeader } from "@/components/PageHeader";

export default function Feedback() {
	return (
		<Layout withTopMargin>
			<div className={styles.root}>
				<PageHeader title={'Feedback'}></PageHeader>
				<div>
					Under construction...
				</div>
			</div>
		</Layout>
	);
}
