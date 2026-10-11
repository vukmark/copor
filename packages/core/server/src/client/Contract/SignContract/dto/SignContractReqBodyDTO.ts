import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface SignContractReqBodyDTO {
	userId: string;
	contractType: ContractType;
}