import LayoutWithSideBar from "@/components/Layout/LayoutWithSideBar";
import services from "@/services";
import { auth0Config } from "@/utils/settings";
import { getSession } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";
import { Profile } from '@/components/Profile';

const { userService } = services;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession(context.req, context.res);
	const userId = session && session.user[auth0Config.metadata]?.user_id;

	const {
		result: user,
		error
	} = await userService.getUser(userId);

	if (error) return {
		redirect: {
			permanent: true,
			destination: '/'
		}
	};

	return {
		props: { user, auth0User: session?.user }
	};
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return (
		<LayoutWithSideBar>
			{page}
		</LayoutWithSideBar>
	);
};

type Props = {
	user: User,
	auth0User: UserProfile
}

export default function ProfilePage({ user, auth0User }: Props) {

	return (
		<Profile user={user} auth0User={auth0User}/>
	);
}
