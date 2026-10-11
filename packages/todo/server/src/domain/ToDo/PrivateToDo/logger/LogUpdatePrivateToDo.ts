import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdatePrivateToDo extends TypedLogger<LogDataForUpdatePrivateToDo> {
	getType(): string {
		return 'updatePrivateToDo';
	}
}

export interface LogDataForUpdatePrivateToDo {
	id: string;
	title: string;
	tagList?: string[];
	priority: Priority;
	isDisplayedInCalendar: boolean
	progress: Progress;
	deadline?: Date;
	scheduledTime?: Date;
	isPinned: boolean;
}
