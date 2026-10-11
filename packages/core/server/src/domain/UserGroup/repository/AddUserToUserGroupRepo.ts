export interface AddUserToUserGroupRepo {
	add(userId: string, groupId: string): Promise<void>;
}