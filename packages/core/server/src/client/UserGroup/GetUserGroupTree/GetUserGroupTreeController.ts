import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetUserGroupTreeInteractorRepoPicker} from './repo/repoPicker/GetUserGroupTreeInteractorRepoPicker';
import {GetUserGroupTreeLoggerRepoPicker} from './repo/repoPicker/GetUserGroupTreeLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserGroupTreeDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupTreeDTO';
import {ValidateGetUserGroupTree} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroupTree';
import {GetUserGroupTree} from '@copor/core/domain/UserGroup/interactor/GetUserGroupTree';
import {LogGetUserGroupTree} from '@copor/core/domain/UserGroup/logger/LogGetUserGroupTree';
import {GetUserGroupTreeViewModel} from './GetUserGroupTreeViewModel';
import {GetUserGroupTreePresenter} from '@copor/core/client/UserGroup/GetUserGroupTree/GetUserGroupTreePresenter';

export class GetUserGroupTreeController extends BaseController<void, GetUserGroupTreeViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetUserGroupTreeDTO[]>,
			this.getValidator(),
			this.getInteractor(),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetUserGroupTreePresenter, response);

		this.response.status(200);
		this.response.send(presenter.present());
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetUserGroupTree,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetUserGroupTreeInteractorRepoPicker);

		return container.getInteractor(GetUserGroupTree, interactorRepo, []);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetUserGroupTreeLoggerRepoPicker);

		return container.getLogger(LogGetUserGroupTree, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
