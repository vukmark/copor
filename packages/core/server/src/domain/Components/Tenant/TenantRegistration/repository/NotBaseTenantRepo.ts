export interface NotBaseTenantRepo {
	isNotBaseTenant(tenantId: string | undefined): Promise<boolean>
}