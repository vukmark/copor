import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateChecklistItem extends TypedLogger<LogDataForUpdateChecklistItem> {
	getType(): string {
		return 'editChecklistItem';
	}
}

export interface LogDataForUpdateChecklistItem {
	id: string;
	checklistId: string;
	description: string;
	isChecked: boolean;
}
