import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class LogUpdateContractType extends TypedLogger<LogDataForUpdateContractType> {
	getType(): string {
		return 'updateContractType';
	}
}

export interface LogDataForUpdateContractType {
	id: string;
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
}
