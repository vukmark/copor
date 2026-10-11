import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetContractType extends TypedLogger<LogDataForGetContractType> {
	getType(): string {
		return 'getContractType';
	}
}

export interface LogDataForGetContractType {
	contractTypeId: string;
}