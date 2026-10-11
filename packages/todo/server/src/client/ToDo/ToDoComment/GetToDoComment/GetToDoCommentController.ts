import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetToDoCommentViewModel} from './GetToDoCommentViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetToDoCommentValidatorStorageRepoPicker} from './repo/repoPicker/GetToDoCommentValidatorStorageRepoPicker';
import {GetToDoCommentInteractorRepoPicker} from './repo/repoPicker/GetToDoCommentInteractorRepoPicker';
import {GetToDoCommentLoggerRepoPicker} from './repo/repoPicker/GetToDoCommentLoggerRepoPicker';
import {GetToDoCommentPresenter} from './GetToDoCommentPresenter';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {ValidateGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/validations/ValidateGetToDoComment';
import {LogGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogGetToDoComment';
import {GetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/interactor/GetToDoComment';
import {ValidateGetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/validations/dto/ValidateGetToDoCommentDTO';

export interface GetToDoCommentParams {
	id: string;
}

export class GetToDoCommentController extends BaseController<undefined, GetToDoCommentViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetToDoCommentParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetToDoCommentDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetToDoCommentPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetToDoCommentDTO = {
			id: id,
			actorId: this.actorId
		};

		return c.getValidator(
			ValidateGetToDoComment,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetToDoCommentValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetToDoCommentLoggerRepoPicker);
		const logData = {
			id: id
		};

		return this.container.getLogger(
			LogGetToDoComment,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetToDoCommentInteractorRepoPicker);

		return this.container.getInteractor(
			GetToDoComment,
			interactorRepository,
			id
		);
	}
}
