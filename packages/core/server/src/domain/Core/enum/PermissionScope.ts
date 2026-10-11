export enum PermissionScope {
	OWN = 'OWN',
	TENANT = 'TENANT',
	ALL = 'ALL'
}

export const scopePriority: Record<PermissionScope, number> = {
	[PermissionScope.OWN]: 10,
	[PermissionScope.TENANT]: 20,
	[PermissionScope.ALL]: 30
};
