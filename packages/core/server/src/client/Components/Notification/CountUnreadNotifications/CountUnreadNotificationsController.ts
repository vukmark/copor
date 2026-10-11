import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	ValidateCountUnreadNotifications
} from '@copor/core/domain/Components/Notification/validations/ValidateCountUnreadNotifications';
import {
	CountUnreadNotifications
} from '@copor/core/domain/Components/Notification/interactor/CountUnreadNotifications';
import {CountUnreadNotificationsInteractorRepoPicker} from './repoPicker/CountUnreadNotificationsInteractorRepoPicker';
import {
	LogCountUnreadNotifications
} from '@copor/core/domain/Components/Notification/logger/LogCountUnreadNotifications';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {CountUnreadNotificationsLoggerRepoPicker} from './repoPicker/CountUnreadNotificationsLoggerRepoPicker';
import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';

export class CountUnreadNotificationsController extends BaseController<void, GetNotificationCounterDTO> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetNotificationCounterDTO>,
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

	private getValidator():Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = {
			userId: this.actorId
		};

		return container.getValidator(
			ValidateCountUnreadNotifications,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(CountUnreadNotificationsLoggerRepoPicker);

		return container.getLogger(LogCountUnreadNotifications, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(CountUnreadNotificationsInteractorRepoPicker);

		return container.getInteractor(CountUnreadNotifications, interactorRepo, this.actorId);
	}
}