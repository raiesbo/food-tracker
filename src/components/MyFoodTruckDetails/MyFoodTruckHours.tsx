import styles from "./MyFoodTruckHours.module.scss";
import { InfoSection } from "@/components/InfoSection";
import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Schedule } from "@prisma/client";
import { useReducer, useState } from "react";
import Button from "@mui/material/Button";
import cc from 'classcat';
import RestaurantWithRelations from "@/types/RestaurantWithRelations";
import { useData, useToast } from "@/utils";
import { ToastAction } from "@/components/ToastContext";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { timeStamps } from "@/utils/variables";

type Props = {
	schedules: Array<Schedule>,
	restaurantId: RestaurantWithRelations['id']
}

export default function MyFoodTruckHours({ schedules, restaurantId }: Props) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { mutate } = useData(`/api/restaurants/${restaurantId}`, {});
	const { dispatch } = useToast();

	const [times, updateTimes] = useReducer((
		prevState: Array<Schedule>,
		currentState: { id: number, property: string, value: string | boolean }
	) => {
		return [...prevState.map((schedule) => (
			schedule.id === currentState.id ? { ...schedule, [currentState.property]: currentState.value } : schedule
		))];
	}, schedules);

	const onSaveSchedules = () => {
		setIsLoading(true);

		fetch(`/api/schedules`, {
			method: 'PUT',
			body: JSON.stringify(times)
		}).then(response => {
			dispatch({
				type: ToastAction.UPDATE_TOAST, payload: response.ok ? {
					message: 'Restaurant successfully removed',
					severity: 'success'
				} : {
					message: 'There has been a server error',
					severity: 'error'
				}
			});
			if (response.ok) mutate();
		}).finally(() => {
			setIsLoading(false);
			setIsUpdate(false);
		});
	};

	return (
		<Card className={styles.root}>
			<InfoSection title="Opening Hours" childrenClassName={styles.item}>
				{schedules?.map((schedule) => {
					const timeToUpdate = times.find(time => time.id === schedule.id);
					return (
						<div key={schedule.id} className={cc([
							styles.scheduleListItem,
							isUpdate && styles.scheduleListItem_update
						])}>
							<div className={styles.dayHeader}>
								<Text bold variant={'smallest'}>
									{schedule.day}
								</Text>
								{isUpdate && (
									<FormControlLabel control={
										<Checkbox
											disabled={!isUpdate || isLoading}
											checked={timeToUpdate?.isOpen || false}
											onChange={e => updateTimes({
												id: schedule.id,
												value: e.target.checked,
												property: 'isOpen'
											})}
										/>
									} label="Is Open"/>
								)}
							</div>
							{isUpdate && timeToUpdate ? (
								<div className={styles.updateHoursContainer}>
									<Select
										value={timeToUpdate.openingHour || ''}
										className={styles.textInput}
										onChange={e => updateTimes({
											id: schedule.id,
											value: e.target.value,
											property: 'openingHour'
										})}
									>
										{timeStamps.map(stamp => (
											<MenuItem key={stamp} value={stamp}>{stamp}</MenuItem>
										))}
									</Select>
									-
									<Select
										value={timeToUpdate.closingHour || ''}
										className={styles.textInput}
										onChange={e => updateTimes({
											id: schedule.id,
											value: e.target.value,
											property: 'closingHour'
										})}
									>
										{timeStamps.map(stamp => (
											<MenuItem key={stamp} value={stamp}>{stamp}</MenuItem>
										))}
									</Select>
								</div>
							) : (
								<>
									{
										schedule.isOpen ? (
											<Text variant={'smallest'}>
												{`${schedule.openingHour} - ${schedule.closingHour}`}
											</Text>
										) : (
											<Chip label='Closed' size='small' color='error'/>
										)
									}
								</>
							)}

						</div>
					);
				})}
				<div className={styles.buttonsContainer}>
					{isUpdate ? (
						<>
							<Button
								onClick={() => setIsUpdate(false)}
								variant='outlined'
								color='error'
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button
								onClick={onSaveSchedules}
								variant='outlined'
								color='success'
								disabled={isLoading}
							>
								Save
							</Button>
						</>
					) : (
						<Button
							onClick={() => setIsUpdate(true)}
							variant='outlined'
							disabled={isLoading}
						>
							Update
						</Button>
					)}
				</div>
			</InfoSection>
		</Card>
	);
}
