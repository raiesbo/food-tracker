import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import styles from "./Categories.module.scss";
import { PageHeader } from "@/components/PageHeader";
import { GetServerSidePropsContext } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { auth0Config } from "@/utils/settings";
import categoriesService from "@/services/category.serviceClient";
import PrismaDBClient from "@/repositories/prismaClient";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Text } from '@/components/Text';
import { Card } from "@/components/Card";
import Button from "@mui/material/Button";
import { ChangeEvent, ReactElement, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Category } from "@/types";
import { useToast } from "@/utils";
import { ToastAction } from "@/components/ToastContext";

const categoriesServiceInstance = categoriesService(PrismaDBClient.instance);
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getSession(context.req, context.res);
	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const {
		result: categories,
		error
	} = await categoriesServiceInstance.getCategoriesByUserId(userId);

	if (error) return {
		redirect: {
			permanent: true,
			destination: '/'
		}
	};

	return {
		props: { categories, auth0User: session?.user, userId }
	};
};

CategoriesPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	categories: Array<Category>,
	auth0User: UserProfile,
	userId: string
}

export default function CategoriesPage({ categories, userId }: Props) {
	const { dispatch } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [categoryList, setCategoryList] = useState(categories);

	const timeFormat = new Intl.DateTimeFormat("es",);

	const onAddCategory = () => {
		setCategoryList(state => ([
			...state,
			{ id: Math.ceil(Math.random() * 100000), name: 'New Category' }
		] as Array<Category>));
	};

	const onRemoveCategory = (catId: Category['id']) => {
		setIsLoading(true);

		fetch(`/api/categories/${catId}`, {
			method: 'DELETE'
		}).then(response => {
			if (response.ok) {
				setCategoryList([...categoryList.filter(({ id }) => id !== catId)]);
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'Category successfully removed',
						severity: 'success'
					}
				});
			} else {
				dispatch({
					type: ToastAction.UPDATE_TOAST, payload: {
						message: 'Error while deleting a category',
						severity: 'error'
					}
				});
			}
		}).finally(() => setIsLoading(false));
	};

	const onSaveNewCategory = (catId: Category['id']) => {
		setIsLoading(true);

		const catToSave = categoryList.find(({ id }) => id === catId);

		fetch(`/api/categories`, {
			method: 'POST',
			body: JSON.stringify({ name: catToSave?.name, userId })
		}).then(response => response.json()).then(({ category }) => {
			if (category.id) {
				setCategoryList([...categoryList.map(cat => cat.name === category.name ? category : cat)]);
			} else {
				alert('Server Error');
			}
		}).finally(() => setIsLoading(false));
	};

	const onCancelNewCategory = (catId: Category['id']) => {
		setCategoryList([...categoryList.filter(({ id }) => id !== catId)]);
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setCategoryList([...categoryList.map(category => (
			category.id === Number(name) ? { ...category, name: value } : category
		))]);
	};

	return (
		<div className={styles.root}>
			<PageHeader
				title={'Food Types'}
				description={'Create as many categories as you need to perfectly describe your food trucks. *After being assigned to a food truck, can not be removed.'}
			/>
			<Card className={styles.card}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<Text bold variant='h4'>
									Name
								</Text>
							</TableCell>
							<TableCell align="right">
								<Text bold variant='h4'>
									Create at
								</Text>
							</TableCell>
							<TableCell align="right">
								<Text bold variant='h4'>
									Assigned to
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
						{categoryList?.map((category) => (
							<TableRow
								key={category.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{category.userId ? (
										<Text semiBold>
											{category.name}
										</Text>
									) : (
										<TextField
											name={`${category.id}`}
											value={category.name}
											onChange={onChange}
											disabled={isLoading}
											className={styles.textInput}
										/>
									)}
								</TableCell>
								<TableCell align="right">
									{category.createdAt && (
										<Text>
											{timeFormat.format(new Date(category.createdAt))}
										</Text>
									)}
								</TableCell>
								<TableCell align="right">
									{category._count?.restaurants && (
										<Text>
											{category._count.restaurants}
										</Text>
									)}
								</TableCell>
								<TableCell align="right">
									{category.userId ? (
										<IconButton
											size='small'
											onClick={() => onRemoveCategory(Number(category.id))}
											disabled={isLoading || !!category._count.restaurants}
											aria-label='remove category'
										>
											<DeleteIcon/>
										</IconButton>
									) : (
										<div className={styles.tableButtonContent}>
											<IconButton
												size='small'
												onClick={() => onSaveNewCategory(Number(category.id))}
												disabled={isLoading}
											>
												<SaveIcon color='success'/>
											</IconButton>
											<IconButton
												size='small'
												onClick={() => onCancelNewCategory(Number(category.id))}
												disabled={isLoading}
											>
												<CancelIcon color='error'/>
											</IconButton>
										</div>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
			<div className={styles.buttonContainer}>
				<Button
					variant="outlined"
					onClick={onAddCategory}
					disabled={isLoading}
				>
					Add new category
				</Button>
			</div>
		</div>
	);
}
