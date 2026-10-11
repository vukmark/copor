export interface TenantAlreadyActivatedRepo {
	tenantAlreadyActivated(tenantId: string | undefined): Promise<boolean>
}