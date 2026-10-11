export interface IsInvalidTenantRepo {
	isInvalidTenant(tenantId: string | undefined): Promise<boolean>;
}
