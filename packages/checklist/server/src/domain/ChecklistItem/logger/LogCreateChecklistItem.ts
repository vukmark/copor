import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateChecklistItem extends TypedLogger<LogDataForCreateChecklistItem> {
	public getType(): string {
		return 'createChecklistItem';
	}
}

export interface LogDataForCreateChecklistItem {
	id: string;
	checklistId: string;
	description: string;
	isChecked: boolean;
}
