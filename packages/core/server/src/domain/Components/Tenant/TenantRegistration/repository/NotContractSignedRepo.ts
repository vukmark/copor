export interface NotContractSignedRepo {
	isNotContractSigned(tenantId: string | undefined): Promise<boolean>
}