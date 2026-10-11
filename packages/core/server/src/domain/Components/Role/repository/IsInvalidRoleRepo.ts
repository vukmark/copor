export interface IsInvalidRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean>;
}
