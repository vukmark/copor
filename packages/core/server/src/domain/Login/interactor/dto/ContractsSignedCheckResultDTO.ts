import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface ContractsSignedCheckResultDTO {
	tenantId: string;
	tenantName: string;
	missingContracts: {
		type: ContractType;
		name: string;
	}[];
}
