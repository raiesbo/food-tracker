type RequestResult<T> = {
	result: T,
	error?: { status: number, message: string }
}

export default RequestResult;
