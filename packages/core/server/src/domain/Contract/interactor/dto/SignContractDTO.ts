import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface SignContractDTO {
	contractType: ContractType;
	userId: string;
}