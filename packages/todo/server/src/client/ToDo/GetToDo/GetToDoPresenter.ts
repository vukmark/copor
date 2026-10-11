import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetToDoViewModel} from './GetToDoViewModel';
import {GetPrivateToDoDTO} from '@copor/todo/domain/ToDo/PrivateToDo/interactor/dto/GetPrivateToDoDTO';
import {PriorityHelper} from '@copor/core/client/Core/Helpers/PriorityHelper';
import {dateTimeToString} from '@copor/core/client/Core/Helpers/DateTransformer';
import {ToDoType} from '@copor/todo/domain/ToDo/enum/ToDoType';

export class GetToDoPresenter extends PresenterInstance<GetPrivateToDoDTO, GetToDoViewModel> {
	present(): GetToDoViewModel {
		return {
			... this.input,
			type: ToDoType.PRIVATE,
			priority: PriorityHelper.getPriorityDTO(this.input.priority),
			deadline: this.input.deadline ? dateTimeToString(this.input.deadline) : undefined,
			isDisplayedInCalendar: Boolean(this.input.isDisplayedInCalendar),
			isPinned: Boolean(this.input.isPinned),
			tagList: this.input.tagList ? this.input.tagList.map((tag) => ({
				id: tag.id,
				name: tag.name,
				color: tag.color,
				colorSet: tag.colorSet,
				description: tag.description ?? undefined,
				isPrivate: Boolean(tag.isPrivate)
			})) : []
		};
	}
}
