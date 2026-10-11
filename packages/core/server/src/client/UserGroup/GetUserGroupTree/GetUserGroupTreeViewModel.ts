export interface GetUserGroupTreeViewModel {
	id: string;
	name: string;
	canEdit: boolean;
	canCreateChildren: boolean;
	children: GetUserGroupTreeViewModel[];
}