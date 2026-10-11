import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteChecklistItem extends TypedLogger<LogDataForDeleteChecklistItem> {
	getType(): string {
		return 'deleteChecklistItem';
	}
}

export interface LogDataForDeleteChecklistItem {
	deleteChecklistItemId: string;
}
