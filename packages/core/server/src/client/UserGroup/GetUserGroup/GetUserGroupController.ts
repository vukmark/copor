import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateGetUserGroupDTO';
import {ValidateGetUserGroup} from '@copor/core/domain/UserGroup/validation/ValidateGetUserGroup';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {GetUserGroup} from '@copor/core/domain/UserGroup/interactor/GetUserGroup';
import {LogGetUserGroup} from '@copor/core/domain/UserGroup/logger/LogGetUserGroup';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetUserGroupViewModel} from './GetUserGroupViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetUserGroupValidatorStorageRepoPicker} from './repo/repoPicker/GetUserGroupValidatorStorageRepoPicker';
import {GetUserGroupInteractorRepoPicker} from './repo/repoPicker/GetUserGroupInteractorRepoPicker';
import {GetUserGroupLoggerRepoPicker} from './repo/repoPicker/GetUserGroupLoggerRepoPicker';
import {GetUserGroupPresenter} from './GetUserGroupPresenter';

export interface GetUserGroupParams {
	id: string;
}

export class GetUserGroupController extends BaseController<undefined, GetUserGroupViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetUserGroupParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetUserGroupDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetUserGroupPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetUserGroupDTO = {
			userGroupId: id,
			actorId: this.actorId
		};

		return c.getValidator(
			ValidateGetUserGroup,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetUserGroupValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserGroupLoggerRepoPicker);
		const logData = {
			id: id
		};

		return this.container.getLogger(
			LogGetUserGroup,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserGroupInteractorRepoPicker);

		return this.container.getInteractor(
			GetUserGroup,
			interactorRepository,
			id
		);
	}
}
