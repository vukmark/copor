import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

export interface ValidateCreatePrivateToDoDTO {
	title: string;
	actorId: string;
	tagList?: string[];
	priority: Priority;
	isDisplayedInCalendar: boolean
	progress?: Progress;
	deadline?: Date;
	scheduledTime?: Date;
	isPinned: boolean;
}
