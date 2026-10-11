import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ToDoAttachmentDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/ToDoAttachmentDTO';

import {ToDoType} from '../../../enum/ToDoType';

export interface GetAllToDosForUserDTO {
	id: string;
	title: string;
	isPrivate: boolean;
	tagList?: GetTagDTO[];
	priority: Priority;
	progress?: Progress;
	deadline?: Date;
	isDisplayedInCalendar: boolean;
	isPinned: boolean;
	type: ToDoType;
	creatorId?: string;
	creatorName?: string;
	attachmentList?: ToDoAttachmentDTO[];
}
