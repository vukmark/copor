import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetToDoCommentViewModel} from './GetToDoCommentViewModel';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';

export class GetToDoCommentPresenter extends PresenterInstance<GetToDoCommentDTO, GetToDoCommentViewModel> {
	present(): GetToDoCommentViewModel {
		return {
			id: this.input.id,
			toDoId: this.input.toDoId,
			content: this.input.content,
			actorId: this.input.actorId,
			createdAt: this.input.createdAt
		};
	}
}
