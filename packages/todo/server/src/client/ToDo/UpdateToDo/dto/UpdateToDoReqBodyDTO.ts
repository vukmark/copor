import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

export interface UpdateToDoReqBodyDTO {
	id: string;
	type: ToDoType;
	title: string;
	tagList?: string[];
	priority: Priority;
	isDisplayedInCalendar: boolean;
	progress: Progress;
	deadline?: string;
	scheduledTime?: string;
	isPinned: boolean;
}
