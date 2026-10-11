import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ToDoAttachmentDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/ToDoAttachmentDTO';

export interface GetPrivateToDoDTO {
	id: string;
	title: string;
	tagList?: GetTagDTO[];
	priority: Priority;
	isDisplayedInCalendar: boolean
	progress?: Progress;
	deadline?: Date;
	isPinned: boolean;
	attachmentList?: ToDoAttachmentDTO[];
}
