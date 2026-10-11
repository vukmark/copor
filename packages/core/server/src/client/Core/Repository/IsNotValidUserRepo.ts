
export interface IsNotValidUserRepo {
	isNotValidUser(userId: string): Promise<boolean>;
}
