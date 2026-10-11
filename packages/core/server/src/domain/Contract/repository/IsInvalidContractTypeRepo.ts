import {ContractType} from '../../Core/enum/ContractType';

export interface IsInvalidContractTypeRepo {
	isInvalidContractType(contractType: ContractType | undefined): Promise<boolean>;
}