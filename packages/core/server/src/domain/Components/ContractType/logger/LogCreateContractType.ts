import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class LogCreateContractType extends TypedLogger<LogDataForCreateContractType> {
	getType(): string {
		return 'createContractType';
	}
}

export interface LogDataForCreateContractType {
	id: string;
	name: string;
	file: string;
	description?: string;
	publishStatus: PublishStatus;
}
