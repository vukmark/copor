import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface ValidateSignContractDTO {
	userId: string;
	contractType: ContractType;
	actorId: string;
}