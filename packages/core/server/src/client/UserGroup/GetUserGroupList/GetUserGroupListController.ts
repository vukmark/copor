import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetUserGroupViewModel} from '../GetUserGroup/GetUserGroupViewModel';
import {ValidateGetUserGroupList} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroupList';
import {GetUserGroupListInteractorRepoPicker} from './repo/repoPicker/GetUserGroupListInteractorRepoPicker';
import {GetUserGroupList} from '@copor/core/domain/UserGroup/interactor/GetUserGroupList';
import {GetUserGroupListLoggerRepoPicker} from './repo/repoPicker/GetUserGroupListLoggerRepoPicker';
import {LogGetUserGroupList} from '@copor/core/domain/UserGroup/logger/LogGetUserGroupList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';

export class GetUserGroupListController extends BaseController<void, GetUserGroupViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetUserGroupDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetUserGroupList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserGroupListInteractorRepoPicker);

		return container.getInteractor(GetUserGroupList, interactorRepo, []);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupListLoggerRepoPicker);

		return container.getLogger(LogGetUserGroupList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
