import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteContractType extends TypedLogger<LogDataForDeleteContractType> {
	getType(): string {
		return 'deleteContractType';
	}
}

export interface LogDataForDeleteContractType {
	contractTypeId: string;
}