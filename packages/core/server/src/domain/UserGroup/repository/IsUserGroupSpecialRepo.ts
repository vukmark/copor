export interface IsUserGroupSpecialRepo {
	isUserGroupSpecial(groupId: string | undefined): Promise<boolean>;
}