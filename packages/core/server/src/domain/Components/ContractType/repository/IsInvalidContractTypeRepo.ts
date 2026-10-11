export interface IsInvalidContractTypeRepo {
	isInvalidContractType(contractTypeId: string | undefined): Promise<boolean>;
}