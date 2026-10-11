import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteAiContextItem extends TypedLogger<LogDataForDeleteAiContextItem> {
	getType(): string {
		return 'deleteAiContextItem';
	}
}

export interface LogDataForDeleteAiContextItem {
	aiContextItemId: string;
}