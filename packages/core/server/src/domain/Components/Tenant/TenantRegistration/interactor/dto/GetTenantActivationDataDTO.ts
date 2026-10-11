export interface GetTenantActivationDataDTO {
	id: string; // tenant id
	name: string;
	isBaseTenant: boolean;
	contractSigned: boolean;
	email: string; // tenant email
}