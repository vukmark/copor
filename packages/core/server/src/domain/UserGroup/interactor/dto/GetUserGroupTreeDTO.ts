export interface GetUserGroupTreeDTO {
	id: string;
	name: string;
	canEditName: boolean;
	canEditMembers: boolean;
	canCreateChildren: boolean;
	children: GetUserGroupTreeDTO[];
}