export interface SetUserGroupUserListRepo {
	set(groupId: string, userList: string[]): Promise<void>;
}