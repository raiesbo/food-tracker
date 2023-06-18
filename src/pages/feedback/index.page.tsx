import { Layout } from "@/components/Layout";
import styles from "./Feedback.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";
import { useToast } from "@/utils";
import { ToastAction } from "@/components/ToastContext";

export default function Feedback() {
	const router = useRouter();
	const { dispatch } = useToast();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [active, setActive] = useState(false);
	const [textActive, setTextActive] = useState(true);

	useEffect(() => {
		if (email.trim() === '' || message.trim() === '') {
			setActive(false);
		} else {
			setActive(true);
		}
	}, [email, message]);
	const onSendFeedback = () => {
		if (!active) return;

		setTextActive(false);
		setActive(false);

		setTimeout(() => {
			dispatch({ type: ToastAction.UPDATE_TOAST, payload: {
				severity: "success",
					message: 'Feedback sent successfully'
			} });

			router.push('/');
		}, 1500);
	};

	return (
		<Layout withTopMargin>
			<div className={styles.root}>
				<PageHeader title={'Feedback'}></PageHeader>
				<div className={styles.form}>
					<Text variant={'h4'} bold as='label'>
						Email <span style={{ color: 'red' }}>*</span>
						<TextField
							value={email}
							label=''
							type='email'
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							sx={{ mt: 1, backgroundColor: 'white' }}
							disabled={!textActive}
						/>
					</Text>
					<Text variant={'h4'} bold as='label'>
						Feedback <span style={{ color: 'red' }}>*</span>
						<TextField
							value={message}
							label=''
							type='text'
							onChange={(e) => setMessage(e.target.value)}
							fullWidth
							sx={{ mt: 1, backgroundColor: 'white' }}
							multiline
							minRows={5}
							disabled={!textActive}
						/>
					</Text>
					<div>
						<Button
							onClick={onSendFeedback}
							disabled={!active}
							variant='contained'
						>
							Send Feedback
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	);
}
