export interface DoesUserGroupHaveNoChildrenRepo {
	doesUserGroupHaveChildren(userGroupId: string | undefined): Promise<boolean>;
}