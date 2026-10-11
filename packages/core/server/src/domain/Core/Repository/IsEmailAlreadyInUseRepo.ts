export interface IsEmailAlreadyInUseRepo {
	isEmailAlreadyInUse(email: string): Promise<boolean>;
}
