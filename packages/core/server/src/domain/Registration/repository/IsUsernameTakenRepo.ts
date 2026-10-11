export interface IsUsernameTakenRepo {
	isUsernameTaken(userName: string): Promise<boolean>;
}
