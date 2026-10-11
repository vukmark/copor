import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetAllToDosForUserInteractorRepoPicker} from './repo/repoPicker/GetAllToDosForUserInteractorRepoPicker';
import {GetAllToDosForUserLoggerRepoPicker} from './repo/repoPicker/GetAllToDosForUserLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetAllToDosForUserDTO} from '@copor/todo/domain/ToDo/Core/interactor/dto/GetAllToDosForUserDTO';
import {ValidateGetAllToDosForUser} from '@copor/todo/domain/ToDo/Core/validations/ValidateGetAllToDosForUser';
import {GetAllToDosForUser} from '@copor/todo/domain/ToDo/Core/interactor/GetAllToDosForUser';
import {LogGetAllToDosForUser} from '@copor/todo/domain/ToDo/Core/logger/LogGetAllToDosForUser';
import {GetAllToDosForUserViewModel} from './GetAllToDosForUserViewModel';
import {GetAllToDosForUserPresenter} from '@copor/todo/client/ToDo/GetAllToDosForUser/GetAllToDosForUserPresenter';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';


export class GetAllToDosForUserController extends BaseController<GetListReqBodyDTO, GetAllToDosForUserViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetAllToDosForUserDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presentedResponse = this.container.getPresenter(GetAllToDosForUserPresenter, response).present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetAllToDosForUser,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetAllToDosForUserInteractorRepoPicker);

		return container.getInteractor(
			GetAllToDosForUser,
			interactorRepo,
			{userId: this.actorId, filterList: this.request.body.filterList}
		);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetAllToDosForUserLoggerRepoPicker);

		return container.getLogger(LogGetAllToDosForUser, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
