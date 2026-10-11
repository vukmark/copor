import {BaseController} from '@copor/core/client/Core/BaseController';
import {CheckRolePermissionDependenciesReqBodyDTO} from './dto/CheckRolePermissionDependenciesReqBodyDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetRolePermissionListValidatorStorageRepoPicker
} from '@copor/core/client/Components/Permission/GetRolePermissionList/repo/repoPicker/GetRolePermissionListValidatorStorageRepoPicker';
import {
	GetRolePermissionListInteractorRepoPicker
} from '@copor/core/client/Components/Permission/GetRolePermissionList/repo/repoPicker/GetRolePermissionListInteractorRepoPicker';
import {CheckRolePermissionDependenciesLoggerRepoPicker} from './repo/repoPicker/CheckRolePermissionDependenciesLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {ValidateGetRolePermissionList} from '@copor/core/domain/Components/Permission/validations/ValidateGetRolePermissionList';
import {ValidateGetRolePermissionListDTO} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetRolePermissionListDTO';
import {CheckRolePermissionDependencies} from '@copor/core/domain/Components/Permission/interactor/CheckRolePermissionDependencies';
import {CheckRolePermissionDependenciesDTO} from '@copor/core/domain/Components/Permission/interactor/dto/CheckRolePermissionDependenciesDTO';
import {LogCheckRolePermissionDependencies} from '@copor/core/domain/Components/Permission/logger/LogCheckRolePermissionDependencies';
import {PermissionDependencyValidationResult} from '@copor/core/domain/Core/Permission/validatePermissionDependencyChange';

export class CheckRolePermissionDependenciesController
	extends BaseController<CheckRolePermissionDependenciesReqBodyDTO, PermissionDependencyValidationResult> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<PermissionDependencyValidationResult>,
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
		const validatorStorageRepo = container.getNewRepoPicker(GetRolePermissionListValidatorStorageRepoPicker);
		const validatorInput: ValidateGetRolePermissionListDTO = {
			actorId: this.actorId,
			roleId: this.request.body.roleId
		};

		return container.getValidator(
			ValidateGetRolePermissionList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}

	private getInteractor(): UseCase<PermissionDependencyValidationResult> {
		const container = this.container;
		const interactorInput: CheckRolePermissionDependenciesDTO = {
			roleId: this.request.body.roleId,
			actorId: this.actorId,
			desiredPermissionList: this.request.body.permissionList
		};
		const interactorRepo = container.getNewRepoPicker(GetRolePermissionListInteractorRepoPicker);

		return container.getInteractor(
			CheckRolePermissionDependencies,
			interactorRepo,
			interactorInput
		);
	}

	private getLogger(): LogAction {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CheckRolePermissionDependenciesLoggerRepoPicker);
		const logData = {roleId: this.request.body.roleId};

		return container.getLogger(
			LogCheckRolePermissionDependencies,
			loggerRepo,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
