import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteChecklist extends TypedLogger<LogDataForDeleteChecklist> {
	getType(): string {
		return 'deleteChecklist';
	}
}

export interface LogDataForDeleteChecklist {
	deleteChecklistId: string;
}
