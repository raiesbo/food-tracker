import useSWR from "swr";

export default function useData<T>(url: string = '/', defaultData: T) {
	const fetcher = (url: string) => {
		return fetch(url).then(response => response.json());
	};
	const { data, error, mutate } = useSWR(url, fetcher, {
			fallback: defaultData && { [url]: defaultData },
			revalidateOnMount: false,
			revalidateOnFocus: false
		}
	);

	return { data, error, mutate };
}
