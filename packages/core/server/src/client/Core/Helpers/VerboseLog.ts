export const verboseLog = (message: string) => {
	if (process.env.VERBOSE_LOGGING !== 'false') {
		console.log(message);
	}
};