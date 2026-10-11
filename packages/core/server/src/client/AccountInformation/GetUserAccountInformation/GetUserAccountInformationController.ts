import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetUserAccountInformationViewModel} from './GetUserAccountInformationViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetUserAccountInformationInteractorRepoPicker
} from './repo/repoPicker/GetUserAccountInformationInteractorRepoPicker';
import {
	GetUserAccountInformationLoggerRepoPicker
} from './repo/repoPicker/GetUserAccountInformationLoggerRepoPicker';
import {
	ValidateGetPersonalAccountInformation
} from '@copor/core/domain/User/validation/ValidateGetPersonalAccountInformation';
import {
	LogGetUserAccountInformation
} from '@copor/core/domain/User/logger/LogGetUserAccountInformation';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {
	GetUserAccountInformationPresenter
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/GetUserAccountInformationPresenter';
import {
	GetUserAccountInformationValidatorStorageRepoPicker
} from '@copor/core/client/AccountInformation/GetUserAccountInformation/repo/repoPicker/GetUserAccountInformationValidatorStorageRepoPicker';
import {GetUserAccountInformation} from '@copor/core/domain/User/AccountInformation/interactor/GetUserAccountInformation';
import {
	ValidateGetUserAccountInformation
} from '@copor/core/domain/User/AccountInformation/validations/ValidateGetUserAccountInformation';
import {
	GetUserAccountInformationValidatorPermissionRepoPicker
// eslint-disable-next-line stylistic/max-len
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/repoPicker/GetUserAccountInformationValidatorPermissionRepoPicker';


interface GetUserAccountInformationParams {
	userId: string
}

export class GetUserAccountInformationController extends BaseController<undefined, GetUserAccountInformationViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetUserAccountInformationParams;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetUserAccountInformationDTO>,
			this.getValidator(actorId, params.userId),
			this.getInteractor(actorId, params.userId),
			this.getLogger(actorId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetUserAccountInformationPresenter, response, this.container.appContext);

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getValidator(actorId: string, userId: string | undefined) {
		const c = this.container;

		if (!userId)
			return c.getValidator(
				ValidateGetPersonalAccountInformation,
				actorId,
				c.getNewRepoPicker(PermissionValidatorRepoPicker),
				undefined
			);

		return c.getValidator(
			ValidateGetUserAccountInformation,
			{
				actorId: actorId,
				userId: userId
			},
			c.getNewRepoPicker(GetUserAccountInformationValidatorPermissionRepoPicker),
			c.getNewRepoPicker(GetUserAccountInformationValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserAccountInformationLoggerRepoPicker);

		return this.container.getLogger(
			LogGetUserAccountInformation,
			loggerRepository,
			new CreateLogDetails(actorId),
			undefined
		);
	}

	private getInteractor(actorId: string, userId: string | undefined) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserAccountInformationInteractorRepoPicker);

		if (userId)
			return this.container.getInteractor(
				GetUserAccountInformation,
				interactorRepository,
				userId
			);
		return this.container.getInteractor(
			GetUserAccountInformation,
			interactorRepository,
			actorId
		);
	}
}
