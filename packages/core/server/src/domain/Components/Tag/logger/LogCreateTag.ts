import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateTag extends TypedLogger<LogDataForCreateTag> {
	getType(): string {
		return 'createTag';
	}
}
export interface LogDataForCreateTag {
	id: string;
	name: string;
	description?: string;
}

