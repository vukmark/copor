export interface IsUserNotInUserGroupRepo {
	isUserNotInUserGroup(userId: string | undefined, userGroupId: string | undefined): Promise<boolean>;
}
