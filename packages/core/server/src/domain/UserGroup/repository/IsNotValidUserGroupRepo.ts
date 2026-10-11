export interface IsInvalidUserGroupRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean>;
}