export interface IsNotValidUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean>;
}