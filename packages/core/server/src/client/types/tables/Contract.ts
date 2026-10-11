import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export interface Contract {
	id: string;
	name: string;
	type: ContractType;
}
