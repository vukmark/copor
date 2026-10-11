export interface ActivateTenantDTO {
	//activation creates the tenant's first admin user
	id: string;// new user Id
	firstName: string;
	lastName: string;
	userName?: string;
	actorId: string;
	tenantId: string;
}