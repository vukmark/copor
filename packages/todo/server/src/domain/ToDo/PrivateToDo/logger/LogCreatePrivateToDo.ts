import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

export class LogCreatePrivateToDo extends TypedLogger<LogDataForCreatePrivateToDo> {
	public getType(): string {
		return 'createPrivateToDo';
	}
}

export interface LogDataForCreatePrivateToDo {
	id: string;
	title: string;
	actorId: string;
	tagList?: string[];
	priority: Priority;
	isDisplayedInCalendar: boolean
	progress: Progress;
	deadline?: Date;
	scheduledTime?: Date;
	isPinned: boolean;
}
