import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
	redirectUrl?: string;
}

export default async function getUser({ redirectUrl = '' }: Props = {}) {
	const cookie = cookies().get('appSession');

	const query = new URLSearchParams({ returnTo: redirectUrl });

	if (!cookie?.value) {
		return redirect(`/login?${query}`);
	}

	const response = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/me`, { headers: { cookie: `appSession=${cookie.value}` } });

	if (!response.ok || response.status === 204) {
		return redirect(`/login?${query}`);
	}

	return await response.json();
}
