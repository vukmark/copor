import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetChecklist extends TypedLogger<LogDataForGetChecklist> {
	getType(): string {
		return 'getChecklist';
	}
}

export interface LogDataForGetChecklist {
	checklistId: string;
}