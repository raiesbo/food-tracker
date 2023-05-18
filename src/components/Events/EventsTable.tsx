import RestaurantWithEvents from "@/types/RestaurantWithEvents";
import styles from "./EventsTable.module.scss";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Text } from "@/components/Text";
import TableBody from "@mui/material/TableBody";
import { Card } from "@/components/Card";
import EventsTableRow from "@/components/Events/EventsTableRow";
import { Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Event } from "@prisma/client";

type Props = {
	title: string,
	events: RestaurantWithEvents['events'],
	url: string
}
export default function EventsTable({ title, events, url }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className={styles.root}>
			<Table aria-label="collapsible table" stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className={styles.headerCell}>
							<IconButton
								aria-label="expand table"
								size="small"
								onClick={() => setIsOpen(!isOpen)}
							>
								{isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
							</IconButton>
							<Text variant={'h4'} bold>
								{title}
							</Text>
						</TableCell>
					</TableRow>
				</TableHead>
				<Collapse component={TableBody} in={isOpen} timeout="auto" unmountOnExit>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell align='left'>
									<Text bold variant='h4'>
										Name
									</Text>
								</TableCell>
								<TableCell align='center'>
									<Text bold variant='h4'>
										Date
									</Text>
								</TableCell>
								<TableCell align='center'>
									<Text bold variant='h4'>
										Opening Hour
									</Text>
								</TableCell>
								<TableCell align='center'>
									<Text bold variant='h4'>
										Closing Hour
									</Text>
								</TableCell>
								<TableCell align='center'>
									<Text bold variant='h4'>
										Locations
									</Text>
								</TableCell>
								<TableCell align="right">
									<Text bold variant='h4'>
										Actions
									</Text>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{events?.length > 0 ? (events.map(event => (
								<EventsTableRow
									key={event.id}
									event={event as Event}
									url={url}
								/>
							))) : (
								<TableRow>
									<TableCell>
										No Events Found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</Collapse>
			</Table>
		</Card>
	);
}
