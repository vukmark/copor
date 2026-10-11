import {BaseController} from '@copor/core/client/Core/BaseController';
import {ValidateGetNotificationList} from '@copor/core/domain/Components/Notification/validations/ValidateGetNotificationList';
import {GetNotificationListInteractorRepoPicker} from './repo/repoPicker/GetNotificationListInteractorRepoPicker';
import {GetNotificationList} from '@copor/core/domain/Components/Notification/interactor/GetNotificationList';
import {GetNotificationListLoggerRepoPicker} from './repo/repoPicker/GetNotificationListLoggerRepoPicker';
import {LogGetNotificationList} from '@copor/core/domain/Components/Notification/logger/LogGetNotificationList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetNotificationViewModel} from './GetNotificationViewModel';

export class GetNotificationListController extends BaseController<void, GetNotificationViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetNotificationDTO[]>,
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
		const validatorInput = {
			userId: this.actorId
		};

		return container.getValidator(
			ValidateGetNotificationList,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNotificationListInteractorRepoPicker);

		return container.getInteractor(GetNotificationList, interactorRepo, this.actorId);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetNotificationListLoggerRepoPicker);

		return container.getLogger(LogGetNotificationList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
