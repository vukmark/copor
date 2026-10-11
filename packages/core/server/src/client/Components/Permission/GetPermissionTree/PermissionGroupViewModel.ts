export enum PermissionGroupType {
	USER_GROUP = 'USER_GROUP'
}

export interface PermissionGroupViewModel {
	id: string;
	name: string;
	canEdit: boolean;
	children: PermissionGroupViewModel[];
	groupType: PermissionGroupType;
}
