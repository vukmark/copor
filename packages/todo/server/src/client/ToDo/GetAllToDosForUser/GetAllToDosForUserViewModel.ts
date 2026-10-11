import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {PriorityDTO} from '@copor/core/client/Core/Helpers/PriorityDTO';

import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';
import {ToDoAttachmentDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/ToDoAttachmentDTO';

export interface GetAllToDosForUserViewModel {
	id: string,
	title: string,
	tagList?: GetTagDTO[],
	priority: PriorityDTO,
	progress?: Progress,
	deadline?: string,
	isDisplayedInCalendar: boolean,
	isPinned: boolean,
	type: ToDoType;
	attachmentList?: ToDoAttachmentDTO[];
}
