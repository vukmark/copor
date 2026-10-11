export interface CreateUserGroupReqBodyDTO {
	name: string;
	parentUserGroupId?: string;
	userList: string[]
}
