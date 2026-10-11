export interface IsInvalidUserListRepo {
	isInvalidUserList(userIdList: string[] | undefined): Promise<boolean>;
}
