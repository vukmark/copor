export interface PasswordHistoryRepo {
	wasPasswordRecentlyUsed(authUserId: string, password: string): Promise<boolean>;
}
