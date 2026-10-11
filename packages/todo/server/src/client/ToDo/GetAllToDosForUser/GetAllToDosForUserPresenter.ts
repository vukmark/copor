import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetAllToDosForUserDTO} from '@copor/todo/domain/ToDo/Core/interactor/dto/GetAllToDosForUserDTO';
import {GetAllToDosForUserViewModel} from '@copor/todo/client/ToDo/GetAllToDosForUser/GetAllToDosForUserViewModel';
import {PriorityHelper} from '@copor/core/client/Core/Helpers/PriorityHelper';
import {dateTimeToString} from '@copor/core/client/Core/Helpers/DateTransformer';

export class GetAllToDosForUserPresenter extends PresenterInstance<GetAllToDosForUserDTO[], GetAllToDosForUserViewModel[]> {
	public present(): GetAllToDosForUserViewModel[] {
		return this.input.map((response) => {
			return {
				id: response.id,
				title: response.title,
				tagList: response.tagList?.map((tag) => {
					return {
						... tag,
						isPrivate: Boolean(tag.isPrivate)
					};
				}),
				priority: PriorityHelper.getPriorityDTO(response.priority),
				progress: response.progress,
				deadline: response.deadline ? dateTimeToString(response.deadline) : undefined,
				isDisplayedInCalendar: Boolean(response.isDisplayedInCalendar),
				isPinned: Boolean(response.isPinned),
				type: response.type,
				attachmentList: response.attachmentList
			};
		});
	}
}
