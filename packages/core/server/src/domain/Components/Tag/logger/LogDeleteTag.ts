import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForDeleteTag {
	tagId: string;
}

export class LogDeleteTag extends TypedLogger<LogDataForDeleteTag> {
	getType(): string {
		return 'deleteTag';
	}
}
