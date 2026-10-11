import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetToDoCommentViewModel} from '@copor/todo/client/ToDo/ToDoComment/GetToDoComment/GetToDoCommentViewModel';

export class GetAllCommentsForToDoPresenter extends PresenterInstance<GetToDoCommentDTO[], GetToDoCommentViewModel[]> {
	public present(): GetToDoCommentDTO[] {
		const output: GetToDoCommentViewModel[] = this.input.map((dto) => ({
			... dto
		}));

		return output;
	}
}
