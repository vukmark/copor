import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {LogGetUserAccountInformation} from '@copor/core/domain/User/logger/LogGetUserAccountInformation';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {
	GetUserAccountInformationInteractorRepoPicker
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/repoPicker/GetUserAccountInformationInteractorRepoPicker';
import {
	ValidateGetUserAccountInformation
} from '@copor/core/domain/User/AccountInformation/validations/ValidateGetUserAccountInformation';
import {
	GetUserAccountInformationLoggerRepoPicker
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/repoPicker/GetUserAccountInformationLoggerRepoPicker';
import {
	GetUserAccountInformationValidatorStorageRepoPicker
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/repoPicker/GetUserAccountInformationValidatorStorageRepoPicker';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {GetUserAccountInformation} from '@copor/core/domain/User/AccountInformation/interactor/GetUserAccountInformation';
import {
	GetUserAccountInformationValidatorPermissionRepoPicker
// eslint-disable-next-line stylistic/max-len
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/repoPicker/GetUserAccountInformationValidatorPermissionRepoPicker';
import {
	AccountInformationFormBuilder
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForm/strategies/AccountInformationFormBuilder';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {
	GetUserRoleTypeInteractorRepoPicker
} from '@copor/core/client/Components/Role/GetUserRoleType/repo/repoPicker/GetUserRoleTypeInteractorRepoPicker';
import {GetUserRoleType} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';

export abstract class GetAccountInformationFormController
	extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const accountInformation = await this.getAccountInformation();

		if (accountInformation instanceof ErrorList) {
			this.next(accountInformation);
			return;
		}

		const actorRoleType = await this.getCurrentUserRoleType();

		const strategy = AccountInformationFormBuilder.get(
			accountInformation.roleType,
			accountInformation,
			this.container
		);

		const presenter = await strategy.buildPresenter(actorRoleType);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private async getAccountInformation() {
		const actorId = this.actorId;
		const userId = this.getUserId();

		const factory = this.container.getFactory(
			RunFactory<GetUserAccountInformationDTO>,
			this.getValidator(actorId, userId),
			this.getInteractor(userId),
			this.getLogger(actorId)
		);

		return factory.run();
	}

	private getValidator(actorId: string, userId: string) {
		const c = this.container;

		return c.getValidator(
			ValidateGetUserAccountInformation,
			{actorId, userId},
			c.getNewRepoPicker(GetUserAccountInformationValidatorPermissionRepoPicker),
			c.getNewRepoPicker(GetUserAccountInformationValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string) {
		return this.container.getLogger(
			LogGetUserAccountInformation,
			this.container.getNewRepoPicker(GetUserAccountInformationLoggerRepoPicker),
			new CreateLogDetails(actorId),
			undefined
		);
	}

	private getInteractor(userId: string) {
		const interactorRepository
			= this.container.getNewRepoPicker(GetUserAccountInformationInteractorRepoPicker);

		return this.container.getInteractor(
			GetUserAccountInformation,
			interactorRepository,
			userId
		);
	}

	private async getCurrentUserRoleType(): Promise<RoleType> {
		const repo = this.container.getNewRepoPicker(GetUserRoleTypeInteractorRepoPicker);

		return this.container.getInteractor(GetUserRoleType, repo, this.actorId).execute();
	}

	protected abstract getUserId(): string;
}
