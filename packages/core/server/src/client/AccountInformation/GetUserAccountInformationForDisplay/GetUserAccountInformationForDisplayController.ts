import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetUserAccountInformationForDisplayViewModel} from './GetUserAccountInformationForDisplayViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetUserAccountInformationForDisplayInteractorRepoPicker
} from './repo/repoPicker/GetUserAccountInformationForDisplayInteractorRepoPicker';
import {
	GetUserAccountInformationForDisplayLoggerRepoPicker
} from './repo/repoPicker/GetUserAccountInformationForDisplayLoggerRepoPicker';
import {
	GetUserAccountInformationForDisplayDTO
} from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';
import {
	ValidateGetPersonalAccountInformation
} from '@copor/core/domain/User/validation/ValidateGetPersonalAccountInformation';
import {
	LogGetUserAccountInformation
} from '@copor/core/domain/User/logger/LogGetUserAccountInformation';
import {
	GetUserAccountInformationForDisplay
} from '@copor/core/domain/User/AccountInformation/interactor/GetUserAccountInformationForDisplay';
import {
	GetUserAccountInformationForDisplayPresenter
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/GetUserAccountInformationForDisplayPresenter';
import {
	ValidateGetUserAccountInformationForDisplay
} from '@copor/core/domain/User/AccountInformation/validations/ValidateGetUserAccountInformationForDisplay';
import {
	GetUserAccountInformationValidatorStorageRepoPicker
} from '@copor/core/client/AccountInformation/GetUserAccountInformationForDisplay/repo/repoPicker/GetUserAccountInformationValidatorStorageRepoPicker';

interface GetUserAccountInformationParams {
	userId: string
}

export class GetUserAccountInformationForDisplayController extends BaseController<undefined, GetUserAccountInformationForDisplayViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetUserAccountInformationParams;
		const userId: string = params.userId ?? this.actorId;

		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetUserAccountInformationForDisplayDTO>,
			this.getValidator(actorId, userId),
			this.getInteractor(actorId, userId),
			this.getLogger(actorId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetUserAccountInformationForDisplayPresenter, response, this.container.appContext);

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
			ValidateGetUserAccountInformationForDisplay,
			{
				actorId: actorId,
				userId: userId
			},
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetUserAccountInformationValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetUserAccountInformationForDisplayLoggerRepoPicker);

		return this.container.getLogger(
			LogGetUserAccountInformation,
			loggerRepository,
			new CreateLogDetails(actorId),
			undefined
		);
	}

	private getInteractor(actorId: string, userId: string | undefined) {
		const interactorRepository = this.container.getNewRepoPicker(GetUserAccountInformationForDisplayInteractorRepoPicker);

		if (userId)
			return this.container.getInteractor(
				GetUserAccountInformationForDisplay,
				interactorRepository,
				userId
			);
		return this.container.getInteractor(
			GetUserAccountInformationForDisplay,
			interactorRepository,
			actorId
		);
	}
}
