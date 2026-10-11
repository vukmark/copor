import {BaseController} from '../../../Core/BaseController';
import {GetNotificationTokenListInteractorRepoPicker} from './repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {GetNotificationTokenListLoggerRepoPicker} from './repo/repoPicker/GetNotificationTokenListLoggerRepoPicker';
import {LogGetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/logger/LogGetNotificationTokenList';
import {CreateLogDetails} from '../../../GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '../../../Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateGetNotificationTokenList
} from '@copor/core/domain/Components/NotificationToken/validations/ValidateGetNotificationTokenList';
import {
	GetNotificationTokenListValidatorRepoPicker
} from './repo/repoPicker/GetNotificationTokenListValidatorRepoPicker';
import {GetNotificationTokenViewModel} from './GetNotificationTokenViewModel';

interface GetNotificationTokenListParams {
	user: string;
}

export class GetNotificationTokenListController extends BaseController<void, GetNotificationTokenViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetNotificationTokenListParams;
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetNotificationTokenDTO[]>,
			this.getValidator(params.user),
			this.getInteractor(params.user),
			this.getLogger(params.user)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(userId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = {
			actorId: this.actorId,
			userId: userId
		};
		const validatorStorageRepo = container.getNewRepoPicker(GetNotificationTokenListValidatorRepoPicker);

		return container.getValidator(
			ValidateGetNotificationTokenList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(userId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNotificationTokenListInteractorRepoPicker);

		return container.getInteractor(GetNotificationTokenList, interactorRepo, [userId]);
	}
	private getLogger(userId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetNotificationTokenListLoggerRepoPicker);

		return container.getLogger(LogGetNotificationTokenList, loggerRepo, new CreateLogDetails(this.actorId), {
			userId: userId
		});
	}
}
